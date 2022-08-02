import { Cinema, CinemaInfo } from "Interfaces/Cinema";
import { ShowTimeAdd } from "Interfaces/Movie";
import axiosClient from "./axiosClient";
const cinemaAPI = {
  getCinemaList: (cinemaId?: string) => {
    return axiosClient.get<Cinema[]>("QuanLyRap/LayThongTinHeThongRap", {
      params: {
        maHeThongRap: cinemaId,
      },
    });
  },

  getCinemaInfo: (cinemaId: string) =>
    axiosClient.get<CinemaInfo[]>("QuanLyRap/LayThongTinCumRapTheoHeThong", {
      params: {
        maHeThongRap: cinemaId,
      },
    }),

  addShowTimeCinema: (calendar: ShowTimeAdd) =>
    axiosClient.post<string>("QuanLyDatVe/TaoLichChieu", calendar),
};

export default cinemaAPI;
