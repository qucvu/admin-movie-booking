import { TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import { MouseEvent } from "react";
import { User } from "Interfaces/User";

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

function getComparator<Key extends keyof User>(
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
  userList: User[] | null;
  rowsPerPage: number;
  page: number;
  selected: string[];
  order: Order;
  orderBy: keyof User;
  handleClick: (event: MouseEvent<unknown>, name: string | number) => void;
};

const EnhancedTableBody = (props: Props) => {
  const {
    dense,
    userList,
    rowsPerPage,
    page,
    selected,
    order,
    orderBy,
    handleClick,
  } = props;
  const isSelected = (name: string | number) =>
    selected.indexOf(name as string) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList!.length) : 0;
  return (
    <TableBody>
      {userList
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort(getComparator(order, orderBy))
        .map((row: User, index: number) => {
          const isItemSelected = isSelected(row.taiKhoan);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, row.taiKhoan)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.taiKhoan}
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
                {row.taiKhoan}
              </TableCell>
              <TableCell align="right">{row.hoTen}</TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                {row.email}
              </TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                {row.soDT}
              </TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", sm: "table-cell" } }}
              >
                {row.maLoaiNguoiDung}
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
