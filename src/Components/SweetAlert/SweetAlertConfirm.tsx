import React, { useEffect, useState } from "react";
import SweetAlert2 from "react-sweetalert2";

type Props = {
  show: boolean;
  title: string;
  text?: string;
  callbackConfirm: () => void;
  callbackClose?: () => void;
  icon?: string;
  showCancelButton?: boolean;
};

const SweetAlertConfirm = ({
  show,
  title,
  text,
  callbackConfirm,
  callbackClose,
  icon = "question",
  showCancelButton = true,
}: Props) => {
  const [swalProps, setSwalProps] = useState({});
  useEffect(() => {
    setSwalProps({
      show: show,
      position: "center",
      icon: icon,
      title: title,
      text: text,
      showCancelButton: showCancelButton,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    });
  }, [show]);
  return (
    <SweetAlert2
      {...swalProps}
      onConfirm={callbackConfirm}
      didClose={callbackClose}
    />
  );
};

export default SweetAlertConfirm;
