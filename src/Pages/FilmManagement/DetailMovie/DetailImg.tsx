import { Box, Button, IconButton, Modal, Stack } from "@mui/material";
import { RootState } from "configStore";
import { useSelector } from "react-redux";
import TheatersIcon from "@mui/icons-material/Theaters";
import { useState } from "react";

type Props = {};

const DetailImg = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { movie, srcPreview } = useSelector(
    (state: RootState) => state.movieSlice
  );

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "400px", sm: "600px", md: "800px" },
    height: { xs: "250px", sm: "350px", md: "400px" },
  };
  return (
    <Stack direction="column" alignItems="center" sx={{ mt: 2 }}>
      {srcPreview ? (
        <img src={srcPreview} alt={srcPreview} width="100%" />
      ) : (
        <img src={movie?.hinhAnh} alt={movie?.hinhAnh} width="100%" />
      )}
      <Button
        variant="contained"
        startIcon={<TheatersIcon />}
        color="warning"
        sx={{ mt: 3 }}
        onClick={() => {
          handleOpen();
        }}
      >
        Trailer
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <iframe
            width="100%"
            height="100%"
            src={movie?.trailer}
            title="YouTube video player"
            style={{ border: "none", display: "block" }}
          ></iframe>
        </Box>
      </Modal>
    </Stack>
  );
};

export default DetailImg;
