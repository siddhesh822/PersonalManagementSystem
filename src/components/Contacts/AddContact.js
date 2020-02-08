import React, { Component } from "react";
import { Grid, Button, InputAdornment, Tooltip } from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

const theme = createMuiTheme();
const styles = {
  hoverEffect: {
    [theme.breakpoints.up("sm")]: {
      "&:hover": {
        backgroundColor: "#e6f3ff"
      }
    }
  },
  expandless: {
    marginTop: 15
  }
};

class AddContact extends Component {
  state = {
    email: [],
    phoneno: [],
    emailvalue: "",
    phonenovalue: "",
    description: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const contact = {
      email: [],
      phoneno: [],
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      description: this.description.value
    };

    if (this.phoneno.value !== "") {
      contact.phoneno = [...this.state.phoneno, this.phoneno.value];
    } else {
      contact.phoneno = [...this.state.phoneno];
    }
    if (this.email.value !== "") {
      contact.email = [...this.state.email, this.email.value];
    } else {
      contact.email = [...this.state.email];
    }
    if (contact.email.length === 0) {
      contact.email = [""];
    }
    if (contact.phoneno.length === 0) {
      contact.phoneno = [""];
    }

    this.props.addContact(contact);
  };

  handleAddMoreEmail = () => {
    if (this.email.value !== "") {
      let email = [...this.state.email];
      email.push(this.email.value);

      this.setState({
        email: email
      });
      this.email.value = "";
    }
  };

  handleAddMorePhone = () => {
    if (this.phoneno.value !== "") {
      let phoneno = [...this.state.phoneno];
      phoneno.push(this.phoneno.value);
      this.setState({
        phoneno: phoneno
      });
      this.phoneno.value = "";
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="firstName"
              placeholder="First Name"
              inputRef={el => (this.firstname = el)}
              name="firstname"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="lastName"
              inputRef={el => (this.lastname = el)}
              placeholder="Last Name"
              name="lastname"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Email"
              id="email"
              name="email"
              inputRef={el => (this.email = el)}
              fullWidth
              type="email"
              variant="outlined"
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Add another Email">
                      <IconButton
                        onClick={this.handleAddMoreEmail}
                        className={classes.hoverEffect}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Phone no"
              id="phoneno"
              inputRef={el => (this.phoneno = el)}
              variant="outlined"
              name="phoneno"
              autoComplete="off"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Add another PhoneNo">
                      <IconButton
                        onClick={this.handleAddMorePhone}
                        className={classes.hoverEffect}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              multiline={true}
              rowsMax={5}
              id="description"
              autoComplete="off"
              inputRef={el => (this.description = el)}
              placeholder="Description"
              name="description"
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              size="medium"
              color="primary"
              variant="outlined"
              type="submit"
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        <IconButton
          aria-label="less"
          className={classes.margin}
          onClick={this.props.handleExpandLess}
        >
          <ExpandLessIcon />
        </IconButton>
      </form>
    );
  }
}

export default withStyles(styles)(AddContact);
