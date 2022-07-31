import styled from "@emotion/styled";
import { Container } from "@mui/material";
import React, { useState } from "react";

type Props = {};
const Title = styled.h1`
  text-align: center;
`;

const AddShowTimes = (props: Props) => {
  const [movieId, setMovieId] = useState("");
  const [theaterCode, setTheaterCode] = useState("");

  return (
    <Container>
      <Title>Thêm lịch chiếu</Title>
    </Container>
  );
};

export default AddShowTimes;
