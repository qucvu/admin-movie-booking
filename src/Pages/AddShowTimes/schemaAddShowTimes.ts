import { number, object, string } from "yup";

export const schemaShowTime = object({
  maPhim: string().required("Đây là trường bắt buộc!"),
  ngayChieuGioChieu: string().required("Đây là trường bắt buộc!"),
  maRap: string().required("Đây là trường bắt buộc!"),
  giaVe: string().matches(/^[1-9][0-9]*$/, "Đây là trường bắt buộc chọn"),
});
