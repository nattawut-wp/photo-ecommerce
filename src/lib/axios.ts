// src/lib/axios.ts
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ;

export const api = axios.create({
  baseURL: `${backendUrl}/api/v1`,
  withCredentials: true, // สำคัญสำหรับ CORS
});

// Interceptor เพื่อใส่ Token อัตโนมัติ
api.interceptors.request.use((config) => {
  // Check if we're in the browser environment before accessing localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.token = token; // Backend คุณรับ header 'token'
    }
  }
  return config;
});