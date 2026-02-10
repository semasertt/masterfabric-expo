/**
 * Category name translations
 * DB may store Turkish names (Sağlık, Kişisel, Öğrenme); map to i18n key then t(categories.*).
 */

import { t } from '../i18n';

/** Maps lowercase category name (from DB: Turkish or English) to i18n key (categories.*). */
const NAME_TO_I18N_KEY: Record<string, string> = {
  // Turkish (from seed)
  'sağlık': 'health',
  'iş': 'work',
  'öğrenme': 'learning',
  'sosyal': 'social',
  'kişisel': 'personal',
  'finans': 'finance',
  'yaratıcılık': 'creative',
  'ruh sağlığı': 'mind',
  // English (if DB ever has them)
  'health': 'health',
  'work': 'work',
  'learning': 'learning',
  'social': 'social',
  'personal': 'personal',
  'finance': 'finance',
  'creative': 'creative',
  'mind': 'mind',
  'fitness': 'fitness',
  'yoga': 'yoga',
};

/**
 * Translate category name by locale. DB names (e.g. Sağlık, Kişisel) → categories.* → Health, Personal in EN.
 */
export function translateCategoryName(categoryName: string): string {
  const key = categoryName.toLowerCase().trim();
  const i18nKey = NAME_TO_I18N_KEY[key];
  if (i18nKey) {
    const translated = t(`categories.${i18nKey}`);
    if (translated && translated !== `categories.${i18nKey}`) return translated;
  }
  return categoryName;
}

/** Category name (from DB) → stable key for filtering (e.g. category name → "health"). */
export function getCategoryKey(categoryName: string): string | null {
  const key = categoryName.toLowerCase().trim();
  return NAME_TO_I18N_KEY[key] ?? null;
}
