import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  // followUserReducer,
  // unFollowUserReducer,
  userReducer,
  // userProfileReducer,
  // userRegisterReducer,
} from './reducers/userReducers';
import { userPostsReducer } from './reducers/postReducers';

const reducer = combineReducers({
  user: userReducer,
  // userRegister: userRegisterReducer,
  userPosts: userPostsReducer,
  // userProfile: userProfileReducer,
  // followUser: followUserReducer,
  // unFollowUser: unFollowUserReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  user: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
