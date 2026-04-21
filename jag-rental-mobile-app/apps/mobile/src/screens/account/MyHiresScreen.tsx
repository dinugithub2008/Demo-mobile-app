import { SafeAreaView, StyleSheet, Text } from 'react-native';

export const MyHiresScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>My Hires</Text>
    <Text>View active hires, request extension, and download invoices.</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
});
