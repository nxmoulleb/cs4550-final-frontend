import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/collections`;

export const createCollection = async (userId, username) => {
  const response = await request.post(`${USERS_API}`, {ownerId: userId, ownerUsername: username, lastUpdated: Date.now()});
  return response.data;
}
export const getCollectionByUserId = async (userId) => {
  const response = await request.get(`${USERS_API}/ownerId/${userId}`);
  return response.data;
}
export const findAllCollections = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};
export const findRecentCollections = async () => {
  const response = await request.get(`${USERS_API}/recent`);
  return response.data;
}
export const findReviewerCollections = async (id) => {
  const response = await request.get(`${USERS_API}/reviewer/${id}`);
  return response.data;
}
export const findObjectInCollections = async (id) => {
  const response = await request.get(`${USERS_API}/object/${id}`);
  return response.data;
}
export const updateCollection = async (userId, update) => {
  const response = await request.put(`${USERS_API}/${userId}`, update);
  return response.data;
}
export const updateCollectionItems = async (userId, itemData) => {
  const response = await request.put(`${USERS_API}/items/${userId}`, itemData);
  return response.data;
}
export const updateCollectionCollaberators = async (ownerId, userData) => {
  const response = await request.put(`${USERS_API}/collab/${ownerId}`, {userData: userData});
  return response.data;
}
export const deleteItemInCollection = async (userId, itemId) => {
  const response = await request.delete(`${USERS_API}/items/${userId}/${itemId}`);
  return response.data;
}