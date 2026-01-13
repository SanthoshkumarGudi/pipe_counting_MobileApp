import {View, Text, TextInput, Pressable} from "react-native"
import { api } from "@/services/api";
import { router } from "expo-router";

export default function Dashboard(){

    return(
        <View>
            <Text>This is the dashboard</Text>
            <Pressable
            style={{
          backgroundColor:"#999",
          padding: 14,
        }}
            onPress={()=>router.navigate("/(tabs)")}
            ><Text>Go Back</Text></Pressable>
        </View>
    )
}

