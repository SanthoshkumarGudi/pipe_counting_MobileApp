import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from './_drawer';// ← this is correct

export default function MoreLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { width: '75%', backgroundColor: '#fff' },
        drawerPosition: 'left',
        headerShown: false,
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{ drawerLabel: () => null, title: 'More' }}
      />
    </Drawer>
  );
}