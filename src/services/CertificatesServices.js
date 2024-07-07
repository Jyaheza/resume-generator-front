import apiClient from "./services";

export default {
  getCertificates() {
    return apiClient.get("certificates");
  },
  getCertificatesByUserId(userId) {
    return apiClient.get(`certificates/${userId}`);
  },
  getCertificate(id) {
    return apiClient.get(`certificates/${id}`);
  },
  addCertificate(userId, certificateParams) {
    return apiClient.post(`certificates/${userId}`,certificateParams);
  },
  updateCertificate(certificateId, certificate) {
    return apiClient.put(`certificates/${certificateId}`, certificate);
  },
  deleteCertificate(certificateId) {
    return apiClient.delete(`certificates/${certificateId}`);
  },
};