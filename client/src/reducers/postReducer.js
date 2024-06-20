function postReducer(state, action) {
  switch (action.type) {
    case "GET_POSTS": {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case "GET_POST":{
      return{
        ...state,
        post: action.payload,
      }
    }
    case "IS_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case "IS_HTTP_ERROR": {
      return {
        ...state,
        httpError: action.payload,
      };
    }
  }
}

export default postReducer;
