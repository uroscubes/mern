import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { loading, userInfo, error } = user;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Social Media App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {userInfo ? (
            <div className='ms-auto d-flex align-items-center'>
              <Nav.Link as={Link} to='/create-post'>
                Create Post
              </Nav.Link>
              <NavDropdown title={userInfo.username} id='username'>
                <LinkContainer to={`/profile/${userInfo._id}`}>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          ) : (
            <Nav className='ms-auto'>
              <Nav.Link as={Link} to='/login'>
                Log In
              </Nav.Link>
              <Nav.Link as={Link} to='/register'>
                Sign Up
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
