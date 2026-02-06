/**
 * Category name translations
 * Maps category names to Turkish/English based on locale
 */

export const CATEGORY_TRANSLATIONS_TR: Record<string, string> = {
  'Health': 'Sağlık',
  'HEALTH': 'SAĞLIK',
  'health': 'Sağlık',
  'Work': 'İş',
  'WORK': 'İŞ',
  'work': 'İş',
  'Learning': 'Öğrenme',
  'LEARNING': 'ÖĞRENME',
  'learning': 'Öğrenme',
  'Social': 'Sosyal',
  'SOCIAL': 'SOSYAL',
  'social': 'Sosyal',
  'Personal': 'Kişisel',
  'PERSONAL': 'KİŞİSEL',
  'personal': 'Kişisel',
  'Finance': 'Finans',
  'FINANCE': 'FİNANS',
  'finance': 'Finans',
  'Creative': 'Yaratıcı',
  'CREATIVE': 'YARATICI',
  'creative': 'Yaratıcı',
  'Mind': 'Zihin',
  'MIND': 'ZİHİN',
  'mind': 'Zihin',
  'Fitness': 'Fitness',
  'FITNESS': 'FİTNESS',
  'fitness': 'Fitness',
  'Yoga': 'Yoga',
  'YOGA': 'YOGA',
  'yoga': 'Yoga',
};

export const CATEGORY_TRANSLATIONS_EN: Record<string, string> = {
  'Health': 'Health',
  'HEALTH': 'HEALTH',
  'health': 'Health',
  'Work': 'Work',
  'WORK': 'WORK',
  'work': 'Work',
  'Learning': 'Learning',
  'LEARNING': 'LEARNING',
  'learning': 'Learning',
  'Social': 'Social',
  'SOCIAL': 'SOCIAL',
  'social': 'Social',
  'Personal': 'Personal',
  'PERSONAL': 'PERSONAL',
  'personal': 'Personal',
  'Finance': 'Finance',
  'FINANCE': 'FINANCE',
  'finance': 'Finance',
  'Creative': 'Creative',
  'CREATIVE': 'CREATIVE',
  'creative': 'Creative',
  'Mind': 'Mind',
  'MIND': 'MIND',
  'mind': 'Mind',
  'Fitness': 'Fitness',
  'FITNESS': 'FITNESS',
  'fitness': 'Fitness',
  'Yoga': 'Yoga',
  'YOGA': 'YOGA',
  'yoga': 'Yoga',
};

/**
 * Translate category name based on current locale
 */
export function translateCategoryName(categoryName: string): string {
  try {
    const i18n = require('../i18n').default;
    const locale = i18n.locale || 'tr';
    const translations = locale === 'en' ? CATEGORY_TRANSLATIONS_EN : CATEGORY_TRANSLATIONS_TR;
    return translations[categoryName] || categoryName;
  } catch {
    // Fallback to Turkish if i18n not available
    return CATEGORY_TRANSLATIONS_TR[categoryName] || categoryName;
  }
}
