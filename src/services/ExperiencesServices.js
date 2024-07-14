import apiClient from "./services";

export default {
  getExperiences() {
    return apiClient.get("experiences");
  },
  getExperiencesByUserId(userId) {
    return apiClient.get(`experiences/user/${userId}`);
  },
  getExperience(id) {
    return apiClient.get(`experiences/${id}`);
  },
  addExperience(userId, experienceParams) {
    return apiClient.post(`experiences/${userId}`,experienceParams);
  },
  updateExperience(experienceId, experience) {
    return apiClient.put(`experiences/${experienceId}`, experience);
  },
  deleteExperience(experienceId) {
    return apiClient.delete(`experiences/${experienceId}`);
  },
};