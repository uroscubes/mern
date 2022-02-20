import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = useSelector(state => state.user);
  const { loading, userInfo, error } = registerUser;

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { username, email, password, passwordConfirm } = user;

  useEffect(() => {
    if (userInfo) {
      navigate(`/profile/${userInfo._id}`);
    }
  }, [userInfo]);

  const handleSubmit = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('username', username);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('passwordConfirm', passwordConfirm);
    myForm.set('avatar', avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = e => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const styleUpload = {
    display: avatar ? 'block' : 'none',
  };

  return (
    <Row className='justify-content-center'>
      <Col lg={6}>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='file'
              name='avatar'
              id='file_up'
              accept='image/*'
              onChange={registerDataChange}
            />
            <div id='file_img' style={styleUpload}>
              <img src={avatarPreview ? avatarPreview : ''} alt='' />
            </div>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              name='username'
              placeholder='Enter username'
              value={username}
              onChange={registerDataChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              value={email}
              onChange={registerDataChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={registerDataChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              name='passwordConfirm'
              placeholder='Confirm password'
              value={passwordConfirm}
              onChange={registerDataChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Register
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default RegisterPage;
