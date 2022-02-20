import express from 'express';
const router = express.Router();

import {
  createPost,
  getUserPosts,
  likePost,
  getPost,
  deletePost,
  getPostsFeed,
} from '../controllers/postsController.js';

import authenticateUser from '../middleware/auth.js';

router
  .route('/')
  .post(authenticateUser, createPost)
  .get(authenticateUser, getPostsFeed);
router.route('/:id').get(getPost).delete(authenticateUser, deletePost);
router.route('/:id/like').put(authenticateUser, likePost);
router.route('/profile/:id').get(getUserPosts);

export default router;
