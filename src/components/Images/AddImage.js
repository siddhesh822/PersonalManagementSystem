import React, { Component } from "react";
import { Grid, Button, Input } from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import IconButton from "@material-ui/core/IconButton";
import { storage } from "../../base";

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

class AddImage extends Component {
  state = {
    progrss: 0,
    url: []
  };
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({
        image
      });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.image) {
      const { image } = this.state;
      const uploadTask = storage
        .ref(`images/${localStorage.getItem("uid")}/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(localStorage.getItem("uid"))
            .child(image.name)
            .getDownloadURL()
            .then(url1 => {
              console.log("hii");
              this.props.addImageUrl(url1);
            });
        }
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input type="file" onChange={this.handleChange} />
          </Grid>
          <Grid item xs={12}>
            <progress value={this.state.progress} max="100" />
          </Grid>
          <Grid item xs={1}>
            <Button
              size="medium"
              color="primary"
              variant="outlined"
              type="submit"
              startIcon={<ArrowUpwardIcon />}
            >
              Upload
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

export default withStyles(styles)(AddImage);
