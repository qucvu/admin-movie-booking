import {
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  Box,
  Paper,
  InputBase,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { alpha } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "configStore";
import { deleteMovie, handleSearchMovie } from "Slices/movieSlice";
import Swal from "sweetalert2";
import SweetAlertSuccess from "Components/SweetAlert/SweetAlertSuccess";
import { ChangeEvent, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";

type Props = { numSelected: number; selected: string[] };

const EnhancedTableToolbar = ({ numSelected, selected }: Props) => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchText: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (values: any) => {
    dispatch(handleSearchMovie(values.searchText));
  };
  const onError = () => {};

  const handleDelete = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        selected.map((movieId) => dispatch(deleteMovie(movieId)));
        setOpenSuccess(true);
      }
    });
  };

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const handleSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      console.log(event.target.value);
      dispatch(handleSearchMovie(event.target.value));
    }, 300);
  };
  return (
    <Box>
      <SweetAlertSuccess
        show={openSuccess}
        title="Xóa thành công!"
        navigateDestination={"-1"}
      />

      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Đã chọn {numSelected}
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          ></Typography>
        )}
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Users"
            {...register("searchText", {
              onChange: (event: ChangeEvent<HTMLInputElement>) => {
                handleSearchText(event);
              },
            })}
          />
          <IconButton sx={{ p: "10px" }} type="submit">
            <SearchIcon />
          </IconButton>
        </Paper>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                handleDelete();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </Box>
  );
};

export default EnhancedTableToolbar;
