import { RootState } from "configStore";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  // if (!user || user.maLoaiNguoiDung === "KhachHang") {
  if (!user) {
    return <Navigate to={"/form/login"} />;
  }
  return children;
};

export default ProtectedRoute;
