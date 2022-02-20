import { Button, Col, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { allUserPosts } from '../actions/postActions';
import {
  getUserProfile,
  followUser,
  unFollowUser,
} from '../actions/userActions';
import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const userPosts = useSelector(state => state.userPosts);
  const { loading, posts, error } = userPosts;

  const userLogin = useSelector(state => state.user);
  const { userInfo, loading: loadingUser, user, success } = userLogin;

  useEffect(() => {
    dispatch(allUserPosts(id));
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  const [followed, setFollowed] = useState(
    user?.followers.includes(userInfo?._id)
  );

  useEffect(() => {
    setFollowed(user?.followers.includes(userInfo?._id));
  }, [user, userInfo]);

  const handleClick = () => {
    if (followed) {
      dispatch(unFollowUser(id));
    } else {
      dispatch(followUser(id));
    }
    setFollowed(!followed);
  };

  return (
    <>
      <Row className='justify-content-center user-info align-items-center'>
        <Col lg={4}>
          <div className='d-flex align-items-center'>
            <Image fluid src={user?.avatar.url}></Image>
            <div>
              <h2>{user?.username}</h2>
              <p>{user?.email}</p>
            </div>
          </div>
        </Col>
        <Col
          lg={5}
          className='d-flex align-items-center'
          style={{ gap: '2rem' }}
        >
          <h3>
            {posts?.length} {posts?.length === 1 ? 'post' : 'posts'}
          </h3>

          <h3>{user?.followers.length} followers</h3>
          <h3>{user?.followings.length} following</h3>
        </Col>
        {user?._id !== userInfo?._id && (
          <Col lg={2}>
            <Button onClick={handleClick} disabled={loadingUser}>
              {followed ? 'Unfollow' : 'Follow'}
            </Button>
          </Col>
        )}
      </Row>
      <Row>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {posts?.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </Row>
    </>
  );
};

export default ProfilePage;
