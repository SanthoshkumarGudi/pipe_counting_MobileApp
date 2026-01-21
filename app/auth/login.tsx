import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { api } from "@/services/api";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) return Alert.alert("Error", "Email and password required");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      await SecureStore.setItemAsync("authToken", res.data.token);
      Alert.alert("Success", "Login successful");
      router.replace("/(tabs)/template"); // Redirect to templates
    } catch (err: any) {
      Alert.alert("Login Failed", err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: "center" }}>Login to your account</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 20 }}
      />
      <Pressable
        onPress={login}
        disabled={loading}
        style={{ backgroundColor: loading ? "#999" : "#00BFFF", padding: 15, borderRadius: 30 }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
          {loading ? "Logging in..." : "LOGIN"}
        </Text>
      </Pressable>
      <Pressable onPress={() => router.push("/auth/forgot-password")}>
        <Text style={{ color: "#00BFFF", textAlign: "center", marginTop: 10 }}>Forgot Password?</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/auth/register")}>
        <Text style={{ color: "#00BFFF", textAlign: "center" }}>Register</Text>
      </Pressable>
    </View>
  );
}