import { object, string } from "yup";

const schemaAddUser = object({
  taiKhoan: string().required("Đây là trường bắt buộc!"),
  matKhau: string().required("Đây là trường bắt buộc!"),
  email: string()
    .required("Đây là trường bắt buộc!")
    .email("Email không đúng định dạng"),
  hoTen: string()
    .required("Đây là trường bắt buộc!")
    .matches(/^[^\d]+$/, "Họ tên không chứa số!"),
  soDt: string()
    .required("Đây là trường bắt buộc!")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Số điện thoại phải gồm 10 chữ số, số đầu là 0 hoặc +84!"
    ),
  maNhom: string().required("Đây là trường bắt buộc!"),
  maLoaiNguoiDung: string().required("Đây là trường bắt buộc!"),
});

export default schemaAddUser;
