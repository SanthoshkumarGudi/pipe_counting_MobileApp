import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useFocusEffect, router } from 'expo-router';


export default function MoreScreen() {
  const navigation = useNavigation();

  useFocusEffect(()=>{
      const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  openDrawer()
  })


  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 12,
  },
  menuText: { marginLeft: 8, fontSize: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 120, marginBottom: 16 },
  subtitle: { fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 8 },
  hint: { fontSize: 14, color: '#666', textAlign: 'center' },
});