import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'sonner';
import { useSessionStore } from '../stores/sessionStore';
import { useEffect } from 'react';

const MainLayout: React.FC = () => {
  const getUserInfo = useSessionStore((state) => state.getUserInfo);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 bg-white">
          <Outlet />
        </main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default MainLayout;