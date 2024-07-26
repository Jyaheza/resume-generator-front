import apiClient from "./services";

export default {
  getJobMatch(resumeId, jobDescription) {
    return apiClient.post(`jobMatch/${resumeId}`, { jobDescription });
  }
};