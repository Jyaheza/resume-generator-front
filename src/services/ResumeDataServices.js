import apiClient from "./services";

export default {
  getResumeDatas() {
    return apiClient.get("resumedatas");
  },
  getResumeDatasByUserId(userId) {
    return apiClient.get(`resumedatas/${userId}`);
  },
  getResumeData(id) {
    return apiClient.get(`resumedatas/${id}`);
  },
  addResumeData(userId, resumedataParams) {
    return apiClient.post(`resumedatas/${userId}`,resumedataParams);
  },
  updateResumeData(resumedataId, resumedata) {
    return apiClient.put(`resumedatas/${resumedataId}`, resumedata);
  },
  deleteResumeData(resumedataId) {
    return apiClient.delete(`resumedatas/${resumedataId}`);
  },
};