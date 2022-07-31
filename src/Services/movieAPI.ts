import { MovieAdd } from "Interfaces/Movie";
import axiosClient from "./axiosClient";

const movieAPI = {
  addMovie: (movie: [key: string]) => {
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    return axiosClient.post("QuanLyPhim/ThemPhimUpLoadHinh", formData);
  },
};

export default movieAPI;
