import { Outlet } from 'react-router-dom';
import Toast from '../components/Toast-Container/toast-container';
import Sidebar from '../components/SideBar/sidebar';
import { AdminProvider } from '../context/admin-context/admin.context';

const SidebarLayout = () => {
  return (
    <AdminProvider>
      <div className="flex max-w-[1400px] w-full mx-auto">
        <Sidebar />
        <div className="ml-[100px] w-full bg-[#141414] rounded-xl my-[50px] px-[30px] py-[20px]">
          <Outlet />
        </div>
        <Toast />
      </div>
    </AdminProvider>
  );
};

export default SidebarLayout;
