import { View, Text, Pressable, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function SettingsScreen() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const { theme, setMode, isDark } = useTheme();

    console.log("isDark value is,", isDark);
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.fontHeader, { color: theme.text }]}>Settings</Text>

            {/* Profile */}
            <Pressable style={styles.item}>
                <Ionicons name="person-outline" size={22} color={theme.text} />
                <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
            </Pressable>

            {/* Dark Mode */}
            <View style={styles.item}>
                <Ionicons name="moon-outline" size={22} color={theme.text} />
                <Text style={[styles.title, { color: theme.text }]}>Dark Mode</Text>
                <Switch
                    value={isDark}
                    onValueChange={() => setMode(isDark ? "light" : "dark")}
                />
            </View>

            {/* Notifications */}
            <View style={[styles.item, { borderBottomColor: theme.border }]}>
                <Ionicons name="notifications-outline" size={22} color={theme.text} />
                <Text style={[styles.title, { color: theme.text }]}>Notifications</Text>
                <Switch
                    value={notifications}
                    onValueChange={() => setNotifications(!notifications)}
                />
            </View>

            {/* About */}
            <Pressable style={styles.item}>
                <Ionicons name="information-circle-outline" size={22} color={theme.text} />
                <Text style={[styles.title, { color: theme.text }]}>About App</Text>
            </Pressable>

            {/* Logout */}
            <Pressable style={[styles.item, styles.logout]}>
                <Ionicons name="log-out-outline" size={22} color={theme.text} />
                <Text style={[styles.label, { color: "red" }]}>Logout</Text>
            </Pressable>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    fontHeader: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 15,
        flex: 1,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    label: {
        fontSize: 16,
        marginLeft: 15,
        flex: 1,
    },

    logout: {
        marginTop: 30,
    },
});