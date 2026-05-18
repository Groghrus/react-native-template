import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets, EdgeInsets } from 'react-native-safe-area-context';
import { useTheme, Theme } from '@shared/lib/theme';
import { Text } from '@shared/ui/Text';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { useAuth } from '@features/auth/hooks/useAuth';

const AuthScreen: React.FC = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { login, register, isLoading, error } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (isRegister) {
      await register(email, password, name);
    } else {
      await login(email, password);
    }
  };

  const styles = makeStyles(theme, insets);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text variant="h1" style={styles.title}>
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </Text>
        <Text variant="caption" style={styles.subtitle}>
          {isRegister ? 'Sign up to get started' : 'Sign in to continue'}
        </Text>

        {isRegister && (
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
            containerStyle={styles.input}
            autoCapitalize="words"
          />
        )}

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.input}
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
          containerStyle={styles.input}
        />

        {error && (
          <Text variant="caption" color={theme.colors.error} style={styles.errorText}>
            {error?.message || 'An error occurred'}
          </Text>
        )}

        <Button
          title={isRegister ? 'Sign Up' : 'Sign In'}
          onPress={handleSubmit}
          loading={isLoading}
          style={styles.submitButton}
        />

        <Button
          title={isRegister ? 'Already have an account?' : "Don't have an account?"}
          variant="ghost"
          onPress={() => setIsRegister(!isRegister)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const makeStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
    },
    input: {
      marginBottom: theme.spacing.md,
    },
    errorText: {
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    submitButton: {
      marginTop: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
  });

export { AuthScreen };
