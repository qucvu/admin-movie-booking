export interface User {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  accessToken: string;
}

export interface UserRegister {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  hoTen: string;
  maLoaiNguoiDung?: string;
}

export interface InfoUser {
  email: string;
  hoTen: string;
  loaiNguoiDung: { maLoaiNguoiDung: string; tenLoai: string };
  maLoaiNguoiDung: string;
  maNhom: string;
  matKhau: string;
  soDT: string;
  taiKhoan: string;
  thongTinDatVe: {
    danhSachGhe: {
      maCumRap: string;
      maGhe: number;
      maHeThongRap: string;
      maRap: number;
      tenCumRap: string;
      tenGhe: string;
      tenHeThongRap: string;
      tenRap: string;
    }[];
    giaVe: number;
    hinhAnh: string;
    maVe: number;
    ngayDat: string;
    tenPhim: string;
    thoiLuongPhim: number;
  }[];
}
export interface RegisterValues {
  taiKhoan: string;
  matKhau: string;
  email: string;
  hoTen: string;
  soDt: string;
  passwordConfirm?: string;
  maNhom?: string;
  maLoaiNguoiDung?: string;
}
