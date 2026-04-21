import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { CatalogueScreen } from '../screens/catalogue/CatalogueScreen';
import { EquipmentDetailsScreen } from '../screens/catalogue/EquipmentDetailsScreen';
import { BookingFlowScreen } from '../screens/booking/BookingFlowScreen';
import { MyHiresScreen } from '../screens/account/MyHiresScreen';

export type RootStackParamList = {
  Login: undefined;
  Catalogue: undefined;
  EquipmentDetails: { equipmentId: string };
  BookingFlow: { equipmentId: string };
  MyHires: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'JAG RENT' }} />
    <Stack.Screen name="Catalogue" component={CatalogueScreen} options={{ title: 'Equipment Hire' }} />
    <Stack.Screen name="EquipmentDetails" component={EquipmentDetailsScreen} options={{ title: 'Equipment Details' }} />
    <Stack.Screen name="BookingFlow" component={BookingFlowScreen} options={{ title: 'Book Hire' }} />
    <Stack.Screen name="MyHires" component={MyHiresScreen} options={{ title: 'My Hires' }} />
  </Stack.Navigator>
);
