import React, { Component } from "react";
import { createMuiTheme, IconButton, Box, Button } from "@material-ui/core";
import { withStyles, Grid, InputAdornment } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
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

class ContactModal extends Component {
  state = {
    disabled: true,
    index: this.props.index,
    email: this.props.contact.email,
    phoneno: this.props.contact.phoneno,
    firstname: this.props.contact.firstname,
    lastname: this.props.contact.lastname,
    description: this.props.contact.description,
    save: false
  };
  handleAddMorePhone = () => {
    if (this.phoneno.value !== "") {
      const phoneno = this.state.phoneno;
      phoneno.push(this.phoneno.value);
      this.setState({
        phoneno: phoneno
      });
      this.phoneno.value = "";
    }
  };
  handleAddMoreEmail = () => {
    if (this.email.value !== "") {
      const email = this.state.email;
      email.push(this.email.value);
      this.setState({
        email: email
      });
      this.email.value = "";
    }
  };
  handleSubmit = e => {
    const contact = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phoneno: this.state.phoneno,
      description: this.state.description
    };
    this.props.updateContact(contact, this.state.index);
  };
  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  handleEdit = () => {
    this.setState({ disabled: false, save: true });
  };

  handleEmailChange = (index, e) => {
    const email = [...this.state.email];
    if (e.currentTarget.value !== "") {
      email[index] = e.currentTarget.value;
    } else {
      email.splice(index, 1);
    }
    this.setState({
      email: email
    });
  };
  handlePhonenoChange = (index, e) => {
    const phoneno = [...this.state.phoneno];
    if (e.currentTarget.value !== "") {
      phoneno[index] = e.currentTarget.value;
    } else {
      phoneno.splice(index, 1);
    }
    this.setState({
      phoneno: phoneno
    });
  };

  render() {
    const { classes } = this.props;
    const { contact } = this.props;
    return (
      <Modal
        className={classes.modal}
        open={this.props.modalopen}
        onClose={this.props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200
        }}
      >
        <Fade in={this.props.modalopen}>
          <div className={classes.paper}>
            <Box
              style={{
                marginTop: 10,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <IconButton onClick={this.handleEdit}>
                <EditIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {this.props.renderText ? (
                  <TextField
                    onChange={this.handleChange}
                    defaultValue={contact.firstname}
                    placeholder="Enter FirstName"
                    disabled={this.state.disabled}
                    fullWidth
                    id="firstname"
                    name="firstname"
                    autoComplete="off"
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {this.props.renderText ? (
                  <TextField
                    onChange={this.handleChange}
                    defaultValue={contact.lastname}
                    placeholder="Enter LastName"
                    disabled={this.state.disabled}
                    required
                    fullWidth
                    id="lastname"
                    name="lastname"
                    autoComplete="off"
                  />
                ) : (
                  ""
                )}
              </Grid>

              <Grid item xs={12}>
                {this.state.save ? (
                  <TextField
                    placeholder="Add email"
                    fullWidth
                    id="email"
                    inputRef={el => (this.email = el)}
                    name="email"
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={this.handleAddMoreEmail}
                            className={classes.hoverEffect}
                          >
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                ) : (
                  ""
                )}
                {this.props.renderText
                  ? contact.email.map((email, index) => {
                      return email !== "" ? (
                        <div key={index}>
                          <TextField
                            key={index}
                            onChange={e => this.handleEmailChange(index, e)}
                            fullWidth
                            name={`email${index}`}
                            disabled={this.state.disabled}
                            defaultValue={email}
                          />
                        </div>
                      ) : (
                        console.log("noemail")
                      );
                    })
                  : ""}
              </Grid>
              <Grid item xs={12}>
                {this.state.save ? (
                  <TextField
                    placeholder="Add phoneno"
                    fullWidth
                    id="phone"
                    inputRef={el => (this.phoneno = el)}
                    name="phoneno"
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={this.handleAddMorePhone}
                            className={classes.hoverEffect}
                          >
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                ) : (
                  ""
                )}
                {this.props.renderText
                  ? contact.phoneno.map((phoneno, index) => {
                      return phoneno !== "" ? (
                        <div key={index}>
                          <TextField
                            onChange={e => this.handlePhonenoChange(index, e)}
                            fullWidth
                            name={`phoneno${index}`}
                            disabled={this.state.disabled}
                            defaultValue={phoneno}
                          />
                        </div>
                      ) : (
                        console.log("nophoneno")
                      );
                    })
                  : ""}
              </Grid>
              <Grid item xs={12}>
                {this.props.renderText ? (
                  <TextField
                    onChange={this.handleChange}
                    defaultValue={contact.description}
                    multiline={true}
                    rowsMax={5}
                    placeholder="Add description"
                    disabled={this.state.disabled}
                    fullWidth
                    id="showdesc"
                    inputRef={el => (this.description = el)}
                    name="description"
                    autoComplete="off"
                  />
                ) : (
                  ""
                )}
              </Grid>
              {this.state.save ? (
                <Box
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                >
                  <Button variant="outlined" onClick={this.handleSubmit}>
                    Save
                  </Button>
                </Box>
              ) : (
                ""
              )}
            </Grid>
          </div>
        </Fade>
      </Modal>
    );
  }
}

export default withStyles(styles)(ContactModal);
