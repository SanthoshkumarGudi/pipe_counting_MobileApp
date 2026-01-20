import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Home Screen</Text>

      <Pressable
        onPress={() => router.push("/auth/login")}
        style={{ backgroundColor: "black", padding: 12 }}
      >
        <Text style={{ color: "white" }}>Go to Login</Text>
      </Pressable>
      <Pressable
      onPress={()=>router.push("/auth/register")}
      >
<Text>Register</Text>
      </Pressable>
    </View>
  );
}
