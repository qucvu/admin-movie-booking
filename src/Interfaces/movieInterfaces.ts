export interface Movie {
  maPhim: number | string;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

export interface PaginationMovie {
  count: number;
  currentPage: number;
  items: Movie[];
  totalCount: number;
  totalPages: number;
}
