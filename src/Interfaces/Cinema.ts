export interface Cinema {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
}

export interface CinemaInfo {
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
  danhSachRap: TheaterList[];
}

export interface TheaterList {
  maRap: number;
  tenRap: string;
}
