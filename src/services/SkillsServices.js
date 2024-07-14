import apiClient from "./services";

export default {
  getSkills() {
    return apiClient.get("skills");
  },
  getSkillsByUserId(userId) {
    return apiClient.get(`skills/user/${userId}`);
  },
  getSkill(id) {
    return apiClient.get(`skills/${id}`);
  },
  addSkill(userId, skillParams) {
    return apiClient.post(`skills/${userId}`,skillParams);
  },
  updateSkill(skillId, skill) {
    return apiClient.put(`skills/${skillId}`, skill);
  },
  deleteSkill(skillId) {
    return apiClient.delete(`skills/${skillId}`);
  },
};