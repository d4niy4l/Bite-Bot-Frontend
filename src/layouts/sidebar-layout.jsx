import { Outlet } from "react-router-dom";
import Toast from "../components/Toast-Container/toast-container";
import Sidebar from "../components/SideBar/sidebar";


const SidebarLayout = () => {
  return (
      <div className="flex max-w-[1400px] w-full mx-auto">
        <Sidebar  />
        <div className="ml-[100px] w-full bg-[#141414] rounded-xl my-[50px] px-[30px] py-[20px]">
          <Outlet />
        </div>
        <Toast/>
      </div>
  );
};

export default SidebarLayout;