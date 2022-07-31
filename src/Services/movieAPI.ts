import axiosClient from "./axiosClient";
import { Movie } from "Interfaces/movieInterfaces";
const movieAPI = {
  addMovie: (movie: [key: string]) => {
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    return axiosClient.post("QuanLyPhim/ThemPhimUpLoadHinh", formData);
  },
  getMovieList: (maNhom: string = "GP01") => {
    return axiosClient.get<Movie[]>(`QuanLyPhim/LayDanhSachPhim`, {
      params: {
        maNhom: maNhom,
      },
    });
  },
  getMovieInfo: (maPhim: string | number) => {
    return axiosClient.get<Movie>(`QuanLyPhim/LayThongTinPhim`, {
      params: {
        maPhim: maPhim,
      },
    });
  },
  deleteMovie: (maPhim: string | number) => {
    return axiosClient.delete(`QuanLyPhim/XoaPhim`, {
      params: {
        maPhim: maPhim,
      },
    });
  },
  updateMovie: (payload: any) => {
    const formData = new FormData();
    for (let key in payload) {
      formData.append(key, payload[key]);
    }
    return axiosClient.post(`QuanLyPhim/CapNhatPhimUpload`, formData);
  },
};

export default movieAPI;
