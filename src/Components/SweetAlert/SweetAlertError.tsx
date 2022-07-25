import React, { useEffect, useState } from "react";
import SweetAlert2 from "react-sweetalert2";

type Props = {
  show: boolean;
  title?: string;
  text?: string;
};

const SweetAlertError = ({ show, title, text }: Props) => {
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
  }, [show]);
  return <SweetAlert2 {...swalProps} />;
};

export default SweetAlertError;
