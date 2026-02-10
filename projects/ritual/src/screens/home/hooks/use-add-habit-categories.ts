/**
 * Add Habit Modal - Category Loading Hook
 */

import { useCallback, useEffect, useState } from 'react';
import { getHabitCategories, type HabitCategory } from '../../../shared/services/habits-service';

import { filterHabitCategories } from '../utils';

const CATEGORY_FILTER_TERMS = ['ruh sağlığı', 'mental health', 'örnek', 'example'] as const;

interface UseAddHabitCategoriesParams {
  visible: boolean;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
}

export const useAddHabitCategories = ({
  visible,
  selectedCategory,
  setSelectedCategory,
}: UseAddHabitCategoriesParams) => {
  const [categories, setCategories] = useState<HabitCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const loadCategories = useCallback(async () => {
    setLoadingCategories(true);
    const { categories: loadedCategories, error } = await getHabitCategories();
    if (error) {
      console.error('Failed to load categories:', error);
    } else {
      const filteredCategories = filterHabitCategories(
        loadedCategories,
        CATEGORY_FILTER_TERMS
      );
      setCategories(filteredCategories);
      if (filteredCategories.length > 0 && !selectedCategory) {
        setSelectedCategory(filteredCategories[0].id);
      }
    }
    setLoadingCategories(false);
  }, [selectedCategory, setSelectedCategory]);

  useEffect(() => {
    if (visible) {
      loadCategories();
    }
  }, [visible, loadCategories]);

  return { categories, loadingCategories };
};