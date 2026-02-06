/**
 * Supabase Debug Component
 * Shows connection status and test results
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { testSupabaseConnection } from '../../../shared/services/supabase-service';
import { getCurrentUser, getCurrentSession } from '../../../shared/services/auth-service';
import { getHabitCategories, getUserHabits } from '../../../shared/services/habits-service';
import { t } from '../../../shared/i18n';
import { getErrorMessage } from '../../../shared/utils';
import { createStyles } from '../styles/supabase-debug.styles';

export const SupabaseDebug: React.FC = () => {
  const styles = createStyles();
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'success' | 'error' | null>(null);
  const [connectionMessage, setConnectionMessage] = useState<string>('');
  const [userStatus, setUserStatus] = useState<string>('');
  const [categoriesStatus, setCategoriesStatus] = useState<string>('');
  const [habitsStatus, setHabitsStatus] = useState<string>('');

  const testConnection = async () => {
    setConnectionStatus('checking');
    setConnectionMessage(t('screens.debug.testing'));

    try {
      const result = await testSupabaseConnection();
      if (result) {
        setConnectionStatus('success');
        setConnectionMessage(`✅ ${t('screens.debug.success')}`);
      } else {
        setConnectionStatus('error');
        setConnectionMessage(`❌ ${t('screens.debug.failed')}`);
      }
    } catch (error) {
      setConnectionStatus('error');
      setConnectionMessage(
        `❌ ${t('screens.debug.errorPrefix')}${getErrorMessage(error, t('screens.debug.unknownError'))}`
      );
    }
  };

  const checkUser = async () => {
    try {
      const session = await getCurrentSession();
      const user = await getCurrentUser();

      if (session && user) {
        setUserStatus(
          `✅ ${t('screens.debug.userLoggedIn', { email: user.email ?? '', id: user.id })}`
        );
      } else {
        setUserStatus(`⚠️ ${t('screens.debug.userNotLoggedIn')}`);
      }
    } catch (error) {
      setUserStatus(
        `❌ ${t('screens.debug.errorPrefix')}${getErrorMessage(error, t('screens.debug.unknownError'))}`
      );
    }
  };

  const testCategories = async () => {
    try {
      const { categories, error } = await getHabitCategories();
      if (error) {
        setCategoriesStatus(`❌ ${t('screens.debug.errorPrefix')}${error.message}`);
      } else {
        setCategoriesStatus(
          `✅ ${t('screens.debug.categoriesFound', { count: categories.length })}:\n${categories.map((c) => `- ${c.name}`).join('\n')}`
        );
      }
    } catch (error) {
      setCategoriesStatus(
        `❌ ${t('screens.debug.errorPrefix')}${getErrorMessage(error, t('screens.debug.unknownError'))}`
      );
    }
  };

  const testHabits = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        setHabitsStatus(`⚠️ ${t('screens.debug.loginRequired')}`);
        return;
      }

      const { habits, error } = await getUserHabits(user.id);
      if (error) {
        setHabitsStatus(`❌ ${t('screens.debug.errorPrefix')}${error.message}`);
      } else {
        const list =
          habits.length > 0
            ? habits.map((h) => `- ${h.name}`).join('\n')
            : t('screens.debug.noHabitsYet');
        setHabitsStatus(
          `✅ ${t('screens.debug.habitsFound', { count: habits.length })}:\n${list}`
        );
      }
    } catch (error) {
      setHabitsStatus(
        `❌ ${t('screens.debug.errorPrefix')}${getErrorMessage(error, t('screens.debug.unknownError'))}`
      );
    }
  };

  useEffect(() => {
    testConnection();
    checkUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('screens.debug.title')}</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('screens.debug.connectionTest')}</Text>
          <Text style={styles.statusText}>{connectionMessage || t('screens.debug.notTested')}</Text>
          <TouchableOpacity style={styles.button} onPress={testConnection}>
            <Text style={styles.buttonText}>{t('screens.debug.testConnection')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('screens.debug.userStatus')}</Text>
          <Text style={styles.statusText}>{userStatus || t('screens.debug.notChecked')}</Text>
          <TouchableOpacity style={styles.button} onPress={checkUser}>
            <Text style={styles.buttonText}>{t('screens.debug.checkUser')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('screens.debug.categories')}</Text>
          <Text style={styles.statusText}>{categoriesStatus || t('screens.debug.notTested')}</Text>
          <TouchableOpacity style={styles.button} onPress={testCategories}>
            <Text style={styles.buttonText}>{t('screens.debug.fetchCategories')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('screens.debug.habits')}</Text>
          <Text style={styles.statusText}>{habitsStatus || t('screens.debug.notTested')}</Text>
          <TouchableOpacity style={styles.button} onPress={testHabits}>
            <Text style={styles.buttonText}>{t('screens.debug.fetchHabits')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
