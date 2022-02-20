import { BsThreeDots } from 'react-icons/bs';
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../actions/postActions';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [like, setLike] = useState(post?.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const userLogin = useSelector(state => state.user);
  const { userInfo } = userLogin;

  const userPosts = useSelector(state => state.userPosts);
  const { loadingLike } = userPosts;

  useEffect(() => {
    setIsLiked(post.likes.includes(userInfo?._id));
  }, [userInfo, like, post, isLiked]);

  const handleLike = id => {
    dispatch(likePost(id));
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleDelete = id => {
    dispatch(deletePost(id));
  };

  return (
    <Col lg={4} className='mb-4'>
      <Card>
        <Card.Img variant='top' src={post.image} />
        <Card.Body>
          <div className='post-options'>
            {userInfo && (
              <div>
                <Button
                  disabled={loadingLike}
                  className='me-2'
                  onClick={() => handleLike(post._id)}
                >
                  {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                </Button>
                <Badge bg='info'>
                  {like} {like === 1 ? 'like' : 'likes'}
                </Badge>
              </div>
            )}
            {userInfo?._id === post?.user && (
              <Dropdown>
                <Dropdown.Toggle id='dropdown-basic'>
                  <BsThreeDots />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href='#'>Edit post</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(post._id)}>
                    Delete post
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
          <Card.Text className='py-3'>
            {moment(post.createdAt).fromNow()}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <InputGroup className='my-3'>
            <FormControl placeholder='Add a comment...' />
            <Button variant='outline-secondary' id='button-addon2'>
              Post
            </Button>
          </InputGroup>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Post;
