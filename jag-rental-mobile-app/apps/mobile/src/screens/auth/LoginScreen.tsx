import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuthStore } from '../../store/authStore';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormValues = z.infer<typeof schema>;

export const LoginScreen = ({ navigation }: any) => {
  const setSession = useAuthStore((s) => s.setSession);
  const { setValue, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = () => {
    setSession('mock-jwt-token');
    navigation.replace('Catalogue');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to JAG RENT</Text>
      <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" onChangeText={(v) => setValue('email', v)} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={(v) => setValue('password', v)} />
      <Button title="Sign in" onPress={handleSubmit(onSubmit)} />
      <View style={{ height: 10 }} />
      <Button title="Continue as guest" onPress={() => navigation.replace('Catalogue')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', gap: 12, backgroundColor: '#F4F6F8' },
  title: { fontSize: 24, fontWeight: '700', color: '#1A2B1F' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#D3D9DE' },
});
