import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { api } from "@/services/api";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN SUCCESS:", res.data);

      console.log("LOGIN SUCCESS:", res);

      Alert.alert("Success", "Login successful");

      // ✅ NAVIGATE AFTER SUCCESS
      router.push("/dashboard");

    } catch (err: any) {
      Alert.alert(
        "Login Failed",
        err.response?.data?.error || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Login here</Text>

      <Text>Email</Text>
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
      />

      <Text>Password</Text>
      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <Pressable
        onPress={login}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#999" : "black",
          padding: 14,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </Pressable>
      <Pressable onPress={() => router.push("/auth/forgot-password")}>
  <Text style={{ color: "blue", textAlign: "right" }}>
    Forgot password?
  </Text>
</Pressable>
    </View>
  );
}
