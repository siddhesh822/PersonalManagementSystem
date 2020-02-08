import React, { Component } from "react";
import { Grid, Button, Box, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddTodo from "./AddTodo";
import ShowTodos from "./ShowTodos";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
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
  paper: {
    padding: theme.spacing(1, 1),
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("sm")]: {
      marginLeft: 150,
      marginRight: 150
    }
  },
  expandAddContact: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

class Todo extends Component {
  state = {
    isShow: false
  };
  handleClick = () => {
    this.setState({
      isShow: true
    });
  };
  handleExpandLess = () => {
    this.setState({
      isShow: false
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Box align="center">
              {this.state.isShow ? (
                <div className={classes.paper}>
                  <AddTodo
                    handleExpandLess={this.handleExpandLess}
                    addTodo={this.props.addTodo}
                  />
                </div>
              ) : (
                <div className={classes.expandAddContact}>
                  <Button
                    fullWidth
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={this.handleClick}
                  >
                    Add Todo
                  </Button>
                </div>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} className={classes.divider}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <ShowTodos
              updateTodo={this.props.updateTodo}
              todos={this.props.todos}
              deleteTodo={this.props.deleteTodo}
            />
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(Todo);
