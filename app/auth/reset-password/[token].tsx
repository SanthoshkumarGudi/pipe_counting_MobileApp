import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { api } from "@/services/api";
import { Ionicons } from '@expo/vector-icons';

export default function ResetPassword() {
  const params = useLocalSearchParams();
  const token = params.token as string;

  console.log("SCREEN LOADED");
  console.log("TOKEN FROM ROUTE:", token);

  const [password, setPassword] = useState("");

  const submit = async () => {
console.log("🔥 RESET BUTTON CLICKED");
  try {
    await api.post(`/auth/reset-password/${token}`, {
      password,
    },
    { // This is the third argument: the config object
        headers: {
          "ngrok-skip-browser-warning": "any-value", // Add this header
        },
      }
  );

    Alert.alert("Success", "Password updated");
    router.replace("/auth/login");
  } catch (err: any) {
    console.log("RESET ERROR:", err?.response?.data || err.message);
    Alert.alert("Error", "Reset failed");
  }
};


  return (
    <View style={{ padding: 20 }}>
           <Pressable
  onPress={() => router.back()}
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,           // adjust if needed (safe area)
    left: 20,
    zIndex: 10,
  }}
>
  <Ionicons name="arrow-back" size={28} color="#00BFFF" />
  <Text style={{ marginLeft: 8, color: "#00BFFF", fontSize: 18, fontWeight: '500' }}>
    Back
  </Text>
</Pressable>
      <Pressable
  onPress={() => router.back()}
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,           // adjust if needed (safe area)
    left: 20,
    zIndex: 10,
  }}
>
  <Ionicons name="arrow-back" size={28} color="#00BFFF" />
  <Text style={{ marginLeft: 8, color: "#00BFFF", fontSize: 18, fontWeight: '500' }}>
    Back
  </Text>
</Pressable>
      <Text>Reset Password</Text>

      <TextInput
        placeholder="New password"
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
      />

      <Pressable
        onPress={submit}
        style={{ backgroundColor: "black", padding: 15 }}
      >
        <Text style={{ color: "white" }}>Reset</Text>
      </Pressable>
    </View>
  );
}
