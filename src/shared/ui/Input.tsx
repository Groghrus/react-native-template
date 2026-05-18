import React, { forwardRef } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { useTheme, Theme } from '@shared/lib/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, containerStyle, style, ...props }, ref) => {
    const { theme } = useTheme();
    const styles = makeStyles(theme, !!error);

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          placeholderTextColor={theme.colors.textSecondary}
          {...props}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  },
);

Input.displayName = 'Input';

const makeStyles = (theme: Theme, hasError: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    label: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
      fontWeight: '500',
    },
    input: {
      borderWidth: 1.5,
      borderColor: hasError ? theme.colors.error : theme.colors.border,
      borderRadius: 12,
      paddingVertical: theme.spacing.sm + 2,
      paddingHorizontal: theme.spacing.md,
      fontSize: theme.fontSize.lg,
      color: theme.colors.text,
      backgroundColor: theme.colors.surface,
    },
    error: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.error,
      marginTop: theme.spacing.xs,
    },
  });

export { Input };
