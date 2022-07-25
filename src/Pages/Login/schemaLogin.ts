import { object, string } from "yup";

export const schemaLogin = object({
  taiKhoan: string().required("Đây là trường bắt buộc!"),
  matKhau: string().required("Đây là trường bắt buộc!"),
});
