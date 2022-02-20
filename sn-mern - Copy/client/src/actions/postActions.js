import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  POST_LIKE_REQUEST,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  FRIENDS_POSTS_REQUEST,
  FRIENDS_POSTS_SUCCESS,
  FRIENDS_POSTS_FAIL,
} from '../constants/postConstants';
import axios from 'axios';

export const friendsPosts = () => async (dispatch, getState) => {
  dispatch({ type: FRIENDS_POSTS_REQUEST });
  try {
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/post/`, config);

    dispatch({ type: FRIENDS_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FRIENDS_POSTS_FAIL,
      payload: error,
    });
  }
};

export const addPost = post => async (dispatch, getState) => {
  dispatch({ type: ADD_POST_REQUEST });
  try {
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/v1/post/`, post, config);

    dispatch({ type: ADD_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_POST_FAIL,
      payload: { msg: error.response.data.msg },
    });
  }
};

export const allUserPosts = id => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/post/profile/${id}`);

    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload: { msg: error.response.data.msg },
    });
  }
};

export const likePost = id => async (dispatch, getState) => {
  dispatch({ type: POST_LIKE_REQUEST });
  try {
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/post/${id}/like`, null, config);

    dispatch({ type: POST_LIKE_SUCCESS, payload: { id, likes: data } });
  } catch (error) {
    dispatch({
      type: POST_LIKE_FAIL,
      payload: error,
    });
  }
};

export const deletePost = id => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/post/${id}`, config);

    dispatch({ type: DELETE_POST_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: { msg: error.response.data.msg },
    });
  }
};
