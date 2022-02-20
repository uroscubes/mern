import { Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { friendsPosts } from '../actions/postActions';
import { useEffect } from 'react';
import Post from '../components/Post';

const HomePage = () => {
  const dispatch = useDispatch();

  const frinedsAllPosts = useSelector(state => state.userPosts);
  const { loading, posts, error } = frinedsAllPosts;

  useEffect(() => {
    dispatch(friendsPosts());
  }, [dispatch]);

  return (
    <Row>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {posts?.map(post => (
        <Post key={post._id} post={post} />
      ))}
    </Row>
  );
};

export default HomePage;
