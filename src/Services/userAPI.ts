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
};

export default userAPI;
