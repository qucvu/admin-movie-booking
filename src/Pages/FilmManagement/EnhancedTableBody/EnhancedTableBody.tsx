import {
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Stack,
  Button,
} from "@mui/material";
import { MouseEvent } from "react";
import { Movie } from "Interfaces/movieInterfaces";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof Movie>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | boolean },
  b: { [key in Key]: number | string | boolean }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

type Props = {
  dense: boolean;
  movieList: Movie[] | null;
  rowsPerPage: number;
  page: number;
  selected: string[];
  order: Order;
  orderBy: keyof Movie;
  handleClick: (event: MouseEvent<unknown>, name: string | number) => void;
};

const EnhancedTableBody = (props: Props) => {
  const {
    dense,
    movieList,
    rowsPerPage,
    page,
    selected,
    order,
    orderBy,
    handleClick,
  } = props;
  const navigate = useNavigate();
  const isSelected = (name: string | number) =>
    selected.indexOf(name as string) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movieList!.length) : 0;
  const formatDay = (date: string) => {
    return dayjs(date).format("DD-MM-YYYY");
  };
  const formatTime = (date: string) => {
    return dayjs(date).format("h:mm A");
  };
  return (
    <TableBody>
      {movieList
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort(getComparator(order, orderBy))
        .map((row: Movie, index: number) => {
          const isItemSelected = isSelected(row.maPhim);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, row.maPhim)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.maPhim}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.maPhim}
              </TableCell>
              <TableCell align="right">{row.tenPhim}</TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                <Checkbox defaultChecked={row.hot} disabled />
              </TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                <Checkbox defaultChecked={row.dangChieu} disabled />
              </TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                <Checkbox defaultChecked={row.sapChieu} disabled />
              </TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", sm: "table-cell" } }}
              >
                {formatDay(row.ngayKhoiChieu)}~{formatTime(row.ngayKhoiChieu)}
              </TableCell>
              <TableCell align="center">
                <Stack>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/detail/movie/${row.maPhim}`)}
                    sx={{ fontSize: { xs: "0.7rem", md: "0.8rem" } }}
                  >
                    Chi tiết
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default EnhancedTableBody;
