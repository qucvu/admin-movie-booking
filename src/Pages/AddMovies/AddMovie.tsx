import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
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
} from "@mui/material";
import dayjs from "dayjs";
import { MovieAdd } from "Interfaces/Movie";

import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import schemaAddMovie from "./schemaMovie";
import { SpanError } from "../AddUser/AddUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { addMovie } from "Slices/MovieSlice";
import SweetAlertSuccess from "Components/SweetAlert/SweetAlertSuccess";
import SweetAlertError from "Components/SweetAlert/SweetAlertError";

type Props = {};
const Title = styled.h1`
  text-align: center;
`;

const AddMovie = (props: Props) => {
  const [group, setGroup] = useState("");
  const handleChangeGroup = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  };
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setmodalError] = useState(false);
  const { errorRegister, isMovieLoading } = useSelector(
    (state: RootState) => state.movieSlice
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieAdd>({
    mode: "onTouched",
    resolver: yupResolver(schemaAddMovie),
  });
  const dispatch = useDispatch<AppDispatch>();
  const onValid = async (values: MovieAdd) => {
    const payload = {
      ...values,
      hinhAnh: values.hinhAnh[0],
      ngayKhoiChieu: dayjs(values.ngayKhoiChieu).format("DD/MM/YYYY"),
    };

    try {
      await dispatch(addMovie(payload)).unwrap();
      setModalSuccess(true);
      reset();
      setGroup("");
    } catch (error) {
      setmodalError(true);
      console.log(error);
    }
  };

  const onError = (error: FieldErrors<MovieAdd>) => {
    console.log(error);
  };

  return (
    <Container>
      <SweetAlertError
        show={modalError}
        title={errorRegister}
        callbackClose={() => setmodalError(false)}
      />
      <SweetAlertSuccess
        show={modalSuccess}
        title="Thêm phim thành công"
        navigateDestination="/add-movie"
      />
      <Title>Thêm phim</Title>
      <form onSubmit={handleSubmit(onValid, onError)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Tên Phim"
              id="movieName"
              autoComplete="movieName"
              {...register("tenPhim")}
            />
            {errors.tenPhim && <SpanError>{errors.tenPhim.message}</SpanError>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="trailer"
              label="Trailer"
              autoComplete="trailer"
              {...register("trailer")}
            />
            {errors.trailer && <SpanError>{errors.trailer.message}</SpanError>}
            <FormControl fullWidth margin="normal">
              <InputLabel id="groupId">Mã nhóm</InputLabel>
              <Select
                labelId="groupId"
                id="groupId"
                value={group}
                label="Mã nhóm"
                {...register("maNhom", { onChange: handleChangeGroup })}
              >
                <MenuItem value="GP00">GP00</MenuItem>
                <MenuItem value="GP01">GP01</MenuItem>
                <MenuItem value="GP02">GP02</MenuItem>
              </Select>
            </FormControl>
            {errors.maNhom && <SpanError>{errors.maNhom.message}</SpanError>}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Ngày khởi chiếu"
              margin="normal"
              variant="outlined"
              autoComplete="timeShow"
              fullWidth
              id="timeShow"
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              {...register("ngayKhoiChieu")}
            />
            {errors.ngayKhoiChieu && (
              <SpanError>{errors.ngayKhoiChieu.message}</SpanError>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="rate"
              label="Đánh giá"
              autoComplete="rate"
              {...register("danhGia")}
            />
            {errors.danhGia && <SpanError>{errors.danhGia.message}</SpanError>}
            <TextField
              type="file"
              fullWidth
              id="image"
              margin="normal"
              label="Hình ảnh"
              required
              InputLabelProps={{ shrink: true }}
              {...register("hinhAnh")}
            />
            {errors.hinhAnh && <SpanError>123123</SpanError>}
          </Grid>
        </Grid>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="desc"
          label="Mô tả"
          autoComplete="desc"
          multiline
          minRows={3}
          {...register("moTa")}
        />
        {errors.moTa && <SpanError>{errors.moTa.message}</SpanError>}

        <Box width={"100%"} textAlign="center" mt={3}>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "10rem", height: "3rem", overflow: "hidden" }}
          >
            {isMovieLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Thêm phim"
            )}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddMovie;
