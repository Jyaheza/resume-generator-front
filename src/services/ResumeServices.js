import apiClient from "./services";

export default {
  getResumes() {
    return apiClient.get("resumes");
  },
  getResumesByUserId(userId) {
    return apiClient.get(`resumes/${userId}`);
  },
  getResume(id) {
    return apiClient.get(`resumes/${id}`);
  },
  addResume(userId, resumeParams) {
    return apiClient.post(`resumes/${userId}`,resumeParams);
  },
  updateResume(resumeId, resume) {
    return apiClient.put(`resumes/${resumeId}`, resume);
  },
  deleteResume(resumeId) {
    return apiClient.delete(`resumes/${resumeId}`);
  },
};