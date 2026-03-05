import apiClient from './api';
import { API_ENDPOINTS } from '../config/api.config';

export const userService = {
  async getProfile() {
    const response = await apiClient.get(API_ENDPOINTS.PROFILE);
    return response.data;
  },

  async updateProfile(updates: any) {
    const response = await apiClient.put(API_ENDPOINTS.PROFILE, updates);
    return response.data;
  },

  async changePassword(oldPassword: string, newPassword: string) {
    await apiClient.post('/auth/change-password', {
      oldPassword,
      newPassword,
    });
  },
};
