import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { environment } from "../environments/dev.environment";

const API_BASE_URL = environment.api_url;

const http = axios.create({
  baseURL: API_BASE_URL,
});

http.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
