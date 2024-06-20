import axios from "./axios.js";

export const userSigninRequest = async (user) => axios.post(`/users/signin`, user);
export const userSignupRequest = async (user) => axios.post(`/users/signup`, user);
export const getAuthorsRequest = async () => axios.get(`/users/`);
export const getUserRequest = async (id) => axios.get(`/users/${id}`);
export const editUserRequest = async (data) => axios.patch(`/users/update-user`, data);
export const editUserAvatarRequest = async (avatar) => axios.post(`/users/update-avatar`, avatar);
export const verifyUserRequest = () => axios.get(`/users/verify`);