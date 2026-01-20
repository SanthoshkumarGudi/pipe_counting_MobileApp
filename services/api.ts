import axios from "axios";
import { Platform } from "react-native";

const API_URL =
  Platform.OS === "web"
    ? "http://localhost:5000/api"
    : "https://unprovided-nonexisting-santana.ngrok-free.dev/api";

export const api = axios.create({
  baseURL: API_URL,
});
