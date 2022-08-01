import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";

type Props = {
  show: boolean;
  title: string;
  callbackClose: () => void;
};

const SweetAlertSuccess2 = ({ show, title, callbackClose }: Props) => {
  const [swalProps, setSwalProps] = useState({});
  useEffect(() => {
    setSwalProps({
      show: show,
      position: "center",
      icon: "success",
      title: title,
      showConfirmButton: true,
      timer: 3000,
    });
  }, [show]);

  return <SweetAlert2 {...swalProps} didClose={callbackClose} />;
};

export default SweetAlertSuccess2;
