import React, { Component } from "react";
import {
  Typography,
  createMuiTheme,
  IconButton,
  Box,
  MenuItem,
  TextField,
  Divider
} from "@material-ui/core";

import { withStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ContactModal from "./ContactModal";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { getColor } from "../../helper";

const theme = createMuiTheme();

const styles = {
  root: {
    width: "100%"
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
  },
  color: {
    backgroundColor: getColor()
  }
};

class ShowContacts extends Component {
  state = {
    search: "",
    renderText: false,
    contacts: this.props.contacts,
    save: false,
    index: null,
    modalopen: false,
    disabled: true
  };
  updateSearch = e => {
    this.setState({
      search: e.target.value
    });
  };
  handleOpen = (index, contacts) => {
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
    const { contacts } = this.props;
    let filteredContacts = contacts.filter(contact => {
      return (
        contact.firstname.toLowerCase().indexOf(this.state.search) !== -1 ||
        contact.lastname.toLowerCase().indexOf(this.state.search) !== -1
      );
    });
    //Modal Component
    return (
      <div>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Contact"
          onChange={this.updateSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <List className={classes.root}>
          {filteredContacts.map((contact, index) => {
            return (
              <div>
                <MenuItem
                  alignItems="flex-start"
                  key={index}
                  onClick={() => this.handleOpen(contact.key, contacts)}
                >
                  <ListItemAvatar>
                    <Avatar className={classes.color}>
                      {contact.firstname[0]}
                      {contact.lastname ? contact.lastname[0] : ""}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box component="div" textOverflow="ellipsis">
                        <Typography noWrap>
                          {contact.firstname} {contact.lastname}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box component="div" textOverflow="ellipsis">
                        <Typography noWrap color="textPrimary">
                          {contact.description}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => this.props.deleteContact(contact.key)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </MenuItem>
              </div>
            );
          })}
          {this.state.modalopen ? (
            <ContactModal
              updateContact={this.props.updateContact}
              renderText={this.state.renderText}
              contact={contacts[this.state.index]}
              index={this.state.index}
              modalopen={this.state.modalopen}
              handleClose={this.handleClose}
            />
          ) : (
            console.log("off")
          )}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(ShowContacts);
