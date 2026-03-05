import apiClient from './api';
import { API_ENDPOINTS } from '../config/api.config';

export const newsService = {
  async analyzeNews(text: string) {
    const response = await apiClient.post(API_ENDPOINTS.ANALYZE, { text });
    return response.data;
  },

  async getAnalysisHistory() {
    const response = await apiClient.get(API_ENDPOINTS.HISTORY);
    return response.data;
  },

  async deleteAnalysis(id: string) {
    await apiClient.delete(`${API_ENDPOINTS.ANALYZE}/${id}`);
  },
};
