import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthState, userInfoState } from '../../atoms';
import { RequireAuthProps } from './types';

export const RequireAuth: React.FC<RequireAuthProps> = () => {
  const location = useLocation();
  const isAuth = useRecoilValue(isAuthState);
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
