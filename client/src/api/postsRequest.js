import axios from "./axios";

export const getPostsRequest = () => axios.get(`/posts/`);
export const getPostRequest = ({id}) => axios.get(`/posts/${id}`);
export const getPostAuthorRequest = (id) => axios.get(`/posts/users/${id}`);
export const getPostCategoriesRequest = (category) => axios.get(`/posts/categories/${category}`);
export const createPostRequest = ({data, token}) => axios.post(`/posts/`, data);
export const getPostsUserRequest = ({id}) => axios.get(`/posts/users/${id}`);
export const updataPostRequest = ({id, data}) => axios.patch(`/posts/${id}`, data);
export const deletePostRequest = ({id}) => axios.delete(`/posts/${id}`);