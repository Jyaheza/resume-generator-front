import apiClient from "./services";

export default {
  getEducations() {
    return apiClient.get("educations");
  },
  getEducationsByUserId(userId) {
    return apiClient.get(`educations/${userId}`);
  }, 
  getEducation(id) {
    return apiClient.get(`educations/${id}`);
  },
  addEducation(userId, educationParams) {
    return apiClient.post(`educations/${userId}`,educationParams);
  },
  updateEducation(educationId, education) {
    return apiClient.put(`educations/${educationId}`, education);
  },
  deleteEducation( educationId) {
    return apiClient.delete(`educations/${educationId}`);
  },
};