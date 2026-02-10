/**
 * Ritual App Colors
 * Dark theme color palette
 */

export const RITUAL_COLORS = {
  // Primary Background (dark navy)
  background: {
    primary: '#0B1123',
    secondary: '#0F1628', // Cards, input areas (very close to main background)
    card: '#0F1628', // Card backgrounds
    input: '#1E2A47', // Input fields (muted dark navy tone)
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
    primary: '#4C82FB', // Light blue (buttons, selected items, links)
    secondary: '#3B82F6',
    hover: '#2563EB',
  },

  // Border Colors
  border: {
    primary: '#1A243D', // Same as secondary background
    input: '#2A3447', // Input border (muted dark navy tone)
    card: '#2A3447', // Card borders (more visible)
    divider: '#1E2A47', // Light divider line
  },

  // Build Points badge (pill: dark gray background + border)
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
