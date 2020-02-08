import React, { Component } from "react";
import { Grid, Button, Box, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import AddImage from "./AddImage";
import ShowImages from "./ShowImages";
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

class Images extends Component {
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
                  <AddImage
                    handleExpandLess={this.handleExpandLess}
                    addImageUrl={this.props.addImageUrl}
                  />
                </div>
              ) : (
                <div className={classes.expandAddContact}>
                  <Button
                    fullWidth
                    color="primary"
                    startIcon={<ArrowUpwardIcon />}
                    onClick={this.handleClick}
                  >
                    Upload Image
                  </Button>
                </div>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} className={classes.divider}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <ShowImages images={this.props.images} />
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(Images);
