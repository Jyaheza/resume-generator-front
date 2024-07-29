import apiClient from "./services";

export default {
  getReviews() {
    return apiClient.get("reviews");
  },
  getReviewsByUserId(userId) {
    return apiClient.get(`reviews/${userId}`);
  },
  getReview(id) {
    return apiClient.get(`reviews/${id}`);
  },
  getReviewsForResume(resumeId) {
    return apiClient.get(`/reviews/${resumeId}`);
  },
  addReview(userId, reviewParams) {
    return apiClient.post(`reviews/${userId}`, reviewParams);
  },  
  updateReview(reviewId, review) {
    return apiClient.put(`reviews/${reviewId}`, review);
  },
  deleteReview(reviewId) {
    return apiClient.delete(`reviews/${reviewId}`);
  },
};