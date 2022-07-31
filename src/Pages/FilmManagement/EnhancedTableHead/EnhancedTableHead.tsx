import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  Checkbox,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { visuallyHidden } from "@mui/utils";
import { Movie } from "Interfaces/movieInterfaces";
import { MouseEvent, ChangeEvent } from "react";

type Order = "asc" | "desc";
interface HeadCell {
  disablePadding: boolean;
  id: keyof Movie;
  label: string;
  numeric: boolean;
}
const headCells: readonly HeadCell[] = [
  {
    id: "maPhim",
    numeric: false,
    disablePadding: true,
    label: "Mã phim",
  },
  {
    id: "tenPhim",
    numeric: true,
    disablePadding: false,
    label: "Tên phim",
  },
  {
    id: "hot",
    numeric: true,
    disablePadding: false,
    label: "Hot",
  },
  {
    id: "dangChieu",
    numeric: true,
    disablePadding: false,
    label: "Đang chiếu",
  },
  {
    id: "sapChieu",
    numeric: true,
    disablePadding: false,
    label: "Sắp chiếu",
  },
  {
    id: "ngayKhoiChieu",
    numeric: true,
    disablePadding: false,
    label: "Ngày khởi chiếu",
  },
];

type Props = {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Movie) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number | undefined;
};
const EnhancedTableHead = (props: Props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Movie) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ bgcolor: "#d9f89e" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount!}
            checked={rowCount! > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center" padding="normal">
          <SettingsIcon />
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
