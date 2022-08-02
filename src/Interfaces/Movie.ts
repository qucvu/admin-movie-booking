export interface MovieAdd {
  tenPhim: string;
  biDanh?: string;
  trailer: string;
  hinhAnh: FileList;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: string;
}

export interface ShowTimeAdd {
  maPhim: string;
  ngayChieuGioChieu: string;
  maRap: string;
  giaVe: number;
}
