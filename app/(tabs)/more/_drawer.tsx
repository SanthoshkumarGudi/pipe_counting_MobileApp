import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { ComponentProps } from 'react';
type IoniconName = ComponentProps<typeof Ionicons>['name'];

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;

  const closeDrawer = () => {
    navigation.closeDrawer();
    router.push('/(tabs)/template')
  };

  const menuItems: { icon: IoniconName; label: string }[] = [
  { icon: 'book-outline', label: 'Guides' },
  { icon: 'bulb-outline', label: 'Hints' },
  { icon: 'help-circle-outline', label: 'Support' },
  { icon: 'star-outline', label: 'Rate us!' },
  { icon: 'information-outline', label: 'About' },
];


  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        {/* Header */}


        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>C</Text>
          </View>
        </View>

        {/* Menu items */}
        {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.item}
              onPress={() => {
                console.log(`${item.label} pressed`);
                closeDrawer();
                // Add real navigation later, e.g. router.push('/guides')
              }}
            >
              <Ionicons name={item.icon} size={24} color="#00A650" />
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.header}>
            <TouchableOpacity onPress={closeDrawer}>
              <Ionicons name="close-circle" size={28} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      
    </DrawerContentScrollView>
  );
}

// styles remain the same

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 200,
    marginLeft: 80
  },
  title: { fontSize: 22, fontWeight: '600', marginLeft: 16 },
  logoContainer: { alignItems: 'center', paddingVertical: 40 },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#00A650',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: { color: '#fff', fontSize: 48, fontWeight: 'bold' },
  menu: { paddingHorizontal: 16 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: { fontSize: 17, marginLeft: 16, color: '#333' },
  logout: { marginTop: 40 },
});