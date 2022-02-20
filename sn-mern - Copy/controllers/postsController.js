import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from '../errors/index.js';
import cloudinary from 'cloudinary';

export const createPost = async (req, res) => {
  const { description, image } = req.body;

  if (!image) {
    throw new BadRequestError('Image is required');
  }

  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: 'posts',
  });

  const user = await User.findById(req.user.userId);

  const newPost = new Post({
    description,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    username: user.username,
    avatar: user.avatar,
    user: req.user.userId,
  });

  const post = await newPost.save();

  res.status(StatusCodes.CREATED).json({ post });
};

export const getPost = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findOne({ postId });

  res.status(StatusCodes.OK).json(post);
};

export const getPostsFeed = async (req, res) => {
  const currentUser = await User.findById(req.user.userId);
  const userPosts = await Post.find({ user: currentUser._id })
    .sort({
      createdAt: -1,
    })
    .populate('user', 'avatar username');
  const friendPosts = await Promise.all(
    currentUser.followings.map(friendId => {
      return Post.find({ user: friendId })
        .sort({
          createdAt: -1,
        })
        .populate('user', 'avatar username');
    })
  );
  res.status(StatusCodes.OK).json(userPosts.concat(...friendPosts));
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user.userId)) {
    post.likes.push(req.user.userId);
    await post.save();
    res.status(StatusCodes.OK).json(post.likes);
  } else {
    post.likes = post.likes.filter(like => like !== req.user.userId);
    await post.save();
    res.status(StatusCodes.OK).json(post.likes);
  }
};

export const getUserPosts = async (req, res) => {
  const userId = req.params.id;
  const posts = await Post.find({ user: userId })
    .sort({
      createdAt: -1,
    })
    .populate('user', 'avatar username');
  res.status(StatusCodes.OK).json(posts);
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findOne({ _id: postId });

  if (!post.user.equals(req.user.userId)) {
    throw new BadRequestError('You have no permission to do that');
  }

  await cloudinary.v2.uploader.destroy(post.image.public_id);

  await Post.deleteOne(post);

  res.status(StatusCodes.CREATED).json({
    post,
  });
};
