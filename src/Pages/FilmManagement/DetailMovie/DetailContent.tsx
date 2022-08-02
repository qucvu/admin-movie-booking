import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { AppDispatch, RootState } from "configStore";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getSrcPreview, updateMovie } from "Slices/movieSlice";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import schemaAddMovie from "Pages/AddMovies/schemaMovie";
import { yupResolver } from "@hookform/resolvers/yup";
import { SpanError } from "Pages/AddUser/AddUser";
import SweetAlertConfirm from "Components/SweetAlert/SweetAlertConfirm";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type Props = {};

const DetailContent = (props: Props) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [srcPreview, setSrcPreview] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { movie } = useSelector((state: RootState) => state.movieSlice);

  useEffect(() => {
    return () => {
      srcPreview && URL.revokeObjectURL(srcPreview);
    };
  }, [srcPreview]);

  useEffect(() => {
    const dangChieu = document.getElementById(
      "dangChieu"
    ) as HTMLElement | null;
    dangChieu?.focus();
    const sapChieu = document.getElementById("sapChieu") as HTMLElement | null;
    sapChieu?.focus();
    const hot = document.getElementById("hot") as HTMLElement | null;
    hot?.focus();
    return () => {};
  }, [isReadOnly]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maPhim: `${movie?.maPhim}`,
      tenPhim: `${movie?.tenPhim}`,
      biDanh: `${movie?.biDanh}`,
      hinhAnh: `${movie?.hinhAnh}`,
      trailer: `${movie?.trailer}`,
      moTa: `${movie?.moTa}`,
      ngayKhoiChieu: `${movie?.ngayKhoiChieu}`,
      danhGia: movie?.danhGia,
      maNhom: `${movie?.maNhom}`,
      dangChieu: movie?.dangChieu as boolean,
      sapChieu: movie?.sapChieu as boolean,
      hot: movie?.hot as boolean,
    },
    mode: "onTouched",
    resolver: yupResolver(schemaAddMovie),
  });
  const onSubmit = (values: any) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn chỉnh sửa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        let payload;
        srcPreview
          ? (payload = {
              ...values,
              hinhAnh: values.hinhAnh[0],
              ngayKhoiChieu: dayjs(values.ngayKhoiChieu).format("DD/MM/YYYY"),
            })
          : (payload = {
              ...values,
            });
        dispatch(updateMovie(payload)).then((res: any) => {
          if (res.error?.message) {
            Swal.fire(res.error?.message, "", "info");
          } else setOpenSuccess(true);
        });
        setIsReadOnly(true);
      } else if (result.isDenied) {
        setOpenSuccess(false);
      }
    });
  };
  const onError = () => {};

  const handlePreviewImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      dispatch(getSrcPreview(URL.createObjectURL(file)));
      setSrcPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box>
      <SweetAlertConfirm
        show={openSuccess}
        title="Chỉnh sửa thành công!"
        callbackConfirm={() => {
          setOpenSuccess(false);
        }}
        showCancelButton={false}
        icon="success"
      />
      <Box
        component="form"
        sx={{ "&>*": { m: 1 } }}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Grid container sx={{ "&>*": { p: 1 } }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="maPhim"
              label="Mã phim"
              variant="outlined"
              {...register("maPhim")}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="tenPhim"
              label="Tên phim"
              variant="outlined"
              required
              {...register("tenPhim")}
              InputProps={{
                readOnly: isReadOnly,
              }}
            />
            {errors.tenPhim && <SpanError>{errors.tenPhim.message}</SpanError>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="biDanh"
              label="Bí danh"
              variant="outlined"
              required
              {...register("biDanh")}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="ngayKhoiChieu"
              label="Ngày khởi chiếu"
              variant="outlined"
              required
              {...register("ngayKhoiChieu")}
              InputProps={{
                readOnly: isReadOnly,
              }}
              // type="date"
            />
            {errors.ngayKhoiChieu && (
              <SpanError>{errors.ngayKhoiChieu.message}</SpanError>
            )}
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider> */}
          </Grid>
          <Grid item xs={12} sx={{ position: "relative" }}>
            <TextField
              fullWidth
              id="hinhAnh"
              label="Hình ảnh"
              variant="outlined"
              required
              defaultValue={movie?.hinhAnh}
              sx={{ "&>*": { pr: 4 } }}
              InputProps={{
                readOnly: true,
              }}
            />
            <IconButton
              color="primary"
              component="label"
              disabled={isReadOnly}
              sx={{ position: "absolute", right: "2%", top: "25%" }}
            >
              <input
                id="hinhAnh"
                hidden
                type="file"
                disabled={isReadOnly}
                {...register("hinhAnh", {
                  onChange: (event) => {
                    handlePreviewImage(event);
                  },
                })}
              />
              <PhotoCamera />
            </IconButton>
            {errors.hinhAnh && <SpanError>{errors.hinhAnh.message}</SpanError>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="trailer"
              label="Trailer"
              variant="outlined"
              required
              {...register("trailer")}
              InputProps={{
                readOnly: isReadOnly,
              }}
            />
            {errors.trailer && <SpanError>{errors.trailer.message}</SpanError>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="danhGia"
              label="Đánh giá"
              variant="outlined"
              required
              {...register("danhGia")}
              InputProps={{
                readOnly: isReadOnly,
              }}
            />
            {errors.danhGia && <SpanError>{errors.danhGia.message}</SpanError>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="moTa"
              label="Mô tả"
              variant="outlined"
              multiline
              rows={4}
              {...register("moTa")}
              InputProps={{
                readOnly: isReadOnly,
              }}
            />
          </Grid>
        </Grid>

        <Stack justifyContent="flex-start" alignItems="start">
          <FormControlLabel
            control={
              <Checkbox
                id="dangChieu"
                defaultChecked={movie?.dangChieu}
                disabled={isReadOnly}
                {...register("dangChieu")}
              />
            }
            label="Đang chiếu: "
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="sapChieu"
                defaultChecked={movie?.sapChieu}
                // checked={movie?.sapChieu}
                disabled={isReadOnly}
                {...register("sapChieu")}
              />
            }
            label="Sắp chiếu: "
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="hot"
                defaultChecked={movie?.hot}
                disabled={isReadOnly}
                {...register("hot")}
              />
            }
            label="Hot: "
            labelPlacement="start"
          />
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          {isReadOnly ? (
            <Box
              sx={{
                bgcolor: "primary.main",
                p: 1,
                borderRadius: "4px",
                cursor: "pointer",
                color: "primary.contrastText",
                width: "max-content",
              }}
              onClick={() => setIsReadOnly(false)}
            >
              Chỉnh sửa
            </Box>
          ) : (
            <Stack direction="row">
              <Button type="submit" variant="contained" color="success">
                Lưu
              </Button>
              <Box
                sx={{
                  bgcolor: "#ccc",
                  p: 1,
                  borderRadius: "4px",
                  cursor: "pointer",
                  width: "max-content",
                  ml: 2,
                }}
                onClick={() => setIsReadOnly(true)}
              >
                HỦY
              </Box>
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default DetailContent;
