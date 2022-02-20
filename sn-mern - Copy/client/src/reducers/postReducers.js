import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_LIKE_SUCCESS,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  POST_LIKE_REQUEST,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  FRIENDS_POSTS_REQUEST,
  FRIENDS_POSTS_SUCCESS,
  FRIENDS_POSTS_FAIL,
  ADD_POST_RESET,
} from '../constants/postConstants';

const initialState = {
  posts: [],
  post: {},
  friendsPosts: [],
};

export const userPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true };
    case ADD_POST_REQUEST:
      return { loading: true, post: {} };
    case POST_LIKE_REQUEST:
      return { ...state, loadingLike: true };
    case FRIENDS_POSTS_REQUEST:
      return { ...state, loading: true, posts: [] };
    case FRIENDS_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case POST_LIST_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false,
        success: true,
      };
    case ADD_POST_RESET:
      return {
        ...state,
        success: false,
      };
    case POST_LIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),

        loadingLike: false,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        loading: false,
      };
    case POST_LIST_FAIL:
    case DELETE_POST_FAIL:
    case ADD_POST_FAIL:
    case FRIENDS_POSTS_FAIL:
      return { loading: false, error: action.payload.msg };
    default:
      return state;
  }
};
