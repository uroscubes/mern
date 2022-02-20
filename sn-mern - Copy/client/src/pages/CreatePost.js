import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../actions/postActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import { ADD_POST_RESET } from '../constants/postConstants';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // const handleUpload = async e => {
  //   e.preventDefault();
  //   try {
  //     const file = e.target.files[0];
  //     if (!file) return setMessage('File not exist.');
  //     if (file.size > 1024 * 1024) return setMessage('Size too large');
  //     if (file.type !== 'image/jpeg' && file.type !== 'image/png')
  //       return setMessage('File format is incorrect');
  //     let formData = new FormData();
  //     formData.append('file', file);
  //     setLoadingFile(true);
  //     const res = await axios.post('/api/v1/post/upload', formData, {
  //       headers: {
  //         'content-type': 'multipart/form-data',
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     });
  //     setLoadingFile(false);
  //     setImage(res.data);
  //   } catch (err) {
  //     setMessage(err.response.data.msg);
  //   }
  // };

  // const handleDestroy = async () => {
  //   try {
  //     setLoadingFile(true);
  //     await axios.post(
  //       '/api/v1/post/destroy',
  //       { public_id: image.public_id },
  //       {
  //         headers: { Authorization: `Bearer ${userInfo.token}` },
  //       }
  //     );
  //     setLoadingFile(false);
  //     setImage(false);
  //   } catch (err) {
  //     alert(err.response.data.msg);
  //   }
  // };

  const addUserPost = useSelector(state => state.userPosts);
  const { loading, error, success } = addUserPost;

  useEffect(() => {
    if (success) {
      navigate('/');
      dispatch({ type: ADD_POST_RESET });
    }
  }, [success]);

  const handleSubmit = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('description', description);
    myForm.set('image', image);

    dispatch(addPost(myForm));
  };

  const createPostImagesChange = e => {
    if (e.target.name === 'image') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const styleUpload = {
    display: image ? 'block' : 'none',
  };

  return (
    <Row className='justify-content-center'>
      <Col lg={6}>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='file'
              name='image'
              id='file_up'
              accept='image/*'
              onChange={createPostImagesChange}
            />
            <div id='file_img' style={styleUpload}>
              <img src={imagePreview ? imagePreview : ''} alt='' />
            </div>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Publish
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default CreatePost;
