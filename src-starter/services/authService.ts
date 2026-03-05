import apiClient from './api';
import { API_ENDPOINTS } from '../config/api.config';

export const authService = {
  async login(email: string, password: string) {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, { email, password });
    return response.data;
  },

  async signup(email: string, username: string, password: string) {
    const response = await apiClient.post(API_ENDPOINTS.SIGNUP, {
      email,
      username,
      password,
    });
    return response.data;
  },

  async logout() {
    await apiClient.post(API_ENDPOINTS.LOGOUT);
  },

  async getProfile() {
    const response = await apiClient.get(API_ENDPOINTS.PROFILE);
    return response.data;
  },
};
