import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@shared/lib/theme';

interface LoaderProps {
  size?: 'small' | 'large';
  fullscreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 'large', fullscreen = false }) => {
  const { theme } = useTheme();

  if (fullscreen) {
    return (
      <View style={[styles.fullscreen, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size={size} color={theme.colors.primary} />
      </View>
    );
  }

  return <ActivityIndicator size={size} color={theme.colors.primary} />;
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Loader };
