import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { queryClient } from '@shared/api/query-client';
import { ThemeProvider } from '@shared/lib/theme';
import { RootNavigator } from '@pages/RootNavigator';

const App: React.FC = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
              <RootNavigator />
            </NavigationContainer>
          </QueryClientProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export { App };
