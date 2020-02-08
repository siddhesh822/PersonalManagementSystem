import React, { Component } from "react";
import { Grid, Button, Select, InputLabel } from "@material-ui/core";
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

class AddPasswords extends Component {
  state = {
    Account: "",
    Password: "",
    description: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const password = {
      account: this.account.value,
      password: this.password.value,
      description: this.description.value
    };

    this.props.addPassword(password);
  };
  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="Account"
              placeholder="Account"
              inputRef={el => (this.account = el)}
              name="Account"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Description"
              id="description"
              name="description"
              inputRef={el => (this.description = el)}
              fullWidth
              type="description"
              variant="outlined"
              autoComplete="off"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              placeholder="Password"
              id="password"
              name="password"
              inputRef={el => (this.password = el)}
              fullWidth
              type="password"
              variant="outlined"
              autoComplete="off"
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

export default withStyles(styles)(AddPasswords);
