// // app/(tabs)/more.tsx
// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Dimensions,
//   Pressable,
//   Alert
// } from 'react-native';
// import { router } from 'expo-router';
// import * as SecureStore from 'expo-secure-store';
// import { Ionicons } from '@expo/vector-icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useFocusEffect } from 'expo-router';


// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const DRAWER_WIDTH = SCREEN_WIDTH * 0.75; // ~75% of screen

// export default function MoreScreen() {
//   const insets = useSafeAreaInsets();
//   const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
//   const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

//   // Open drawer
//   const openDrawer = () => {
//     setIsDrawerOpen(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   // Close drawer
//   const closeDrawer = () => {
//     Animated.timing(slideAnim, {
//       toValue: -DRAWER_WIDTH,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setIsDrawerOpen(false));
//   };

//   // This runs every time the screen is focused
//   useFocusEffect(
//     React.useCallback(() => {
//       openDrawer();
//       // Optional cleanup: close when leaving
//       return () => {
//         closeDrawer();
//       };
//     }, [])
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.mainContent}>
//         <Text style={styles.placeholderText}>Tap More to open menu</Text>
//         <Pressable style={styles.closeTab} onPress={() => router.push('/template')}>
//           <Ionicons name="arrow-back" size={28} color="#333" />
//         </Pressable>
//       </View>
//       {isDrawerOpen && (
//         <Pressable style={styles.overlay} onPress={closeDrawer} />
//       )}
//       <Animated.View
//         style={[
//           styles.drawer,
//           {
//             transform: [{ translateX: slideAnim }],
//             paddingTop: insets.top,
//           },
//         ]}
//       >
//         <View style={styles.drawerHeader}>
//           <Pressable onPress={closeDrawer}>
//             <Ionicons name="arrow-back" size={28} color="#333" />
//           </Pressable>
//         </View>
//         <View style={styles.logoContainer}>
//           <View style={styles.logoCircle}>
//             <Text style={styles.logoText}>C</Text>
//           </View>
//         </View>
//         <View style={styles.menuItems}>
//           {[
//             { icon: 'book-outline', label: 'Guides' },
//             { icon: 'bulb-outline', label: 'Hints' },
//             { icon: 'help-circle-outline', label: 'Support' },
//             { icon: 'star-outline', label: 'Rate us!' },
//             { icon: 'information-outline', label: 'About' },
//           ].map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.menuItem}
//               onPress={() => {
//                 closeDrawer();
//               }}
//             >
//               <Ionicons name='accessibility' size={24} color="#00A650" /> {/* green accent */}
//               <Text style={styles.menuLabel}>{item.label}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </Animated.View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   mainContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   placeholderText: {
//     fontSize: 18,
//     color: '#666',
//   },
//   closeTab: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     zIndex: 1,
//   },
//   drawer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     width: DRAWER_WIDTH,
//     backgroundColor: '#fff',
//     zIndex: 2,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 2, height: 0 },
//     shadowOpacity: 0.25,
//     shadowRadius: 8,
//   },
//   drawerHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginLeft: 16,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     paddingVertical: 40,
//   },
//   logoCircle: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: '#00A650', // green from your screenshot
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logoText: {
//     color: '#fff',
//     fontSize: 48,
//     fontWeight: 'bold',
//   },
//   menuItems: {
//     paddingHorizontal: 16,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   menuLabel: {
//     fontSize: 17,
//     marginLeft: 16,
//     color: '#333',
//   },
//   logoutItem: {
//     marginTop: 40,
//     borderBottomWidth: 0,
//   },
// });

