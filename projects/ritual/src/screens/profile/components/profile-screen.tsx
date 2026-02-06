import React from 'react';
import { View, Text } from 'react-native';
import { createStyles } from '../styles/profile-screen.styles';

export const ProfileScreen: React.FC = () => {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Profil
      </Text>
      <Text style={styles.subtitle}>
        Yakında...
      </Text>
    </View>
  );
};
