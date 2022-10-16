import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Layers from "@mui/icons-material/Layers";
import BarChart from "@mui/icons-material/BarChart";
import Person from "@mui/icons-material/Person";
import * as loginActions from "../../../actions/login.action";
import { NavLink, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type MenuProp = {
  open: boolean;
  onDrawerClose: () => void;
};

export default function Menu({ open, onDrawerClose }: MenuProp) {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleDrawerClose = () => {
    // setOpen(false);
    onDrawerClose();
  };

  const MyNavLink = React.forwardRef<any, any>((props, ref) => (
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

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Stack direction="row" alignItems="center">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Stack>
      </DrawerHeader>
      <Divider />
      <List>
        {/* Stock */}
        <ListItem
          button
          to="/stock"
          component={MyNavLink}
          activeClassName="Mui-selected"
          exact
        >
          <ListItemIcon>
            <Layers />
          </ListItemIcon>
          <ListItemText primary="Stock" />
        </ListItem>

        {/* Report */}
        <ListItem
          button
          to="/report"
          component={MyNavLink}
          activeClassName="Mui-selected"
          exact
        >
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>

        {/*About us */}
        <ListItem
          button
          to="/aboutus"
          component={MyNavLink}
          activeClassName="Mui-selected"
          exact
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="AboutUs" />
        </ListItem>
      </List>
      <Divider />

      <ListItem button>
        <ListItemIcon
          onClick={() => {
            dispatch(loginActions.logout(navigate));
          }}
        >
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="LogOut" />
      </ListItem>
    </Drawer>
  );
}
