import React, { Component } from "react";
import {
  Typography,
  createMuiTheme,
  IconButton,
  Box,
  MenuItem,
  ListItem,
  Paper,
  Chip,
  Checkbox
} from "@material-ui/core";

import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import Mansory from "react-masonry-component";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import ScheduleModal from "./ScheduleModal";
import DoneIcon from "@material-ui/icons/Done";
import { getColor } from "../../helper";

const theme2 = createMuiTheme({
  palette: {
    warning: "blue"
  }
});

const styles = {
  notelistcontainer: {
    margin: "auto"
  },

  root: {
    width: "100%"
  },

  divs: {
    width: 280,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10
  },
  complete: {
    color: "white",
    background: "#FFA500"
  },
  color: {
    backgroundColor: getColor()
  }
};

class ShowSchedules extends Component {
  state = {
    currentdate: Date.now(),
    renderText: false,
    save: false,
    index: null,
    modalopen: false,
    disabled: true
  };

  handleOpen = index => {
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
  handlecheckChange = (e, schedule) => {
    console.log("schedule");
    console.log(schedule);
    const updatedSchedule = {
      name: schedule.name,
      date: schedule.date,
      checked: !schedule.checked
    };
    console.log(updatedSchedule);
    this.props.updateSchedule(updatedSchedule, schedule.key);
  };

  render() {
    const { classes } = this.props;
    const { schedules } = this.props;

    const schedules2 = schedules.map((schedule, index) => {
      return (
        <div>
          <MenuItem
            className={classes.menu}
            alignItems="flex-start"
            key={index}
            onClick={() => this.handleOpen(schedule.key)}
          >
            <ListItemAvatar>
              <Avatar className={classes.color}>{schedule.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box component="div" textOverflow="ellipsis">
                  <Typography noWrap>{schedule.name}</Typography>
                </Box>
              }
              secondary={
                <Box component="div" textOverflow="ellipsis">
                  <Typography noWrap color="textPrimary">
                    {new Date(schedule.date).getDate() +
                      "/" +
                      new Date(schedule.date).getMonth() +
                      1 +
                      "/" +
                      new Date(schedule.date).getFullYear()}{" "}
                  </Typography>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              {schedule.checked ? (
                <Chip
                  size="small"
                  className={classes.complete}
                  icon={<DoneIcon />}
                  label="Done"
                />
              ) : Math.round(
                  (new Date(schedule.date).getTime() -
                    new Date(this.state.currentdate).getTime()) /
                    (24 * 3600 * 1000) <
                    0
                ) ? (
                <Chip
                  size="small"
                  color="secondary"
                  label={`${Math.round(
                    (new Date(schedule.date).getTime() -
                      new Date(this.state.currentdate).getTime()) /
                      (-24 * 3600 * 1000)
                  )} days ago`}
                />
              ) : (
                <Chip
                  size="small"
                  color="primary"
                  label={`${Math.round(
                    (new Date(schedule.date).getTime() -
                      new Date(this.state.currentdate).getTime()) /
                      (24 * 3600 * 1000)
                  )} days to go`}
                />
              )}

              <Checkbox
                checked={schedule.checked}
                value="primary"
                onChange={e => {
                  this.handlecheckChange(e, schedule);
                }}
                inputProps={{ "aria-label": "primary checkbox" }}
              />

              <IconButton
                onClick={() => this.props.deleteSchedule(schedule.key)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </MenuItem>
        </div>
      );
    });

    //Modal Component
    return (
      <List className={classes.root}>
        {schedules2}

        {this.state.modalopen ? (
          <ScheduleModal
            updateSchedule={this.props.updateSchedule}
            renderText={this.state.renderText}
            schedule={schedules[this.state.index]}
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

export default withStyles(styles)(ShowSchedules);
