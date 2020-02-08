import React, { Component } from "react";
import { Grid, Button, Box, Divider, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import firebase from "firebase";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createMuiTheme();

const styles = {
  divider: {
    marginTop: 12,
    marginBottom: 12
  },
  avatar: {
    width: theme.spacing(23),
    height: theme.spacing(23)
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
};

class SetProfile extends Component {
  state = {};
  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };
  handleSubmit = () => {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        masterPassword: this.state.masterPassword
      })
      .then(function() {
        // Update successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={3} className={classes.flex}>
            <Avatar
              alt="Profile"
              src="https://cdn1.iconfinder.com/data/icons/banking-and-finance-7-1/128/323-512.png"
              className={classes.avatar}
            />
            <p></p>
            <Button
              startIcon={<EditIcon />}
              variant="contained"
              className={classes.fgh}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.divider}>
            <Divider />
          </Grid>
          <form onSubmit={this.handleSubmit}>
            <Grid item xs={2} className={classes.flex}>
              <Typography>First Name :</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                onChange={this.handleChange}
                variant="outlined"
                label="FirstName"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <p></p>
            </Grid>

            <Grid item xs={2} className={classes.flex}>
              <Typography>Last Name :</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                onChange={this.handleChange}
                variant="outlined"
                label="LastName"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <p></p>
            </Grid>

            <Grid item xs={2} className={classes.flex}>
              <Typography>Master Password :</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                onChange={this.handleChange}
                variant="outlined"
                label="MasterPassword"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <p></p>
            </Grid>
          </form>
          <Grid item xs={2} className={classes.flex}>
            <Button type="submit">Next</Button>
          </Grid>
          <Grid item xs={10}></Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(SetProfile);
