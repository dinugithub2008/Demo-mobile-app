import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

const mockEquipment = [
  { id: 'eq-1', name: '1.7T Excavator', dailyRate: 280, available: true },
  { id: 'eq-2', name: 'Scissor Lift 19ft', dailyRate: 190, available: true },
  { id: 'eq-3', name: 'Plate Compactor', dailyRate: 65, available: false },
];

export const CatalogueScreen = ({ navigation }: any) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>Find the right machine for the job</Text>
    <TextInput style={styles.search} placeholder="Search by machine, category, or SKU" />
    <FlatList
      data={mockEquipment}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => navigation.navigate('EquipmentDetails', { equipmentId: item.id })}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.meta}>From ${item.dailyRate}/day (AUD)</Text>
          <Text style={item.available ? styles.available : styles.unavailable}>
            {item.available ? 'Available now' : 'Currently unavailable'}
          </Text>
        </Pressable>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EEF1F3', padding: 16 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 10, color: '#16281E' },
  search: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 14 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14 },
  title: { fontSize: 17, fontWeight: '700' },
  meta: { marginTop: 4, color: '#34495A' },
  available: { marginTop: 4, color: '#2B8A3E' },
  unavailable: { marginTop: 4, color: '#B23A48' },
});
