import React, { Component } from "react";
import clsx from "clsx";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  createMuiTheme
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import NotesIcon from "@material-ui/icons/Notes";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import DoneIcon from "@material-ui/icons/Done";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import EventIcon from "@material-ui/icons/Event";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import firebase from "firebase";

const drawerWidth = 240;
const theme = createMuiTheme();

const styles = {
  title: {
    flexGrow: 1
  },
  root: {
    display: "flex"
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    },
    [theme.breakpoints.down("sm")]: {
      width: 0
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    maxWidth: "100%",
    flexGrow: 1,
    padding: theme.spacing(2)
  }
};

class MiniDrawer extends Component {
  state = {
    open: false,
    anchorEl: null,
    openm: false
  };
  handleLogout = () => {
    firebase.auth().signOut();
    this.props.history.push("/signin");
    this.setState({
      openm: false
    });
  };
  handleClose = () => {
    this.setState({
      openm: false
    });
    this.props.history.push("/profile");
  };
  handleMenu = event => {
    this.setState({
      anchorEl: event.currentTarget,
      openm: true
    });
  };
  handleDrawerOpen = () => {
    this.setState({
      open: true
    });
  };

  handleDrawerClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <ClickAwayListener onClickAway={this.handleDrawerClose}>
          <AppBar
            style={{ background: "white" }}
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: this.state.open
            })}
          >
            <Toolbar>
              <IconButton
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: this.state.open
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                color="textSecondary"
                variant="h5"
                className={classes.title}
                noWrap
              >
                {this.props.title}
              </Typography>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={this.state.openm}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>My Account</MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </ClickAwayListener>

        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon style={{ color: "darkturquoise" }} />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/todo">
              <ListItemIcon>
                <DoneIcon style={{ color: "dodgerblue" }} />
              </ListItemIcon>
              <ListItemText>To-do</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/notes">
              <ListItemIcon>
                <NotesIcon style={{ color: "SlateBlue" }} />
              </ListItemIcon>
              <ListItemText>Notes</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/contacts">
              <ListItemIcon>
                <PermContactCalendarIcon style={{ color: "dodgerblue" }} />
              </ListItemIcon>
              <ListItemText>Contacts</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/passwords">
              <ListItemIcon>
                <VpnKeyIcon style={{ color: "orange" }} />
              </ListItemIcon>
              <ListItemText>Passwords</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/achievements">
              <ListItemIcon>
                <EmojiEventsIcon style={{ color: "orange" }} />
              </ListItemIcon>
              <ListItemText>Achievements</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/schedules">
              <ListItemIcon>
                <EventIcon style={{ color: "MediumSeaGreen" }} />
              </ListItemIcon>
              <ListItemText>Schedules</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/images">
              <ListItemIcon>
                <CropOriginalIcon style={{ color: "rgb(255, 99, 71)" }} />
              </ListItemIcon>
              <ListItemText>Images</ListItemText>
            </ListItem>
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}
export default withRouter(withStyles(styles)(MiniDrawer));
