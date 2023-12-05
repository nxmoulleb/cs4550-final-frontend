import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
export const signin = async (credentials) => {
  const response = await request.post(`${USERS_API}/signin`, credentials);
  return response.data;
};
export const register = async (credentials) => {
  const response = await request.post(`${USERS_API}/register`, credentials);
  return response.data;
};
export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
  };
export const findUserById = async (id) => {
    const response = await request.get(`${USERS_API}/${id}`);
    return response.data;
}
export const update = async (user) => {
    const response = await request.put(`${USERS_API}/${user._id}`, user);
    return response.data;
}
export const signout = async () => {
    const response = await request.post(`${USERS_API}/signout`)
    return response.data;
}