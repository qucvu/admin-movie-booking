import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoginValues } from "Interfaces/Login";
import { FieldErrors, useForm } from "react-hook-form";
import { schemaLogin } from "./schemaLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "Slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import SweetAlertSuccess from "Components/SweetAlert/SweetAlertSuccess";
import { makeStyles } from "@mui/styles";

// const BoxLogin = styled.div`
//   background-color: #fff;
//   padding: 2rem;
//   border-radius: 8px;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

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
export const handleMouseDownPassword = (
  event: React.MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
};

const Login = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const [modalOpen, setModalOpen] = useState(false);
  const { errorLogin, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schemaLogin),
  });
  const onSuccess = async (values: LoginValues) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (error: FieldErrors<LoginValues>) => {
    console.log(error);
  };

  return (
    <Container component="main" maxWidth="sm">
      <SweetAlertSuccess show={modalOpen} navigateDestination={"-1"} />;
      <div className={classes.paper}>
        <Avatar sx={{ margin: "0.5rem", backgroundColor: "#e71a0f" }}></Avatar>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Đăng nhập
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSuccess, onError)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="account"
            label="Tài khoản"
            autoComplete="account"
            autoFocus
            color={errors.taiKhoan && "warning"}
            {...register("taiKhoan")}
          />
          {errors.taiKhoan && (
            <Typography
              sx={{
                color: "#e71a0f",
                margin: "-0.2rem 0.3rem 0",
                fontSize: "0.75rem",
              }}
            >
              {errors.taiKhoan.message}
            </Typography>
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
            color={errors.matKhau && "warning"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("matKhau")}
          />
          {errors.matKhau && (
            <Typography
              sx={{
                color: "#e71a0f",
                margin: "-0.2rem 0.3rem 0",
                fontSize: "0.75rem",
              }}
            >
              {errors.matKhau.message}
            </Typography>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="error" />}
            label="Nhớ tài khoản"
          />
          {errorLogin && (
            <Alert severity="error" sx={{ fontWeight: "600" }}>
              {errorLogin}
            </Alert>
          )}
          <Button
            fullWidth
            variant="contained"
            sx={{
              margin: "1rem 0",
              backgroundColor: "#e71a0f",
              "&:hover": {
                backgroundColor: " #c0150c",
              },
            }}
            type="submit"
          >
            {isLoading ? <CircularProgress color="inherit" /> : "ĐĂNG NHẬP"}
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <NavLink to={"/form/register"} className={classes.navLink}>
                {"Bạn chưa có tài khoản? Đăng kí"}
              </NavLink>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
};

export default Login;
