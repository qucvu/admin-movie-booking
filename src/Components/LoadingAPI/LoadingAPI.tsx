import { Container, Stack } from "@mui/material";
import loading from "Assets/img/loading.gif";

const LoadingAPI = () => {
  return (
    <Container sx={{ py: 3 }}>
      <Stack alignItems="center" justifyContent="center">
        <img src={loading} alt={loading} height={250} width={250} />
      </Stack>
    </Container>
  );
};

export default LoadingAPI;
