-- Create database functions for HabitQuest
-- These functions handle business logic calculations

-- Function 1: Calculate daily reward for a user
-- Calculates points and item unlock count based on completion rate
CREATE OR REPLACE FUNCTION calculate_daily_reward(
  p_user_id UUID,
  p_reward_date DATE DEFAULT CURRENT_DATE
)
RETURNS JSON AS $$
DECLARE
  v_completion_rate DOUBLE PRECISION;
  v_habits_completed INTEGER;
  v_habits_total INTEGER;
  v_points_earned INTEGER;
  v_items_unlocked_count INTEGER;
  v_result JSON;
BEGIN
  -- Get completion statistics for the date
  SELECT 
    COUNT(DISTINCT hc.habit_id) FILTER (WHERE hc.completion_date = p_reward_date),
    COUNT(DISTINCT h.id) FILTER (WHERE h.is_active = true AND h.deleted_at IS NULL AND p_reward_date::text::integer = ANY(
      SELECT unnest(h.days_of_week) WHERE 
        CASE EXTRACT(DOW FROM p_reward_date)
          WHEN 0 THEN 7 -- Sunday
          ELSE EXTRACT(DOW FROM p_reward_date)::integer
        END = ANY(h.days_of_week)
    ))
  INTO v_habits_completed, v_habits_total
  FROM public.habits h
  LEFT JOIN public.habit_completions hc ON hc.habit_id = h.id AND hc.completion_date = p_reward_date
  WHERE h.user_id = p_user_id
    AND h.is_active = true
    AND h.deleted_at IS NULL
    AND (
      CASE EXTRACT(DOW FROM p_reward_date)
        WHEN 0 THEN 7 -- Sunday
        ELSE EXTRACT(DOW FROM p_reward_date)::integer
      END = ANY(h.days_of_week)
    );

  -- Calculate completion rate
  IF v_habits_total > 0 THEN
    v_completion_rate := v_habits_completed::DOUBLE PRECISION / v_habits_total::DOUBLE PRECISION;
  ELSE
    v_completion_rate := 0;
  END IF;

  -- Calculate points (base 10 points per habit, multiplied by completion rate)
  v_points_earned := ROUND(v_habits_completed * 10 * v_completion_rate)::INTEGER;

  -- Calculate item unlock count (1 item per 50 points, minimum 0)
  v_items_unlocked_count := GREATEST(0, FLOOR(v_points_earned / 50)::INTEGER);

  -- Insert or update daily_rewards
  INSERT INTO public.daily_rewards (
    user_id,
    reward_date,
    completion_rate,
    points_earned,
    items_unlocked_count,
    habits_completed,
    habits_total
  ) VALUES (
    p_user_id,
    p_reward_date,
    v_completion_rate,
    v_points_earned,
    v_items_unlocked_count,
    v_habits_completed,
    v_habits_total
  )
  ON CONFLICT (user_id, reward_date)
  DO UPDATE SET
    completion_rate = EXCLUDED.completion_rate,
    points_earned = EXCLUDED.points_earned,
    items_unlocked_count = EXCLUDED.items_unlocked_count,
    habits_completed = EXCLUDED.habits_completed,
    habits_total = EXCLUDED.habits_total,
    calculated_at = NOW();

  -- Update user_profiles total_points
  UPDATE public.user_profiles
  SET total_points = (
    SELECT COALESCE(SUM(points_earned), 0)
    FROM public.daily_rewards
    WHERE user_id = p_user_id
  )
  WHERE id = p_user_id;

  -- Return result
  SELECT json_build_object(
    'completion_rate', v_completion_rate,
    'points_earned', v_points_earned,
    'items_unlocked_count', v_items_unlocked_count,
    'habits_completed', v_habits_completed,
    'habits_total', v_habits_total
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function 2: Update world state for a user
-- Updates weather and unlocked areas based on performance
CREATE OR REPLACE FUNCTION update_world_state(
  p_user_id UUID,
  p_state_date DATE DEFAULT CURRENT_DATE
)
RETURNS JSON AS $$
DECLARE
  v_completion_rate DOUBLE PRECISION;
  v_weather_type TEXT;
  v_unlocked_areas TEXT[];
  v_points_earned INTEGER;
  v_items_unlocked INTEGER;
  v_result JSON;
BEGIN
  -- Get completion rate from daily_rewards
  SELECT completion_rate, points_earned, items_unlocked_count
  INTO v_completion_rate, v_points_earned, v_items_unlocked
  FROM public.daily_rewards
  WHERE user_id = p_user_id AND reward_date = p_state_date;

  -- If no reward exists, calculate it first
  IF v_completion_rate IS NULL THEN
    PERFORM calculate_daily_reward(p_user_id, p_state_date);
    SELECT completion_rate, points_earned, items_unlocked_count
    INTO v_completion_rate, v_points_earned, v_items_unlocked
    FROM public.daily_rewards
    WHERE user_id = p_user_id AND reward_date = p_state_date;
  END IF;

  -- Determine weather based on completion rate
  IF v_completion_rate >= 0.8 THEN
    v_weather_type := 'sunny';
  ELSIF v_completion_rate >= 0.5 THEN
    v_weather_type := 'cloudy';
  ELSIF v_completion_rate >= 0.2 THEN
    v_weather_type := 'rainy';
  ELSE
    v_weather_type := 'dark';
  END IF;

  -- Determine unlocked areas based on total points
  v_unlocked_areas := ARRAY['house']; -- Always start with house
  
  -- Check if user has enough points for upstairs (500 points)
  IF (SELECT total_points FROM public.user_profiles WHERE id = p_user_id) >= 500 THEN
    v_unlocked_areas := array_append(v_unlocked_areas, 'upstairs');
  END IF;
  
  -- Check if user has enough points for garden (1500 points)
  IF (SELECT total_points FROM public.user_profiles WHERE id = p_user_id) >= 1500 THEN
    v_unlocked_areas := array_append(v_unlocked_areas, 'garden');
  END IF;
  
  -- Check if user has enough points for city (5000 points)
  IF (SELECT total_points FROM public.user_profiles WHERE id = p_user_id) >= 5000 THEN
    v_unlocked_areas := array_append(v_unlocked_areas, 'city');
  END IF;

  -- Insert or update game_world_states
  INSERT INTO public.game_world_states (
    user_id,
    state_date,
    weather_type,
    unlocked_areas,
    completion_rate,
    points_earned,
    items_unlocked
  ) VALUES (
    p_user_id,
    p_state_date,
    v_weather_type,
    v_unlocked_areas,
    v_completion_rate,
    v_points_earned,
    v_items_unlocked
  )
  ON CONFLICT (user_id, state_date)
  DO UPDATE SET
    weather_type = EXCLUDED.weather_type,
    unlocked_areas = EXCLUDED.unlocked_areas,
    completion_rate = EXCLUDED.completion_rate,
    points_earned = EXCLUDED.points_earned,
    items_unlocked = EXCLUDED.items_unlocked,
    updated_at = NOW();

  -- Return result
  SELECT json_build_object(
    'weather_type', v_weather_type,
    'unlocked_areas', v_unlocked_areas,
    'completion_rate', v_completion_rate
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function 3: Get user streak for a habit
-- Calculates current streak (consecutive days completed)
CREATE OR REPLACE FUNCTION get_user_streak(
  p_habit_id UUID
)
RETURNS INTEGER AS $$
DECLARE
  v_streak INTEGER := 0;
  v_check_date DATE := CURRENT_DATE;
  v_user_id UUID;
BEGIN
  -- Get user_id from habit
  SELECT user_id INTO v_user_id
  FROM public.habits
  WHERE id = p_habit_id;

  IF v_user_id IS NULL THEN
    RETURN 0;
  END IF;

  -- Get days_of_week for this habit
  -- Check backwards from today until we find a gap
  LOOP
    -- Check if this date is in the habit's days_of_week
    IF EXISTS (
      SELECT 1 FROM public.habits h
      WHERE h.id = p_habit_id
        AND (
          CASE EXTRACT(DOW FROM v_check_date)
            WHEN 0 THEN 7 -- Sunday
            ELSE EXTRACT(DOW FROM v_check_date)::integer
          END = ANY(h.days_of_week)
        )
    ) THEN
      -- Check if completed on this date
      IF EXISTS (
        SELECT 1 FROM public.habit_completions
        WHERE habit_id = p_habit_id
          AND completion_date = v_check_date
      ) THEN
        v_streak := v_streak + 1;
        v_check_date := v_check_date - INTERVAL '1 day';
      ELSE
        -- Gap found, exit
        EXIT;
      END IF;
    ELSE
      -- This day is not in the habit's schedule, skip it
      v_check_date := v_check_date - INTERVAL '1 day';
    END IF;

    -- Safety limit (prevent infinite loop)
    IF v_check_date < CURRENT_DATE - INTERVAL '365 days' THEN
      EXIT;
    END IF;
  END LOOP;

  RETURN v_streak;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function 4: Get daily progress for a user
-- Returns completion status for all active habits on a given date
CREATE OR REPLACE FUNCTION get_daily_progress(
  p_user_id UUID,
  p_date DATE DEFAULT CURRENT_DATE
)
RETURNS JSON AS $$
DECLARE
  v_result JSON;
BEGIN
  SELECT json_agg(
    json_build_object(
      'habit_id', h.id,
      'habit_name', h.name,
      'category_id', h.category_id,
      'category_name', hc.name,
      'category_icon', hc.icon,
      'category_color', hc.color,
      'is_completed', hc.id IS NOT NULL,
      'completed_at', hc.completed_at,
      'notes', hc.notes
    )
    ORDER BY h.created_at
  ) INTO v_result
  FROM public.habits h
  INNER JOIN public.habit_categories hc ON hc.id = h.category_id
  LEFT JOIN public.habit_completions hc ON hc.habit_id = h.id AND hc.completion_date = p_date
  WHERE h.user_id = p_user_id
    AND h.is_active = true
    AND h.deleted_at IS NULL
    AND (
      CASE EXTRACT(DOW FROM p_date)
        WHEN 0 THEN 7 -- Sunday
        ELSE EXTRACT(DOW FROM p_date)::integer
      END = ANY(h.days_of_week)
    );

  RETURN COALESCE(v_result, '[]'::JSON);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION calculate_daily_reward(UUID, DATE) TO authenticated;
GRANT EXECUTE ON FUNCTION update_world_state(UUID, DATE) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_streak(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_daily_progress(UUID, DATE) TO authenticated;
