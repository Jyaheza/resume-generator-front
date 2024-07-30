import apiClient from "./services";

export default {
  getResumeDatas() {
    return apiClient.get("resumedata");
  },
  getResumeDatasByUserId(userId) {
    return apiClient.get(`resumedata/user/${userId}`);
  },
  getResumeData(id) {
    return apiClient.get(`resumedata/${id}`);
  },
  addResumeData(userId, resumedataParams) {
    return apiClient.post(`resumedata/${userId}`,resumedataParams);
  },
  updateResumeData(resumedataId, resumedata) {
    return apiClient.put(`resumedata/${resumedataId}`, resumedata);
  },
  deleteResumeData(resumedataId) {
    return apiClient.delete(`resumedata/${resumedataId}`);
  },
};