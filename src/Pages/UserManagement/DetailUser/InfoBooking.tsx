import { RootState } from "configStore";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  Typography,
  TableCell,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
type Props = {};

const InfoBooking = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.userSlice);

  const formatDay = (date: string) => {
    return dayjs(date).format("DD-MM-YYYY");
  };
  const formatTime = (date: string) => {
    return dayjs(date).format("h:mm A");
  };
  return (
    <Box>
      <Typography
        py={5}
        variant="h4"
        align="center"
        sx={{ textTransform: "uppercase" }}
      >
        Thông tin đặt vé
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Mã vé</StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Hình ảnh
              </StyledTableCell>
              <StyledTableCell align="center">Tên phim</StyledTableCell>
              <StyledTableCell align="center">Giá vé</StyledTableCell>
              <StyledTableCell align="center">Ngày đặt</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {user?.thongTinDatVe.map((row) => (
              <StyledTableRow
                key={row.maVe}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  {row.maVe}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  <img src={row.hinhAnh} alt={row.hinhAnh} width={80} />
                </StyledTableCell>
                <StyledTableCell align="center">{row.tenPhim}</StyledTableCell>
                <StyledTableCell align="center">{row.giaVe}</StyledTableCell>
                <StyledTableCell align="center">
                  {formatDay(row.ngayDat)} ~ {formatTime(row.ngayDat)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InfoBooking;
