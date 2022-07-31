import { LoginValues } from "Interfaces/Login";
import { User, UserRegister } from "Interfaces/User";

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
    return axiosClient.post<User>(`QuanLyNguoiDung/LayThongTinNguoiDung`, {
      params: {
        taiKhoan: taiKhoan,
      },
    });
  },
  deleteUser: (TaiKhoan: string) => {
    return axiosClient.delete(`QuanLyNguoiDung/XoaNguoiDung`, {
      params: {
        TaiKhoan: TaiKhoan,
      },
    });
  },
};

export default userAPI;
