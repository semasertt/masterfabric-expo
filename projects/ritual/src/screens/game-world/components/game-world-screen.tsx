import React from 'react';
import { View, Text } from 'react-native';
import { createStyles } from '../styles/game-world-screen.styles';

export const GameWorldScreen: React.FC = () => {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Oyun Alanı
      </Text>
      <Text style={styles.subtitle}>
        Yakında...
      </Text>
    </View>
  );
};
