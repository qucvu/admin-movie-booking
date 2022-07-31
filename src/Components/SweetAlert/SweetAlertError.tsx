import React, { useEffect, useState } from "react";
import SweetAlert2 from "react-sweetalert2";

type Props = {
  show: boolean;
  title?: string | null;
  text?: string;
  callbackClose?: () => void;
};

const SweetAlertError = ({ show, title, text, callbackClose }: Props) => {
  const [swalProps, setSwalProps] = useState({});
  useEffect(() => {
    setSwalProps({
      show: show,
      position: "center",
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: true,
      timer: 3000,
    });
  }, [show, title, text]);
  return <SweetAlert2 {...swalProps} didClose={callbackClose} />;
};

export default SweetAlertError;
