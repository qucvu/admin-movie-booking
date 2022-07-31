import { forwardRef, Fragment, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  createStyles,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { v4 } from "uuid";
import MovieIcon from "@mui/icons-material/Movie";
import TheatersIcon from "@mui/icons-material/Theaters";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Logo from "Components/Logo/Logo";
import SweetAlertConfirm from "Components/SweetAlert/SweetAlertConfirm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "configStore";
import { logoutUser } from "Slices/auth";
import Header from "Components/Header/Header";
type Props = {};
const drawerWidth = 260;
const DrawerTitles = [
  {
    id: v4(),
    text: "Quản lý phim",
    icon: <TheatersIcon />,
    path: "/",
  },
  {
    id: v4(),
    text: "Quản lý người dùng",
    icon: <GroupIcon />,
    path: "/user-management",
  },
  {
    id: v4(),
    text: "Thêm lịch chiếu",
    icon: <MoreTimeIcon />,
    path: "/add-showtimes",
  },
  {
    id: v4(),
    text: "Thêm người dùng",
    icon: <PersonAddIcon />,
    path: "/add-user",
  },
  {
    id: v4(),
    text: "Thêm phim",
    icon: <MovieIcon />,
    path: "/add-movie",
  },
];

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    activeLink: {
      color: "#10b981 !important",
      backgroundColor: "rgba(255, 255, 255, 0.08)",

      "& .MuiSvgIcon-root": {
        stroke: "#10b981",
        fill: "#10b981",
      },
    },
  })
);
const HomeTemplate = (props: any) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const MyNavLink = forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={props.to}
      className={({ isActive }) =>
        `${props.className} ${isActive ? props.activeClassName : ""}`
      }
    >
      {props.children}
    </NavLink>
  ));

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleConfirmLogout = () => {
    dispatch(logoutUser());
  };
  console.log("re-render");
  return (
    <Fragment>
      <SweetAlertConfirm
        callbackConfirm={handleConfirmLogout}
        show={showModal}
        title="Bạn có chắc muốn đăng xuất?"
        callbackClose={() => setShowModal(false)}
      />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ backgroundColor: "#111827" }}
        >
          <Toolbar sx={{ padding: "1.2rem 0" }}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                color: "#fff",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Header />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#111827",
            },
          }}
        >
          <DrawerHeader>
            <Box
              sx={{
                margin: "1rem auto 0.5rem",
                opacity: !open ? 0 : 1,
              }}
            >
              <Logo />
            </Box>

            <IconButton
              onClick={handleDrawerClose}
              sx={{ color: "#fff", opacity: !open ? 0 : 1 }}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <List>
            {DrawerTitles.map((item, index) => (
              <ListItem
                key={item.id}
                disablePadding
                sx={{
                  display: "block",
                  color: "#d1d5db",
                  fontWeight: "bold",
                  margin: "0.5rem 0",
                }}
                component={MyNavLink}
                to={item.path}
                activeClassName={classes.activeLink}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#d1d5db",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem
              disablePadding
              sx={{
                display: "block",
                color: "#d1d5db",
                fontWeight: "bold",
                margin: "0.5rem 0",
              }}
              component={MyNavLink}
              to={"/"}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => setShowModal(true)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#d1d5db",
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Đăng xuất"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </Fragment>
  );
};

export default HomeTemplate;
