import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Theme } from '@shared/lib/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
}

const Card: React.FC<CardProps> = ({ children, style, padded = true }) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme, padded);

  return <View style={[styles.card, style]}>{children}</View>;
};

const makeStyles = (theme: Theme, padded: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: padded ? theme.spacing.md : 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
  });

export { Card };
