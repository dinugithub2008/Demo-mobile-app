import { Button, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';

export const BookingFlowScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>Booking flow (skeleton)</Text>
    <TextInput placeholder="Start date/time (ISO)" style={styles.input} />
    <TextInput placeholder="End date/time (ISO)" style={styles.input} />
    <TextInput placeholder="Pickup or Delivery" style={styles.input} />
    <TextInput placeholder="Delivery address" style={styles.input} />
    <TextInput placeholder="Add-ons" style={styles.input} />
    <TextInput placeholder="Upload ID/Licence (hook)" style={styles.input} />
    <Button title="Continue to secure payment" onPress={() => {}} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB', padding: 16, gap: 10 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#D8E0E7' },
});
