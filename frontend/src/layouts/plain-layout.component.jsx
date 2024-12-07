import { Outlet } from "react-router-dom";
import Toast from "../components/Toast-Container/toast-container";
import { EmailVerificationProvider } from "../context/verification-context/verification-context";

const PlaneLayout = () => {
  return (
    <div>
      <EmailVerificationProvider>
      <Outlet />
      <Toast />
      </EmailVerificationProvider>
    </div>
  );
}

export default PlaneLayout;