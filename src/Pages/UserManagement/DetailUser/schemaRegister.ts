import { object, string, ref } from "yup";

export const schemaRegister = object({
  taiKhoan: string()
    .required("Đây là trường bắt buộc!")
    .matches(
      /^[a-zA-Z0-9]{5,}$/,
      "Tài khoản chỉ gồm chữ hoa, thường, số và ít nhất 5 kí tự!"
    ),
  matKhau: string()
    .required("Đây là trường bắt buộc!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Mật khẩu ít nhất một chữ cái, một số và ít nhất 6 kí tự!"
    ),
  passwordConfirm: string()
    .required("Đây là trường bắt buộc!")
    .oneOf([ref("matKhau")], "Mật khẩu không trùng khớp"),
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
});
