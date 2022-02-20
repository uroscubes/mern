import express from 'express';
const router = express.Router();

import {
  registerUser,
  loginUser,
  getUserProfile,
  getUserFriends,
  followUser,
  unFollowUser,
} from '../controllers/usersController.js';

import authenticateUser from '../middleware/auth.js';

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/profile/:id').get(getUserProfile);
router.route('/friends/:userId').get(getUserFriends);
router.route('/:id/follow').put(authenticateUser, followUser);
router.route('/:id/unfollow').put(authenticateUser, unFollowUser);

export default router;
