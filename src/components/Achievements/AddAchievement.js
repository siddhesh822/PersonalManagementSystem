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

class AddAchievement extends Component {
  state = {
    initialvalue: 0,
    finalvalue: 0
  };
  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const achievement = {
      name: this.name.value,
      category: this.category.value,
      description: this.description.value,
      initialvalue: this.state.initialvalue,
      finalvalue: this.state.finalvalue
    };

    this.props.addAchievement(achievement);
  };
  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              placeholder="Name"
              inputRef={el => (this.name = el)}
              name="name"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              native
              fullWidth
              defaultValue="None"
              variant="outlined"
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
              placeholder="Initialvalue"
              id="initialvalue"
              name="initialvalue"
              onChange={this.handleChange}
              fullWidth
              type="initialvalue"
              variant="outlined"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Finalvalue"
              id="finalvalue"
              name="finalvalue"
              onChange={this.handleChange}
              fullWidth
              type="finalvalue"
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

export default withStyles(styles)(AddAchievement);
