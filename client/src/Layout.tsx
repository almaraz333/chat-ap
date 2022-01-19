import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col w-full h-screen App bg-gray-100">
      <Outlet />
    </div>
  );
};
