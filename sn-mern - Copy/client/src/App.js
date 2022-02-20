import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './pages/ProtectedRoute';
import CreatePost from './pages/CreatePost';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile/:id' element={<ProfilePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route
              path='*'
              element={
                <div>
                  <h1>ERROR</h1>
                </div>
              }
            />
            <Route path='/' element={<ProtectedRoute />}>
              <Route path='/create-post' element={<CreatePost />} />
            </Route>
          </Routes>
        </Container>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
