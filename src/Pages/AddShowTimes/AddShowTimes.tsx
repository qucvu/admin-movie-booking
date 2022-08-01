import styled from "@emotion/styled";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { AppDispatch, RootState } from "configStore";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowTimeAdd } from "Interfaces/Movie";
import { FieldErrors, useForm } from "react-hook-form";
import { getMovieList } from "Slices/movieSlice";
import { addShowTimeCinema, getCinemaInfo, getCinemaList } from "Slices/cinema";
import { TheaterList } from "Interfaces/Cinema";
import dayjs from "dayjs";
import SweetAlertSuccess2 from "Components/SweetAlert/SweetAlertSuccess2";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaShowTime } from "./schemaAddShowTimes";
import { SpanError } from "Pages/AddUser/AddUser";

const Title = styled.h1`
  text-align: center;
`;
const StyledImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const StyledSelect = styled(Select)`
  & .MuiSelect-select {
    display: flex;
    align-items: center;
  }
`;

const formatDay = (date: Date) => {
  return dayjs(date).format("YYYY-MM-DDThh:mm");
};
const AddShowTimes = () => {
  const { isMovieLoading, movieList } = useSelector(
    (state: RootState) => state.movieSlice
  );

  const { cinemaList, cinemaInfo } = useSelector(
    (state: RootState) => state.cinema
  );
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ShowTimeAdd>({
    defaultValues: {
      maPhim: "",
      ngayChieuGioChieu: formatDay(new Date()),
      maRap: "",
      giaVe: 0,
    },
    mode: "onTouched",
    resolver: yupResolver(schemaShowTime),
  });
  const isMounted = useRef(false);
  const values = getValues();
  const [valueInput, setValueInput] = useState({
    ...values,
    maHeThongRap: "",
    maCumRap: "",
    maRap: "",
    giaVe: "",
  });
  const [theaterList, setTheaterList] = useState<TheaterList[]>([]);
  const [modalSucess, setModalSuccess] = useState(false);
  useEffect(() => {
    dispatch(getMovieList());
    dispatch(getCinemaList());
  }, []);

  const handleChangeSelect = (
    evt: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<any>
  ) => {
    setValueInput({ ...valueInput, [evt.target.name]: evt.target.value });
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    dispatch(getCinemaInfo(valueInput.maHeThongRap));
    setValueInput({ ...valueInput, maCumRap: "", maRap: "" });
  }, [valueInput.maHeThongRap]);

  useEffect(() => {
    setValueInput({ ...valueInput, maRap: "" });
    const listTheater = cinemaInfo.find(
      (item) => item.maCumRap === valueInput.maCumRap
    );
    setTheaterList(listTheater?.danhSachRap as TheaterList[]);
  }, [valueInput.maCumRap]);

  const onValid = async (values: ShowTimeAdd) => {
    const payload = {
      ...values,
      ngayChieuGioChieu: dayjs(values.ngayChieuGioChieu).format(
        "DD/MM/YYYY hh:mm:ss"
      ),
      maRap: valueInput.maCumRap,
    };
    console.log(payload);

    try {
      await dispatch(addShowTimeCinema(payload)).unwrap();
      setModalSuccess(true);
      reset();
    } catch (error) {}
  };

  const onError = (error: FieldErrors<ShowTimeAdd>) => {
    console.log(error);
  };

  return (
    <Container>
      <SweetAlertSuccess2
        show={modalSucess}
        title="Thêm lịch chiếu thành công"
        callbackClose={() => {
          setModalSuccess(false);
          setValueInput({
            ...values,
            maHeThongRap: "",
            maCumRap: "",
            maRap: "",
            giaVe: "",
          });
        }}
      />
      <Title>Thêm lịch chiếu</Title>
      <form onSubmit={handleSubmit(onValid, onError)}>
        <Grid
          container
          spacing={2}
          justifyContent={{ xs: "center", md: "left" }}
        >
          <Grid item xs={10} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="movieId">Chọn phim</InputLabel>
              <StyledSelect
                labelId="movieId"
                label="Chọn phim"
                value={valueInput.maPhim}
                {...register("maPhim", {
                  onChange: handleChangeSelect,
                })}
                MenuProps={{
                  sx: {
                    maxHeight: "16rem",
                    maxWidth: "0",
                  },
                }}
              >
                {movieList?.map((item) => (
                  <MenuItem key={item.maPhim} value={item.maPhim}>
                    <StyledImg src={item.hinhAnh} alt={item.tenPhim} />
                    {item.tenPhim}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
            {errors.maPhim && <SpanError>{errors.maPhim.message}</SpanError>}
            <FormControl fullWidth margin="normal">
              <InputLabel id="price">Chọn giá vé</InputLabel>
              <StyledSelect
                labelId="price"
                label="Chọn giá vé"
                value={valueInput.giaVe}
                {...register("giaVe", {
                  onChange: handleChangeSelect,
                })}
              >
                <MenuItem value={70000}>70.000VND</MenuItem>
                <MenuItem value={80000}>80.000VND</MenuItem>
                <MenuItem value={90000}>90.000VND</MenuItem>
                <MenuItem value={100000}>100.000VND</MenuItem>
                <MenuItem value={120000}>120.000VND</MenuItem>
              </StyledSelect>
            </FormControl>
            {errors.giaVe && <SpanError>{errors.giaVe.message}</SpanError>}
            <TextField
              fullWidth
              margin="normal"
              id="datetime-local"
              label="Chọn ngày và giờ chiếu"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              helperText={
                <Box component={"span"} color=" #ff4d4d" fontSize="0.65rem">
                  * Vui lòng chọn ngày giờ chính xác
                </Box>
              }
              {...register("ngayChieuGioChieu")}
            />
          </Grid>
          <Grid item xs={10} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="cinema">Chọn hệ thống rạp</InputLabel>
              <StyledSelect
                labelId="cinema"
                label="Chọn hệ thống rạp"
                value={valueInput.maHeThongRap}
                name="maHeThongRap"
                onChange={handleChangeSelect}
              >
                {cinemaList?.map((item) => (
                  <MenuItem key={item.maHeThongRap} value={item.maHeThongRap}>
                    <StyledImg src={item.logo} alt={item.tenHeThongRap} />{" "}
                    {item.tenHeThongRap.toUpperCase()}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="theaterCinema">Chọn cụm rạp</InputLabel>
              <StyledSelect
                MenuProps={{
                  sx: {
                    maxHeight: "16rem",
                    maxWidth: 0,
                  },
                }}
                labelId="theaterCinema"
                label="Chọn cụm rạp"
                value={valueInput.maCumRap}
                name="maCumRap"
                onChange={(e) => {
                  handleChangeSelect(e);
                  setValue("maRap", "");
                }}
              >
                {valueInput.maHeThongRap ? (
                  cinemaInfo.map((item) => (
                    <MenuItem key={item.maCumRap} value={item.maCumRap}>
                      {item.tenCumRap}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem sx={{ fontWeight: "bold" }}>
                    Chọn hệ thống rạp trước
                  </MenuItem>
                )}
              </StyledSelect>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="theater">Chọn rạp</InputLabel>
              <StyledSelect
                labelId="theater"
                label="Chọn rạp"
                value={valueInput.maRap}
                {...register("maRap", {
                  onChange: handleChangeSelect,
                })}
              >
                {valueInput.maCumRap ? (
                  theaterList?.map((item) => (
                    <MenuItem key={item.maRap} value={item.maRap}>
                      {item.tenRap}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem sx={{ fontWeight: "700" }}>
                    Chọn cụm rạp trước
                  </MenuItem>
                )}
              </StyledSelect>
            </FormControl>
            {errors.maRap && <SpanError>{errors.maRap.message}</SpanError>}
          </Grid>
        </Grid>

        <Box width={"100%"} textAlign="center" mt={3}>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "12rem", height: "3rem", overflow: "hidden" }}
          >
            {isMovieLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Thêm lịch chiếu"
            )}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddShowTimes;
