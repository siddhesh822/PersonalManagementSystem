import React, { Component } from "react";
import {
  createMuiTheme,
  IconButton,
  Box,
  Button,
  Select
} from "@material-ui/core";
import { withStyles, Grid, InputAdornment } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import DateFnsUtils from "@date-io/date-fns";

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

class AchievementModal extends Component {
  state = {
    renderText: this.props.renderText,
    disabled: true,
    index: this.props.index,
    save: false
  };
  handleSubmit = e => {
    const achievement = {
      name: this.name.value,
      category: this.category.value,
      description: this.description.value,
      finalvalue: this.finalvalue.value,
      initialvalue: this.initialvalue.value
    };
    this.props.updateAchievement(achievement, this.state.index);
  };

  handleEdit = () => {
    this.setState({ disabled: false, save: true });
  };

  render() {
    const { classes } = this.props;
    const { achievement } = this.props;
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
                {this.state.renderText ? (
                  <TextField
                    defaultValue={achievement.name}
                    placeholder="Name"
                    disabled={this.state.disabled}
                    fullWidth
                    id="name"
                    inputRef={el => (this.name = el)}
                    name="name"
                    autoComplete="off"
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {this.state.renderText ? (
                  <Select
                    native
                    fullWidth
                    defaultValue={achievement.category}
                    disabled={this.state.disabled}
                    labelId="Hello"
                    inputRef={el => (this.category = el)}
                    inputProps={{
                      name: "category",
                      id: "category-native-simple"
                    }}
                  >
                    <option value={"Gold"}>Gold</option>
                    <option value={"Silver"}>Silver</option>
                    <option value={"Bronze"}>Bronze</option>
                  </Select>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                {this.state.renderText ? (
                  <TextField
                    defaultValue={achievement.description}
                    placeholder="Add description"
                    disabled={this.state.disabled}
                    fullWidth
                    id="showdesc"
                    inputRef={el => (this.description = el)}
                    name="showdesc"
                    autoComplete="off"
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {this.state.renderText ? (
                  <TextField
                    defaultValue={achievement.initialvalue}
                    placeholder="Add initialvalue"
                    disabled={this.state.disabled}
                    fullWidth
                    id="showinitialvalue"
                    inputRef={el => (this.initialvalue = el)}
                    name="showinitialvalue"
                    autoComplete="off"
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {this.state.renderText ? (
                  <TextField
                    defaultValue={achievement.finalvalue}
                    placeholder="Add finalvalue"
                    disabled={this.state.disabled}
                    fullWidth
                    id="showfinalvalue"
                    inputRef={el => (this.finalvalue = el)}
                    name="showfinalvalue"
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

export default withStyles(styles)(AchievementModal);
