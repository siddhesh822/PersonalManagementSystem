import React, { Component } from "react";
import {
  Grid,
  Button,
  Box,
  Divider,
  TextField,
  Input
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import firebase from "firebase";
import { storage } from "../../base";

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

class Profile extends Component {
  state = {
    view: false
  };
  componentWillMount() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
    }
    this.setState({
      displayName: name,
      emailuser: email,
      photoUrl: photoUrl
    });
    console.log(user);
  }
  handlePass = () => {
    var auth = firebase.auth();
    var emailAddress = this.state.emailuser;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function() {
        alert("Password reset email sent");
        console.log("Passwrod reset email sent");
      })
      .catch(function(error) {
        console.log("Error");
      });
  };
  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: [e.currentTarget.value]
    });
    var user = firebase.auth().currentUser;
    var name = this.state.displayName;

    user
      .updateProfile({
        displayName: `${name}`
      })
      .then(function() {
        console.log("wdawuawdgiagu");
      })
      .catch(function(error) {
        // An error happened.
      });
  };
  handleSubmit = () => {
    this.setState({
      view: true
    });
  };
  handleUpload = e => {
    e.preventDefault();
    this.setState({
      view: false
    });
    if (this.state.image) {
      const { image } = this.state;
      const uploadTask = storage
        .ref(`UserProfiles/${localStorage.getItem("uid")}/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("UserProfiles")
            .child(localStorage.getItem("uid"))
            .child(image.name)
            .getDownloadURL()
            .then(url1 => {
              this.setState({
                photoUrl: url1
              });
              var user = firebase.auth().currentUser;

              user
                .updateProfile({
                  photoUrl: `${url1}`
                })
                .then(function() {
                  this.setState({
                    photoUrl: url1
                  });
                })
                .catch(function(error) {
                  // An error happened.
                });
            });
        }
      );
    }
  };
  handleUploadChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({
        image
      });
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={3} className={classes.flex}>
            <Avatar
              alt="Profile"
              src={this.state.photoUrl}
              className={classes.avatar}
            />
            <p></p>
            {this.state.view !== true ? (
              <Button onClick={this.handleSubmit}>Upload</Button>
            ) : (
              <div>
                <form onSubmit={this.handleUpload}>
                  <Input type="file" onChange={this.handleUploadChange} />
                  <progress value={this.state.progress} max="100" />
                  <Button type="Submit">Upload</Button>
                </form>
              </div>
            )}
          </Grid>
          <Grid item xs={12} className={classes.divider}>
            <Divider />
          </Grid>

          <Grid item xs={2} className={classes.flex}>
            <Typography>Email :</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField value={this.state.emailuser} fullWidth></TextField>
          </Grid>
          <Grid item xs={12}>
            <p></p>
          </Grid>

          <Grid item xs={2} className={classes.flex}>
            <Typography>Display Name :</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              onChange={this.handleChange}
              defaultValue={this.state.displayName}
              name="displayName"
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <p></p>
          </Grid>

          {/*<Grid item xs={2} className={classes.flex}>
            <Typography>Master Password :</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField fullWidth></TextField>
          </Grid>*/}
          <Grid item xs={12}>
            <p></p>
          </Grid>
          <Grid item xs={2} className={classes.flex}>
            <Link onClick={this.handlePass}>
              <Typography>Change Password</Typography>
            </Link>
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

export default withStyles(styles)(Profile);
