import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: RITUAL_COLORS.background.primary,
      paddingTop: 48,
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: RITUAL_COLORS.text.primary,
      marginBottom: 24,
    },
    menu: {
      backgroundColor: RITUAL_COLORS.background.card,
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: RITUAL_COLORS.border.divider,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: RITUAL_COLORS.border.divider,
    },
    menuItemLogout: {
      borderBottomWidth: 0,
    },
    menuItemPressed: {
      opacity: 0.7,
    },
    menuItemText: {
      flex: 1,
      fontSize: 16,
      color: RITUAL_COLORS.text.primary,
    },
    menuItemValue: {
      fontSize: 14,
      color: RITUAL_COLORS.text.tertiary,
      marginRight: 4,
    },
    menuItemTextLogout: {
      color: RITUAL_COLORS.status.error,
    },
  });
};
