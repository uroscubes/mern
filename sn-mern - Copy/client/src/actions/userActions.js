import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_UNFOLLOW_REQUEST,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAIL,
} from '../constants/userConstants';
import axios from 'axios';

const displayAlert = () => dispatch => {
  dispatch({ type: 'DISPLAY_ALERT' });
  clearAlert(); //pasujem ovde funkciju da bih obrisao alert 👇
};

const clearAlert = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'CLEAR_ALERT' });
  }, 3000);
};

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/v1/user/login',
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data.msg);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: { msg: error.response.data.msg },
    });
  }
};

export const register = userdata => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/v1/user/register',
      userdata,
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data.msg);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: { msg: error.response.data.msg },
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const getUserProfile = id => async dispatch => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/v1/user/profile/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: { msg: error.response.data.msg },
    });
  }
};

export const followUser = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_FOLLOW_REQUEST });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/v1/user/${id}/follow`, null, config);

    dispatch({
      type: USER_FOLLOW_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_FOLLOW_FAIL,
      payload: { msg: error.response.data.msg },
    });
  }
};

export const unFollowUser = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UNFOLLOW_REQUEST });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/v1/user/${id}/unfollow`, null, config);

    dispatch({ type: USER_UNFOLLOW_SUCCESS });
  } catch (error) {
    console.log(error.response.data.msg);
    dispatch({
      type: USER_UNFOLLOW_FAIL,
      payload: { msg: error.response.data.msg },
    });
  }
};
