import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { useTheme, Theme } from '@shared/lib/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme, variant);

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : theme.colors.primary} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const makeStyles = (theme: Theme, variant: 'primary' | 'outline' | 'ghost') =>
  StyleSheet.create({
    button: {
      paddingVertical: theme.spacing.sm + 4,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: 12,
      backgroundColor:
        variant === 'primary' ? theme.colors.primary : 'transparent',
      borderWidth: variant === 'outline' ? 1.5 : 0,
      borderColor: variant === 'outline' ? theme.colors.primary : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: variant === 'primary' ? 1 : undefined,
    },
    text: {
      color: variant === 'primary' ? '#FFFFFF' : theme.colors.primary,
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
    },
  });

export { Button };
