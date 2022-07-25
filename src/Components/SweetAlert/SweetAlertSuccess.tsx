import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";

type Props = {
  show: boolean;
  navigateDestination: string;
  title?: string;
  text?: string;
};

const SweetAlertSuccess = ({
  show,
  navigateDestination,
  title = "Đăng nhập thành công",
  text,
}: Props) => {
  const navigate = useNavigate();
  const [swalProps, setSwalProps] = useState({});
  useEffect(() => {
    setSwalProps({
      show: show,
      position: "center",
      icon: "success",
      title: title,
      text: text,
      showConfirmButton: true,
      timer: 2500,
    });
  }, [show]);
  return (
    <SweetAlert2
      {...swalProps}
      didClose={() => navigate(navigateDestination)}
    />
  );
};

export default SweetAlertSuccess;
