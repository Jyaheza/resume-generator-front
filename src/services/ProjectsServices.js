import apiClient from "./services";

export default {
  getProjects() {
    return apiClient.get("projects");
  },
  getProjectsByUserId(userId) {
    return apiClient.get(`projects/${userId}`);
  },
  getProject(id) {
    return apiClient.get(`projects/${id}`);
  },
  addProject(userId, projectParams) {
    return apiClient.post(`projects/${userId}`,projectParams);
  },
  updateProject(projectId, project) {
    return apiClient.put(`projects/${projectId}`, project);
  },
  deleteProject(projectId) {
    return apiClient.delete(`projects/${projectId}`);
  },
};