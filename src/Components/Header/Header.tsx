import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { RootState } from "configStore";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
type Props = {};

const WrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Header = (props: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <WrapperHeader>
      <Box
        component="img"
        sx={{
          height: 40,
          width: 40,
        }}
        alt="The house from the offer."
        src="./logo.svg"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: " 0.5rem",
        }}
      >
        <IconButton sx={{ p: 0 }}>
          <Avatar src="https://i.pravatar.cc" alt="https://i.pravatar.cc" />
        </IconButton>
        <Typography
          fontSize="0.9rem"
          color="#ccc"
          letterSpacing="0.2px"
          fontWeight="500"
        >
          {user?.email}
        </Typography>
      </Box>
    </WrapperHeader>
  );
};

export default Header;
