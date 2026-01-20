import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { api } from "@/services/api";
import { Alert } from "react-native";
import { router } from "expo-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!email || !password) {
      console.log("Email and password required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        email,
        password,
      });

      console.log("REGISTER SUCCESS:", res.data);
      Alert.alert(
  "Verify Email",
  "A verification link has been sent to your email."
);

    } catch (err: any) {
      console.log("REGISTER ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Register :</Text>

      <Text>Email</Text>
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderRadius: 6,
          padding: 10,
          marginBottom: 15,
        }}
      />

      <Text>Password</Text>
      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderRadius: 6,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Pressable
        onPress={register}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#999" : "#000",
          padding: 14,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          {loading ? "Registering..." : "Register"}
        </Text>
      </Pressable>
      <Pressable
      onPress={()=>router.navigate("/(tabs)")}><Text>Go to Home Page</Text></Pressable>
    </View>
  );
}
