import React, { Component } from "react";
import {
  Typography,
  createMuiTheme,
  IconButton,
  Box,
  MenuItem,
  ListItem,
  Paper,
  Grid
} from "@material-ui/core";

import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";

import TextField from "@material-ui/core/TextField";
import Mansory from "react-masonry-component";

const options = {
  fitWidth: true
};

const styles = {
  img: {
    maxHeight: 347,
    maxWidth: 347
  },
  imagelistcontainer: {
    margin: "auto"
  },

  root: {
    width: "100%"
  },

  divs: {
    padding: 5,
    position: "relative"
  },
  btn: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent"
  }
};

class ShowImages extends Component {
  state = {
    renderText: false,
    save: false,
    index: null,
    indexm: null,
    modalopen: false,
    disabled: true,
    mouseover: false
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
  handleMouseOver = index => {
    this.setState({ indexm: index });
  };

  render() {
    const { classes } = this.props;
    const { images } = this.props;

    const images2 = images.map((image, index) => {
      return (
        <div className={classes.divs} key={index}>
          <img
            src={image}
            className={classes.img}
            onMouseOver={e => {
              this.handleMouseOver(index);
            }}
          />
          {this.state.index === index ? console.log("hovered") : ""}
        </div>
      );
    });

    //Modal Component
    return (
      <Mansory options={options} className={classes.notelistcontainer}>
        {images2}
      </Mansory>
    );
  }
}

export default withStyles(styles)(ShowImages);
