import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
//API
import {
  userSigninRequest,
  userSignupRequest,
  getAuthorsRequest,
  getUserRequest,
  editUserRequest,
  editUserAvatarRequest,
  verifyUserRequest,
} from "../api/usersRequest.js";

//js-cookie
import Cookies from "js-cookie";

//create context
export const UserContext = createContext();

//export uso de context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used withing a UserProviders");
  return context;
};

//funcion redctora
import userReducer from "../reducers/userReducer.js";

//initial State
const initialState = {
  isAuth: {
    status: false,
    data: {},
  },
  authors: [],
  avatar: "",
  httpError: "",
  loading: false,
};

//funcion proveedora
export function UserProvider({ children }) {
  //reducer
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    userVerifyAuth();
  }, []);

  async function userVerifyAuth() {
    try {
      const cookie = Cookies.get("accessToken");
      if (!cookie) {
        return dispatch({
          type: "IS_AUTH",
          payload: { status: false, data: {} },
        });
      }
      verifyUser();
    } catch (error) {
      return dispatch({
        type: "IS_HTTP_ERROR",
        payload: error.response.data.message,
      });
    }
  }

  //quita error de pantalla;
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: "IS_HTTP_ERROR", payload: "" });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [state?.httpError]);

  //register
  async function userSignup(user) {
    try {
      dispatch({ type: "IS_LOADING", payload: true });
      const res = await userSignupRequest(user);
      if (res.status === 201) {
        dispatch({ type: "IS_LOADING", payload: false });
        return "ok";
      }
    } catch (error) {
      dispatch({
        type: "IS_HTTP_ERROR",
        payload: error.response.data.message,
      });
      return dispatch({ type: "IS_LOADING", payload: false });
    }
  }

  //login
  async function userSignin(user) {
    try {
      dispatch({ type: "IS_LOADING", payload: true });
      const res = await userSigninRequest(user);
      if (res.status === 200) {
        dispatch({
          type: "IS_AUTH",
          payload: { status: true, data: res.data },
        });
        return "ok";
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        dispatch({
          type: "IS_HTTP_ERROR",
          payload: error.response.data.reduce(
            (acc, item) => acc + item.message + ", ",
            ""
          ),
        });
      } else {
        dispatch({
          type: "IS_HTTP_ERROR",
          payload: error.response.data.message,
        });
      }
      return dispatch({ type: "IS_LOADING", payload: false });
    }
  }

  //getAuthors
  async function getAuthors() {
    try {
      dispatch({ type: "IS_LOADING", payload: true });
      const res = await getAuthorsRequest();
      if (res.status === 200) {
        dispatch({ type: "GET_AUTHORS", payload: res.data });
        dispatch({ type: "IS_LOADING", payload: false });
        return "ok";
      }
    } catch (error) {
      dispatch({
        type: "IS_HTTP_ERROR",
        payload: error.response.data.message,
      });
      return dispatch({ type: "IS_LOADING", payload: false });
    }
  }

  //Update user
  async function updateUser(data) {
    try {
      dispatch({ type: "IS_LOADING", payload: true });
      const res = await editUserRequest(data);
      if (res.status === 200) return "ok";
    } catch (error) {
      dispatch({
        type: "IS_HTTP_ERROR",
        payload: error.response.data.message,
      });
      return dispatch({ type: "IS_LOADING", payload: false });
    }
  }

  //update user avatar
  async function updateUserAvatar(avatar) {
    try {
      dispatch({ type: "IS_LOADING", payload: true });
      const res = await editUserAvatarRequest(avatar);
      if (res.status === 200) {
        dispatch({ type: "UPDATE_AVATAR", payload: res.data.avatar });
        return dispatch({ type: "IS_LOADING", payload: false });
      }
    } catch (error) {
      dispatch({
        type: "IS_HTTP_ERROR",
        payload: error.response.data.message,
      });
      return dispatch({ type: "IS_LOADING", payload: false });
    }
  }

  //set avatar handle
  function setAvatarHandle(value) {
    return dispatch({ type: "UPDATE_AVATAR", payload: value });
  }

  //logout
  function userSignout() {
    Cookies.remove("accessToken");
    return dispatch({ type: "IS_AUTH", payload: { status: false, data: {} } });
  }

  //al actualizar pagina o refresh se va en busca del usuario nuevamente
  async function verifyUser() {
    try {
      const res = await verifyUserRequest();
      if (res.status === 200) {
        return dispatch({
          type: "IS_AUTH",
          payload: { status: true, data: res.data },
        });
      }
    } catch (error) {
      return dispatch({
        type: "IS_HTTP_ERROR",
        payload: error.response.data.message,
      });
    }
  }
  return (
    <UserContext.Provider
      value={{
        ...state,
        userSignin,
        userSignup,
        getAuthors,
        updateUser,
        userSignout,
        updateUserAvatar,
        setAvatarHandle,
        verifyUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
