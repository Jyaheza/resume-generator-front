import apiClient from "./services";

export default {
  getResumes() {
    return apiClient.get("resumes");
  },
  getResumesByUserId(userId) {
    return apiClient.get(`resumes/user/${userId}`);
  },
  getResume(id) {
    return apiClient.get(`resumes/${id}`);
  },
  addResume(resumeParams) {
    return apiClient.post(`resumes`, resumeParams);
  },
  updateResume(resumeId, resume) {
    return apiClient.put(`resumes/${resumeId}`, resume);
  },
  deleteResume(resumeId) {
    return apiClient.delete(`resumes/${resumeId}`);
  },
};