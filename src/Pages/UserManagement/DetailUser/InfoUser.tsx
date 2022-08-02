import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
} from "@mui/material";
import { AppDispatch, RootState } from "configStore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterValues } from "Interfaces/User";
import { schemaRegister } from "./schemaRegister";
import { yupResolver } from "@hookform/resolvers/yup";
import { putUpdateUser } from "Slices/userSlice";
import Swal from "sweetalert2";
import { makeStyles } from "@mui/styles";
import SweetAlertConfirm from "Components/SweetAlert/SweetAlertConfirm";
type Props = {};

const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "0.5rem",
    padding: "1rem 2rem",
  },
  avatar: {
    margin: "0.5rem",
    backgroundColor: "#e71a0f",
  },
  form: {
    width: "100%",
    marginTop: "0.5rem",
  },
  submit: {
    margin: "1rem 0",
    backgroundColor: "#e71a0f",
    "&:hover": {
      backgroundColor: " #c0150c",
    },
  },
  navLink: {
    textDecoration: "underline",
    fontWeight: "600",
    fontSize: "0.875rem",
    color: "#212121",
    textDecorationColor: "rgba(33, 33, 33, 0.4)",
  },
  warning: {
    color: "#e71a0f",
    margin: "-0.2rem 0.3rem 0",
    fontSize: "0.75rem",
  },
}));

const InfoUser = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.userSlice);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [currentValue, setCurrentValue] = useState(() =>
    user ? user.maLoaiNguoiDung : "KhachHang"
  );
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    defaultValues: {
      taiKhoan: `${user?.taiKhoan}`,
      matKhau: `${user?.matKhau}`,
      email: `${user?.email}`,
      hoTen: `${user?.hoTen}`,
      soDt: `${user?.soDT}`,
      maLoaiNguoiDung: `${user?.maLoaiNguoiDung}`,
      passwordConfirm: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schemaRegister),
  });

  const onSubmit = (values: RegisterValues) => {
    delete values["passwordConfirm"];

    Swal.fire({
      title: "Bạn muốn thay đổi thông tin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(putUpdateUser(values)).then((res: any) => {
          if (res.error?.message) {
            Swal.fire(res.error?.message, "", "info");
          } else setOpenSuccess(true);
          setOpenUpdate(false);
          setReadOnly(true);
        });
      }
    });
  };
  const onError = () => {};

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit, onError)}>
        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          id="account"
          label="Tài khoản"
          autoComplete="account"
          disabled
          {...register("taiKhoan")}
        />

        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          id="fullName"
          label="Họ tên"
          color={errors.hoTen && "warning"}
          {...register("hoTen")}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        {errors.hoTen && (
          <Typography className={classes.warning}>
            {errors.hoTen.message}
          </Typography>
        )}

        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          id="email"
          label="Email"
          type="email"
          color={errors.email && "warning"}
          {...register("email")}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        {errors.email && (
          <Typography className={classes.warning}>
            {errors.email.message}
          </Typography>
        )}

        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          id="phone"
          label="Số điện thoại"
          color={errors.soDt && "warning"}
          {...register("soDt")}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        {errors.soDt && (
          <Typography className={classes.warning}>
            {errors.soDt.message}
          </Typography>
        )}

        <TextField
          id="outlined-select-currency"
          margin="dense"
          select
          label="Select"
          value={currentValue}
          {...register("maLoaiNguoiDung", {
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
              setCurrentValue(event.target.value);
            },
          })}
          InputProps={{
            readOnly: readOnly,
          }}
        >
          <MenuItem key="KhachHang" value="KhachHang">
            Khách hàng
          </MenuItem>
          <MenuItem key="QuanTri" value="QuanTri">
            Quản trị
          </MenuItem>
        </TextField>

        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          label="Mật khẩu"
          type="password"
          id="password"
          color={errors.matKhau && "warning"}
          {...register("matKhau")}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        {errors.matKhau && (
          <Typography className={classes.warning}>
            {errors.matKhau.message}
          </Typography>
        )}

        {openUpdate ? (
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Nhập lại mật khẩu"
            type="password"
            id="passwordConfirm"
            color={errors.matKhau && "warning"}
            {...register("passwordConfirm")}
          />
        ) : (
          <></>
        )}
        {openUpdate && errors.passwordConfirm && (
          <Typography className={classes.warning}>
            {errors.passwordConfirm.message}
          </Typography>
        )}

        {openUpdate ? (
          <Stack mt={2} direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ mr: 2 }}
            >
              Lưu
            </Button>
            <Box
              sx={{
                bgcolor: "primary.main",
                p: 2,
                borderRadius: "4px",
                cursor: "pointer",
                color: "primary.contrastText",
              }}
              onClick={() => {
                setOpenUpdate(false);
                setReadOnly(true);
              }}
            >
              Hủy
            </Box>
          </Stack>
        ) : (
          <Stack mt={2} direction="row" justifyContent="flex-end">
            <Box
              bgcolor="info"
              sx={{
                bgcolor: "info.main",
                p: 2,
                borderRadius: "8px",
                cursor: "pointer",
                color: "primary.contrastText",
              }}
              onClick={() => {
                setOpenUpdate(true);
                setReadOnly(false);
              }}
            >
              Thay đổi thông tin
            </Box>
          </Stack>
        )}
      </Box>

      <SweetAlertConfirm
        show={openSuccess}
        title="Thay đổi thông tin thành công!"
        callbackConfirm={() => {
          setOpenSuccess(false);
        }}
        showCancelButton={false}
        icon="success"
      />
    </Box>
  );
};

export default InfoUser;
