import { Box, Stack, Typography } from "@mui/material";
import { RootState } from "configStore";
import { useSelector } from "react-redux";

type Props = {};

const AvatarUser = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.userSlice);

  return (
    <Stack p={5} direction="column" alignItems="center">
      <Box sx={{ borderRadius: "50%", overflow: "hidden" }}>
        <img
          src="https://i.pravatar.cc"
          alt="https://i.pravatar.cc"
          width="100%"
        />
      </Box>
      <Typography mt={3} variant="h5">
        {user?.hoTen}
      </Typography>
    </Stack>
  );
};

export default AvatarUser;
