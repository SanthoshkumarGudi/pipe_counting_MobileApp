import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { api } from "@/services/api";
import { router } from "expo-router";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!name || !email || !password || !phone) return Alert.alert("Error", "All fields required");
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password, phone });
      Alert.alert("Success", "Verification link sent to your email.");
      router.push("/auth/login");
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: "center" }}>Create your account</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15 }}
      />
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
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15 }}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 20 }}
      />
      <Pressable
        onPress={register}
        disabled={loading}
        style={{ backgroundColor: loading ? "#999" : "#00BFFF", padding: 15, borderRadius: 30 }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
          {loading ? "Registering..." : "REGISTER"}
        </Text>
      </Pressable>
    </View>
  );
}