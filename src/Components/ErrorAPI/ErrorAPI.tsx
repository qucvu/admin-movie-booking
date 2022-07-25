import { Container, Stack, Typography } from "@mui/material";
import error from "Assets/img/error.gif";

const ErrorAPI = () => {
  return (
    <Container sx={{ py: 3 }}>
      <Stack alignItems="center" justifyContent="center">
        <img src={error} alt={error} height={250} width={250} />
        <Typography variant="h6" color="error">
          Oops, something went wrong!!!
        </Typography>
      </Stack>
    </Container>
  );
};

export default ErrorAPI;
