import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;