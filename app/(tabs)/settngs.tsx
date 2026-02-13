// app/(tabs)/more.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function SettingsScreen() {

    return (<>
        <View>
            <Text style={styles.fontHeader}>This is settings page</Text>
        </View>
    </>
    )
}

export const styles = StyleSheet.create({
    fontHeader: {
        color: 'black'
    }
})