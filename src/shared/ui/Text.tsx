import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@shared/lib/theme';

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption';
  color?: string;
}

const AppText: React.FC<TextProps> = ({ variant = 'body', color, style, children, ...props }) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme, variant);

  return (
    <RNText
      style={[
        styles.base,
        color ? { color } : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const makeStyles = (theme: Theme, variant: string) =>
  StyleSheet.create({
    base: {
      color: theme.colors.text,
      fontSize:
        variant === 'h1'
          ? theme.fontSize.xxl
          : variant === 'h2'
            ? theme.fontSize.xl
            : variant === 'caption'
              ? theme.fontSize.sm
              : theme.fontSize.md,
      fontWeight: variant === 'h1' || variant === 'h2' ? '700' : '400',
    },
  });

export { AppText as Text };
