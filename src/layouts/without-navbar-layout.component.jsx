import { Outlet } from "react-router-dom";

const WithoutNavbarLayout = () => {
  return (
    <div>
      
      <Outlet />
    </div>
  );
}

export default WithoutNavbarLayout;