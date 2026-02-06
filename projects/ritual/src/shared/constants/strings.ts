/**
 * Ritual App Strings
 * Shared string constants
 */

export const APP_STRINGS = {
  // App Info
  appName: 'Ritual',
  appVersion: '1.0.0',

  // Common Actions
  actions: {
    save: 'Kaydet',
    cancel: 'İptal',
    delete: 'Sil',
    edit: 'Düzenle',
    add: 'Ekle',
    close: 'Kapat',
    back: 'Geri',
    next: 'İleri',
    skip: 'Atla',
    start: 'Başla',
    help: 'Yardım',
  },

  // Validation Messages
  validation: {
    required: 'Bu alan zorunludur',
    emailInvalid: 'Geçerli bir e-posta adresi girin',
    passwordMinLength: 'Şifre en az 8 karakter olmalıdır',
    passwordsNoMatch: 'Şifreler eşleşmiyor',
  },

  // Error Messages
  errors: {
    networkError: 'Ağ hatası oluştu',
    unknownError: 'Bilinmeyen bir hata oluştu',
    supabaseNotInitialized: 'Supabase bağlantısı kurulamadı',
    userNotAuthenticated: 'Kullanıcı giriş yapmamış',
    habitCreateFailed: 'Alışkanlık oluşturulamadı',
    habitUpdateFailed: 'Alışkanlık güncellenemedi',
    habitDeleteFailed: 'Alışkanlık silinemedi',
  },

  // Success Messages
  success: {
    habitCreated: 'Alışkanlık başarıyla oluşturuldu',
    habitUpdated: 'Alışkanlık başarıyla güncellendi',
    habitDeleted: 'Alışkanlık başarıyla silindi',
    habitCompleted: 'Alışkanlık tamamlandı',
    habitUncompleted: 'Alışkanlık tamamlanmadı olarak işaretlendi',
  },
} as const;

export type AppStrings = typeof APP_STRINGS;
