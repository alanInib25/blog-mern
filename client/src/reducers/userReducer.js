function userReducer(state, action) {
  switch(action.type){
    case"IS_AUTH":{
      return{
        ...state,
        isAuth: {
          ...state.isAuth,
          status: action.payload.status,
          data: action.payload.data,
        }
      }
    }
    case "IS_LOADING":{
      return{
        ...state,
        loading: action.payload
      }
    }
    case "IS_HTTP_ERROR":{
      return{
        ...state,
        httpError: action.payload
      }
    }
    case "GET_AUTHORS":{
      return {
        ...state,
        authors: action.payload
      }
    }
    case "UPDATE_AVATAR":{
      return{
        ...state,
        avatar: action.payload
      }
    }
    case "VERIFY_USER":{
      
    }
  }
}

export default userReducer;