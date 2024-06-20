import { useState, createContext, useContext, useEffect, useReducer } from "react";

//api request
import {
  getPostsRequest,
  getPostAuthorRequest,
  getPostCategoriesRequest,
  createPostRequest,
  getPostsUserRequest,
  getPostRequest,
  updataPostRequest,
  deletePostRequest,
} from "../api/postsRequest.js";

//reducer
import postReducer from "../reducers/postReducer.js";

//conext
export const PostsContext = createContext();

//uso de context
export const usePost = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error("usePost must be used withing a PostProvider");
  return context;
};

//initialState
const initialState = {
  posts:[],
  post:{},
  loading: false,
  httpError: null
}

//funcion proveedora
export default function PostProvider({ children }) {
  //reducer
  const [state, dispatch] = useReducer(postReducer, initialState);

  //limpia errores
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch({ type: "IS_HTTP_ERROR", payload: null});
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [state?.httpError]);

  //obtiene post
  async function getPosts(values) {
    try {
      dispatch({ type: "IS_LOADING", payload: true});
      let res;
      if (values?.id && !values?.category) {
        res = await getPostAuthorRequest(values?.id);
      } else if (values?.category && !values?.id) {
        res = await getPostCategoriesRequest(values?.category);
      } else {
        res = await getPostsRequest();
      }
      if (res.status === 200) {
        dispatch({ type: "GET_POSTS", payload: res.data});
        return dispatch({ type: "IS_LOADING", payload: false});
      }
    } catch (error) {
      dispatch({ type: "IS_HTTP_ERROR", payload: error.response?.data.message});
      return dispatch({ type: "IS_LOADING", payload: false});
    }
  }

  //crea post
  async function createPost(values) {
    try {
      dispatch({ type: "IS_LOADING", payload: true});
      const res = await createPostRequest(values);
      if (res.status === 200) {
        dispatch({ type: "IS_LOADING", payload: false});
        return "ok";
      }
    } catch (error) {
      dispatch({ type: "IS_HTTP_ERROR", payload: error.response?.data.message});
      return dispatch({ type: "IS_LOADING", payload: false});
    }
  }

  //obtiene post de usuario
  async function getPostsUser(values) {
    try {
      dispatch({ type: "IS_LOADING", payload: true});
      const res = await getPostsUserRequest(values);
      if (res.status === 200) {
        dispatch({ type: "GET_POSTS", payload: res.data});
        return dispatch({ type: "IS_LOADING", payload: false});
      }
    } catch (error) {
      dispatch({ type: "IS_HTTP_ERROR", payload: error.response?.data.message});
      return dispatch({ type: "IS_LOADING", payload: false});;
    }
  }

  //trae post por id
  async function getPost(values) {
    try {
      dispatch({ type: "IS_LOADING", payload: true});
      const res = await getPostRequest(values);
      if (res.status === 200) {
        dispatch({ type: "GET_POST", payload: res.data});
        return dispatch({ type: "IS_LOADING", payload: false});
      }
    } catch (error) {
      dispatch({ type: "IS_HTTP_ERROR", payload: error.response?.data.message});
      return dispatch({ type: "IS_LOADING", payload: false});
    }
  }

  //edit post
  async function updatePost(values) {
    try {
      dispatch({ type: "IS_LOADING", payload: true});
      const response = await updataPostRequest(values);
      if (response.status === 200){
        dispatch({ type: "IS_LOADING", payload: false});
        return "ok";
      };
    } catch (error) {
      dispatch({ type: "IS_HTTP_ERROR", payload: error.response?.data.message});
      return dispatch({ type: "IS_LOADING", payload: false});
    }
  }

  //delete post
  async function deletePost(values) {
    try {
      dispatch({ type: "IS_LOADING", payload: true});
      const response = await deletePostRequest(values);
      if(response.status === 200){
        dispatch({ type: "IS_LOADING", payload: false});
        return "ok";
      }
    } catch (error) {
      dispatch({ type: "IS_HTTP_ERROR", payload: error.response?.data.message});
      return dispatch({ type: "IS_LOADING", payload: false});
    }
  }

  return (
    <PostsContext.Provider
      value={{
        ...state,
        getPosts,
        createPost,
        getPostsUser,
        getPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
