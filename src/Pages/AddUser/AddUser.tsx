import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Container,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemaUser from "./schemaAddUser";
import { UserRegister } from "Interfaces/User";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { addUser } from "Slices/userSlice";
import SweetAlertSuccess from "Components/SweetAlert/SweetAlertSuccess";
import SweetAlertError from "Components/SweetAlert/SweetAlertError";
type Props = {};

const Title = styled.h1`
  text-align: center;
`;

export const SpanError = styled.p`
  color: #e71a0f;
  margin: -0.3rem 0.2rem 0;
  font-size: 0.75rem;
`;
export const handleMouseDownPassword = (
  event: React.MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
};

const AddUser = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [group, setGroup] = useState("");
  const [accountType, setAccountType] = useState("");
  const [sucessModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { errorRegister, isUserLoading } = useSelector(
    (state: RootState) => state.userSlice
  );
  const handleChangeGroup = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  };

  const handleChangeaccountType = (event: SelectChangeEvent) => {
    setAccountType(event.target.value as string);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserRegister>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
      maLoaiNguoiDung: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schemaUser),
  });

  const onSuccess = async (values: UserRegister) => {
    try {
      await dispatch(addUser(values)).unwrap();
      setSuccessModal(true);
      reset();
      setAccountType("");
      setGroup("");
    } catch (error) {
      setErrorModal(true);
    }
  };

  const onError = (error: FieldErrors<UserRegister>) => {
    console.log(error);
  };

  return (
    <Container maxWidth="lg">
      <SweetAlertError
        show={errorModal}
        title={errorRegister}
        callbackClose={() => {
          setErrorModal(false);
        }}
      />
      <SweetAlertSuccess
        show={sucessModal}
        navigateDestination={"/add-user"}
        title="Thêm thành công"
      />
      <Title>Thêm người dùng</Title>
      <form onSubmit={handleSubmit(onSuccess, onError)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="account"
              label="Tài khoản"
              autoComplete="account"
              autoFocus
              {...register("taiKhoan")}
            />
            {errors.taiKhoan && (
              <SpanError>{errors.taiKhoan.message}</SpanError>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("matKhau")}
            />
            {errors.matKhau && <SpanError>{errors.matKhau.message}</SpanError>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Họ tên"
              autoComplete="fullName"
              {...register("hoTen")}
            />
            {errors.hoTen && <SpanError>{errors.hoTen.message}</SpanError>}
            <FormControl fullWidth margin="normal">
              <InputLabel id="groupId">Mã nhóm</InputLabel>
              <Select
                labelId="groupId"
                id="groupId"
                value={group}
                label="Mã nhóm"
                {...register("maNhom", { onChange: handleChangeGroup })}
              >
                <MenuItem value="GP01">GP01</MenuItem>
                <MenuItem value="GP02">GP02</MenuItem>
                <MenuItem value="GP03">GP03</MenuItem>
                <MenuItem value="GP04">GP04</MenuItem>
                <MenuItem value="GP05">GP05</MenuItem>
              </Select>
            </FormControl>
            {errors.maNhom && <SpanError>{errors.maNhom.message}</SpanError>}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && <SpanError>{errors.email.message}</SpanError>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Số điện thoại"
              autoComplete="phone"
              {...register("soDt")}
            />
            {errors.soDt && <SpanError>{errors.soDt.message}</SpanError>}
            <FormControl fullWidth margin="normal">
              <InputLabel id="accountType">Loại tài khoản</InputLabel>
              <Select
                labelId="accountType"
                id="accountType"
                value={accountType}
                label="Loại tài khoản"
                {...register("maLoaiNguoiDung", {
                  onChange: handleChangeaccountType,
                })}
              >
                <MenuItem value="KhachHang">Khách hàng</MenuItem>
                <MenuItem value="QuanTri">Quản trị</MenuItem>
              </Select>
            </FormControl>
            {errors.maLoaiNguoiDung && (
              <SpanError>{errors.maLoaiNguoiDung.message}</SpanError>
            )}
          </Grid>
        </Grid>

        <Box width={"100%"} textAlign="center" mt={3}>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "12rem", height: "3rem", overflow: "hidden" }}
          >
            {isUserLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Thêm người dùng"
            )}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddUser;
