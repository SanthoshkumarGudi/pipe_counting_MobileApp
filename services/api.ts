import axios from "axios";
import { Platform } from "react-native";

const API_URL = Platform.select({
  web: "http://localhost:5000/api",
  android: "http://10.0.2.2:5000/api",
  ios: "http://localhost:5000/api",
});// ← your Render backend

export const api = axios.create({
  baseURL: API_URL,
});
