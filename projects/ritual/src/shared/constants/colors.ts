/**
 * Ritual App Colors
 * Dark theme color palette
 */

export const RITUAL_COLORS = {
  // Primary Background (Koyu lacivert)
  background: {
    primary: '#0B1123',
    secondary: '#0F1628', // Kartlar, input alanları için (ana arka plana çok yakın)
    card: '#0F1628', // Kart arka planları
    input: '#1E2A47', // Input alanları için (lacivertin koyu soluk tonu)
  },
    // Overlay
  overlay: {
    backdrop: 'rgba(0, 0, 0, 0.7)',
  },

  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    tertiary: '#999999',
    placeholder: '#666666',
  },

  // Accent Colors
  accent: {
    primary: '#4C82FB', // Açık mavi (butonlar, seçili öğeler, linkler)
    secondary: '#3B82F6',
    hover: '#2563EB',
  },

  // Border Colors
  border: {
    primary: '#1A243D', // Secondary background ile aynı
    input: '#2A3447', // Input border için (lacivertin koyu soluk tonu)
    card: '#2A3447', // Kart border'ları için daha belirgin
    divider: '#1E2A47', // Açık renkli divider çizgisi
  },

  // Build Points badge (resimdeki pill: koyu gri arka plan + border)
  buildPointsBadge: {
    background: '#2C3138',
    border: '#3A414A',
  },

  // Status Colors
  status: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#FF9500',
    info: '#4C82FB',
  },

  // Category Colors (from seed data)
  category: {
    health: '#4CAF50',
    work: '#2196F3',
    learning: '#FF9800',
    social: '#9C27B0',
    personal: '#E91E63',
    finance: '#00BCD4',
    creative: '#FF5722',
    mind: '#795548',
  },
} as const;

export type RitualColors = typeof RITUAL_COLORS;
