import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export const EquipmentDetailsScreen = ({ route, navigation }: any) => {
  const equipmentId = route.params?.equipmentId;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>1.7T Excavator</Text>
      <Text style={styles.price}>$280/day + $1,500 bond</Text>
      <Text style={styles.section}>Specs</Text>
      <Text>• Operating weight: 1,700kg</Text>
      <Text>• Licence: Not required</Text>
      <Text>• Delivery eligible across metro zones</Text>
      <Text style={styles.section}>FAQs</Text>
      <Text>Q: Is weekend pickup available?</Text>
      <Text>A: Yes, subject to branch trading hours.</Text>
      <View style={{ height: 16 }} />
      <Button title="Start booking" onPress={() => navigation.navigate('BookingFlow', { equipmentId })} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, gap: 6 },
  title: { fontSize: 26, fontWeight: '700', color: '#19291D' },
  price: { fontSize: 16, color: '#445F4F' },
  section: { marginTop: 10, fontSize: 17, fontWeight: '600' },
});
