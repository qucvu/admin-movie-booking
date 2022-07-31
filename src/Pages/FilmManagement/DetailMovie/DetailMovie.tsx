import { Container, Grid, Paper, TextField, Typography } from "@mui/material";
import LoadingLazy from "Components/LoadingLazy/LoadingLazy";
import { AppDispatch, RootState } from "configStore";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieInfo } from "Slices/movieSlice";

import DetailContent from "./DetailContent";
import DetailImg from "./DetailImg";

type Props = {};

const DetailMovie = (props: Props) => {
  const { movieId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { movie, isMovieLoading } = useSelector(
    (state: RootState) => state.movieSlice
  );
  useLayoutEffect(() => {
    if (movieId) dispatch(getMovieInfo(movieId));
    return () => {};
  }, [dispatch, movieId]);

  if (isMovieLoading) {
    return <LoadingLazy />;
  }

  return (
    <Container>
      <Typography
        my={5}
        variant="h4"
        sx={{ textTransform: "uppercase", textAlign: "center" }}
      >
        Chi tiết phim {movie?.tenPhim}
      </Typography>
      <Grid container>
        <Grid item xs={6} md={2} sx={{ mx: { xs: "auto", md: "none" } }}>
          <DetailImg />
        </Grid>
        <Grid item xs={12} md={10}>
          <DetailContent />;
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailMovie;
