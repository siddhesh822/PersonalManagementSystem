import React, { Component } from "react";
import { Grid, Button, Box, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddAchievement from "./AddAchievement";
import ShowAchievement from "./ShowAchievement";
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
  expandAddAchievement: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

class Achievements extends Component {
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
                  <AddAchievement
                    handleExpandLess={this.handleExpandLess}
                    addAchievement={this.props.addAchievement}
                  />
                </div>
              ) : (
                <div className={classes.expandAddAchievement}>
                  <Button
                    fullWidth
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={this.handleClick}
                  >
                    Add Achievement
                  </Button>
                </div>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} className={classes.divider}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <ShowAchievement
              achievements={this.props.achievements}
              deleteAchievement={this.props.deleteAchievement}
              updateAchievement={this.props.updateAchievement}
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

export default withStyles(styles)(Achievements);
