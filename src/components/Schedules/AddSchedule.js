import React, { Component } from "react";
import { Grid, Button, InputAdornment, Tooltip } from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

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

class AddSchedule extends Component {
  state = {
    name: "",
    date: Date.now()
  };

  handleSubmit = e => {
    e.preventDefault();
    const schedule = {
      name: this.state.name,
      date: this.state.date,
      checked: false
    };

    this.props.addSchedule(schedule);
  };
  handleDateChange = date => {
    this.setState({
      date: date.getTime()
    });
  };

  handleNameChange = e => {
    this.setState({
      name: e.currentTarget.value
    });
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
              id="name"
              onChange={this.handleNameChange}
              placeholder="Name"
              inputRef={el => (this.name = el)}
              name="name"
              autoComplete="off"
            />
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12}>
              <KeyboardDatePicker
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
            </Grid>
          </MuiPickersUtilsProvider>

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

export default withStyles(styles)(AddSchedule);
