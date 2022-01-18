import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen App">
      <Outlet />
    </div>
  );
};
