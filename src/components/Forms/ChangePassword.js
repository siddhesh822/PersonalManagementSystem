import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import firebase from "firebase";
class ChangePassword extends Component {
  state = { email: null };
  handleChange = e => {
    this.setState({
      email: e.currentTarget.value
    });
  };
  handleClick = () => {
    var auth = firebase.auth();
    var emailAddress = this.state.email;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        this.props.history.push("/signin");
        alert("Password change email sent, please check your email");
      })
      .catch(error => {
        alert(error);
      });
  };
  render() {
    return (
      <div>
        <TextField variant="outlined" onChange={this.handleChange}>
          Enter your email
        </TextField>
        <Button onClick={this.handleClick}>Next</Button>
      </div>
    );
  }
}

export default ChangePassword;
