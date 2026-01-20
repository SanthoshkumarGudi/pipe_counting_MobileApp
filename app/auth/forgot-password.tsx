import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { api } from "@/services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email) {
      Alert.alert("Error", "Email required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/forgot-password", { email });
      Alert.alert(
        "Check your email",
        "If the email exists, a reset link has been sent."
      );
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Forgot Password
      </Text>

      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <Pressable
        onPress={submit}
        style={{ backgroundColor: "black", padding: 14 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Text>
      </Pressable>
    </View>
  );
}
