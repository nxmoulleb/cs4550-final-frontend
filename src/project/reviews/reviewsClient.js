import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/reviews`;

export const createReview = async (review) => {
  const response = await request.post(`${USERS_API}`, review);
  return response.data;
};
export const findAllReviews = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};
export const findReviewByCollectionId = async (collectionId) => {
    const response = await request.get(`${USERS_API}/${collectionId}`);
    return response.data;
}
export const findReviewByAuthorId = async (authorId) => {
    const response = await request.get(`${USERS_API}/by/${authorId}`);
    return response.data;
}
export const deleteReview = async (authorId) => {
    const response = await request.delete(`${USERS_API}/${authorId}`);
    return response.data;
}