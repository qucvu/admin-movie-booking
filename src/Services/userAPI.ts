import { LoginValues } from "Interfaces/Login";
import { User, UserRegister } from "Interfaces/User";

import { RegisterValues } from "Interfaces/Register";

import axiosClient from "./axiosClient";

const userAPI = {
  getUser: (LoginValues: LoginValues) => {
    return axiosClient.post<User>("QuanLyNguoiDung/DangNhap", LoginValues);
  },
  postRegisterUser: (RegisterValues: RegisterValues) => {
    return axiosClient.post<UserRegister>(
      "QuanLyNguoiDung/DangKy",
      RegisterValues
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
