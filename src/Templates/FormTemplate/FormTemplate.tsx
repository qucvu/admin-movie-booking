import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Logo from "Components/Logo/Logo";
import Login from "Pages/Login/Login";
import { relative } from "path";
import { Link, Outlet } from "react-router-dom";

const Template = styled.div`
  background-image: url("https://movie-ticket-eight.vercel.app/static/media/backapp.b46ef3a1.jpg");
  /* padding: 2rem; */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkLogo = styled(Link)`
  position: absolute;
  top: 1rem;
  left: 1.3rem;
`;
const FormTemplate = () => {
  return (
    <Template>
      <LinkLogo to="/">
        <Logo />
      </LinkLogo>
      <Outlet />
    </Template>
  );
};

export default FormTemplate;
