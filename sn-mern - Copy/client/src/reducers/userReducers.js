import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UNFOLLOW_FAIL,
  USER_UNFOLLOW_REQUEST,
  USER_UNFOLLOW_SUCCESS,
} from '../constants/userConstants';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_DETAILS_REQUEST:
    case USER_FOLLOW_REQUEST:
    case USER_UNFOLLOW_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case USER_FOLLOW_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          followers: [...state.user.followers, state.userInfo._id],
        },
        loading: false,
      };
    case USER_UNFOLLOW_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          followers: state.user.followers.filter(
            follower => follower !== state.userInfo._id
          ),
        },
        loading: false,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_DETAILS_FAIL:
    case USER_FOLLOW_FAIL:
    case USER_UNFOLLOW_FAIL:
      return { ...state, loading: false, error: action.payload.msg };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
