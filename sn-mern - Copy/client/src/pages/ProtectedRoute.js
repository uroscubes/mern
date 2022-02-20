import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const user = useSelector(state => state.user);
  const { userInfo } = user;

  return userInfo ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoute;
