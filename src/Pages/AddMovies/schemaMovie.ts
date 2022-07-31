import { mixed, object, string } from "yup";

const schemaAddMovie = object({
  tenPhim: string().required("Đây là trường bắt buộc!"),
  trailer: string().required("Đây là trường bắt buộc!"),
  moTa: string().required("Đây là trường bắt buộc!"),
  maNhom: string().required("Đây là trường bắt buộc!"),
  ngayKhoiChieu: string().required("Đây là trường bắt buộc!"),
  danhGia: string().required("Đây là trường bắt buộc!"),
  hinhAnh: mixed().required("Đây là trường bắt buộc!"),
});

export default schemaAddMovie;
