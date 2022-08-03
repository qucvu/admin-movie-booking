import { Container, Grid, Typography } from "@mui/material";
import LoadingLazy from "Components/LoadingLazy/LoadingLazy";
import { AppDispatch, RootState } from "configStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserInfo } from "Slices/userSlice";
import AvatarUser from "./AvatarUser";
import InfoBooking from "./InfoBooking";
import InfoUser from "./InfoUser";

type Props = {};

const DetailUser = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isUserLoading } = useSelector((state: RootState) => state.userSlice);

  const { userId } = useParams();

  useEffect(() => {
    if (userId) dispatch(getUserInfo(userId));

    return () => {};
  }, [dispatch, userId]);

  if (isUserLoading) {
    return <LoadingLazy />;
  }

  return (
    <Container sx={{ bgcolor: "paper.main" }}>
      <Typography
        py={3}
        variant="h4"
        align="center"
        sx={{ textTransform: "uppercase" }}
      >
        Thông tin tài khoản
      </Typography>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <AvatarUser />
        </Grid>
        <Grid item xs={12} sm={8}>
          <InfoUser />
        </Grid>
        <Grid item xs={12} mt={3}>
          <InfoBooking />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailUser;
