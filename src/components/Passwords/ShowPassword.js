import React, { Component } from "react";
import {
  Typography,
  createMuiTheme,
  IconButton,
  Box,
  MenuItem,
  Button
} from "@material-ui/core";

import { withStyles, Grid, InputAdornment } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import PasswordModal from "./PasswordModal";

const theme = createMuiTheme();

const styles = {
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    width: 600,
    height: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
    overflow: "scroll"
  },
  inline: {
    display: "inline"
  },
  fab: {
    marginLeft: 5,
    marginRight: 10
  },
  flex: {
    display: "flex",
    alignItems: "center"
  }
};

class ShowPassword extends Component {
  state = {
    renderText: false,
    contacts: this.props.contacts,
    save: false,
    index: null,
    modalopen: false,
    disabled: true
  };

  handleOpen = (index, passwords) => {
    this.setState({
      index: index,
      modalopen: true,
      renderText: true
    });
  };
  handleClose = () => {
    this.setState({
      modalopen: false
    });
  };
  handleEdit = () => {
    this.setState({ disabled: false, save: true });
  };

  render() {
    const { classes } = this.props;
    const { passwords } = this.props;

    const passwords2 = passwords.map((password, index) => {
      return (
        <MenuItem
          alignItems="flex-start"
          key={index}
          onClick={() => this.handleOpen(index)}
        >
          <ListItemAvatar>
            <Avatar
              alt={password.account.charAt(0)}
              src="https://cdn1.iconfinder.com/data/icons/ui-5/502/key-512.png"
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box component="div" textOverflow="ellipsis">
                <Typography noWrap>{password.account}</Typography>
              </Box>
            }
            secondary={
              <Box component="div" textOverflow="ellipsis">
                <Typography noWrap color="textPrimary">
                  {password.description}
                </Typography>
              </Box>
            }
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => this.props.deletePassword(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </MenuItem>
      );
    });

    //Modal Component
    return (
      <List className={classes.root}>
        {passwords2}
        {this.state.modalopen ? (
          <PasswordModal
            updatePassword={this.props.updatePassword}
            renderText={this.state.renderText}
            password={passwords[this.state.index]}
            index={this.state.index}
            modalopen={this.state.modalopen}
            handleClose={this.handleClose}
          />
        ) : (
          ""
        )}
      </List>
    );
  }
}

export default withStyles(styles)(ShowPassword);
