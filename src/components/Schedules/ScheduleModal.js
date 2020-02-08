import React, { Component } from "react";
import { createMuiTheme, IconButton, Box, Button } from "@material-ui/core";
import { withStyles, Grid, InputAdornment } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
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

class ScheduleModal extends Component {
  state = {
    disabled: true,
    index: this.props.index,
    save: false,
    date: this.props.schedule.date
  };
  handleDateChange = date => {
    this.setState({
      date: date.getTime()
    });
  };
  handleSubmit = e => {
    const schedule = {
      name: this.state.name,
      date: this.state.date
    };
    this.props.updateSchedule(schedule, this.state.index);
  };
  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  handleEdit = () => {
    this.setState({ disabled: false, save: true });
  };

  render() {
    const { classes } = this.props;
    const { schedule } = this.props;
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
              <Grid item xs={12}>
                {this.props.renderText ? (
                  <TextField
                    onChange={this.handleChange}
                    defaultValue={schedule.name}
                    placeholder="Name"
                    disabled={this.state.disabled}
                    fullWidth
                    id="name"
                    name="name"
                    autoComplete="off"
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                {this.props.renderText ? (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disabled={this.state.disabled}
                      fullWidth
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="MM/dd/yyyy"
                      value={this.state.date}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
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

export default withStyles(styles)(ScheduleModal);
