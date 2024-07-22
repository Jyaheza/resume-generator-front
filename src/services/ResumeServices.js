import apiClient from "./services";

export default {
  getResumes() {
    return apiClient.get("resumes");
  },
  getResumesMeta(userId){
    return apiClient.get(`resumes/meta/user/${userId}`);
  },
  getResumesByUserId(userId) {
    return apiClient.get(`resumes/user/${userId}`);
  },
  getResume(id) {
    return apiClient.get(`resumes/${id}`);
  },
  getResumePdf(id){
    return apiClient.get(`resumes/pdf/${id}`)
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