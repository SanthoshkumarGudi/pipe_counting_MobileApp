import axios from "axios";
import { Platform } from "react-native";

const API_URL =
  Platform.OS === "web"
    ? "http://localhost:5000/api"
: "https://pipe-couting-mobileapp-backend-1.onrender.com/api";  // ← your Render backend

export const api = axios.create({
  baseURL: API_URL,
});
