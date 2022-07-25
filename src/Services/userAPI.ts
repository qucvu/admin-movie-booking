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
};

export default userAPI;
