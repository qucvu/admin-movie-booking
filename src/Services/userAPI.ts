import { LoginValues } from "Interfaces/Login";
import { User, UserRegister, RegisterValues } from "Interfaces/User";

import axiosClient from "./axiosClient";

const userAPI = {
  getUser: (LoginValues: LoginValues) => {
    return axiosClient.post<User>("QuanLyNguoiDung/DangNhap", LoginValues);
  },

  addUser: (userRegister: UserRegister) => {
    return axiosClient.post<UserRegister>(
      "QuanLyNguoiDung/ThemNguoiDung",
      userRegister
    );
  },
  getUserList: (tuKhoa?: string) => {
    return axiosClient.get<User[]>(`QuanLyNguoiDung/LayDanhSachNguoiDung`, {
      params: {
        tuKhoa: tuKhoa,
      },
    });
  },

  getUserInfo: (taiKhoan: string) => {
    return axiosClient.post<any>(
      `QuanLyNguoiDung/LayThongTinNguoiDung?=${taiKhoan}`
    );
  },

  deleteUser: (TaiKhoan: string) => {
    return axiosClient.delete(`QuanLyNguoiDung/XoaNguoiDung`, {
      params: {
        TaiKhoan: TaiKhoan,
      },
    });
  },
  putUpdateUser: (payload: RegisterValues, maNhom: string = "GP01") => {
    return axiosClient.post(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, {
      ...payload,
      maNhom: maNhom,
    });
  },
};

export default userAPI;
