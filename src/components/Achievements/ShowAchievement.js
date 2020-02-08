import React, { Component } from "react";
import {
  Typography,
  createMuiTheme,
  IconButton,
  Box,
  MenuItem,
  Button,
  CardMedia,
  LinearProgress
} from "@material-ui/core";
import { lighten } from "@material-ui/core/styles";
import { withStyles, Grid, InputAdornment } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import AchievementModal from "./AchievementModal";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";

const theme = createMuiTheme();
const BorderLinearProgress = withStyles({
  root: {
    height: 6,
    backgroundColor: lighten("#007AB9", 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#007AB9"
  }
})(LinearProgress);

const styles = {
  root: {
    width: "100%"
  },
  menu: {
    height: 40,

    display: "flex",
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
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  div: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    paddingRight: 10
  },
  lol: {
    paddingRight: 20
  }
};

class ShowAchievement extends Component {
  state = {
    renderText: false,
    contacts: this.props.achievement,
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

  render() {
    const { classes } = this.props;
    const { achievements } = this.props;

    const achievement2 = achievements.map((achievement, index) => {
      return (
        <MenuItem
          alignItems="flex-start"
          key={index}
          classeName={classes.menu}
          onClick={() => this.handleOpen(index)}
        >
          <div className={classes.lol}>
            <Avatar
              variant="square"
              src={
                achievement.category == "Gold"
                  ? icon1
                  : achievement.category == "Silver"
                  ? icon2
                  : icon3
              }
              className={classes.avatar}
            ></Avatar>
          </div>

          <div className={classes.div}>
            <Typography>{achievement.name}</Typography>
            <Typography variant="overline">
              {achievement.description ? achievement.description : <br />}
            </Typography>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={Math.ceil(
                (achievement.initialvalue * 100) / achievement.finalvalue
              )}
            />
            <Typography variant="caption">
              {achievement.initialvalue !== achievement.finalvalue
                ? `${achievement.initialvalue}/${achievement.finalvalue}`
                : "Achived!"}
            </Typography>
          </div>
          <div>
            <h6></h6>
            <IconButton onClick={this.props.deleteAchievement}>
              <DeleteIcon />
            </IconButton>
          </div>
        </MenuItem>
      );
    });

    //Modal Component
    return (
      <List className={classes.root}>
        {achievement2}
        {this.state.modalopen ? (
          <AchievementModal
            updateAchievement={this.props.updateAchievement}
            renderText={this.state.renderText}
            achievement={achievements[this.state.index]}
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

export default withStyles(styles)(ShowAchievement);
