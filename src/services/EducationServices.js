import apiClient from "./services";

export default {
  getEducations() {
    return apiClient.get("education");
  },
  getEducationsByUserId(userId) {
    return apiClient.get(`education/user/${userId}`);
  }, 
  getEducation(id) {
    return apiClient.get(`education/${id}`);
  },
  addEducation(educationParams) {
    return apiClient.post("education" ,educationParams);
  },
  updateEducation(educationId, education) {
    return apiClient.put(`education/${educationId}`, education);
  },
  deleteEducation(educationId) {
    return apiClient.delete(`education/${educationId}`);
  },
};