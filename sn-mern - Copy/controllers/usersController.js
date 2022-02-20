import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from '../errors/index.js';
import cloudinary from 'cloudinary';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    throw new UnauthenticatedError('Invalid Credentials');
  }
};

export const registerUser = async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  });

  const { username, email, password, passwordConfirm, avatar } = req.body;

  if (!username || !email || !password || !passwordConfirm) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ email });

  if (user) {
    throw new BadRequestError('User already exist with that email address');
  } else {
    const user = await User.create({
      username,
      email,
      password,
      passwordConfirm,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      token,
    });
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(StatusCodes.OK).json({
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
      followers: user.followers,
      followings: user.followings,
      email: user.email,
    });
  } else {
    throw new NotFoundError('User not found');
  }
};

export const followUser = async (req, res) => {
  if (req.user.userId !== req.params.id) {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.userId);
    if (!user.followers.includes(req.user.userId)) {
      await user.updateOne({ $push: { followers: req.user.userId } });
      await currentUser.updateOne({ $push: { followings: req.params.id } });
      res.status(200).json(req.user.userId);
    } else {
      res.status(403).json('you allready follow this user');
    }
  } else {
    res.status(403).json('you cant follow yourself');
  }
};

export const unFollowUser = async (req, res) => {
  if (req.user.userId !== req.params.id) {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.userId);
    if (user.followers.includes(req.user.userId)) {
      await user.updateOne({ $pull: { followers: req.user.userId } });
      await currentUser.updateOne({ $pull: { followings: req.params.id } });
      res.status(200).json('user has been unfollowed');
    } else {
      res.status(403).json('you dont follow this user');
    }
  } else {
    res.status(403).json('you cant unfollow yourself');
  }
};

export const getUserFriends = async (req, res) => {
  const user = await User.findById(req.params.userId);
  const friends = await Promise.all(
    user.followings.map(friendId => {
      return User.findById(friendId);
    })
  );
  let friendList = [];
  friends.map(friend => {
    const { _id, username, avatar } = friend;
    friendList.push({ _id, username, avatar });
  });
  res.status(200).json(friendList);
};
