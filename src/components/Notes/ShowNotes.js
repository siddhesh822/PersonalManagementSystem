import React, { Component } from "react";
import {
  Typography,
  createMuiTheme,
  IconButton,
  Box,
  MenuItem,
  ListItem,
  Paper
} from "@material-ui/core";

import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import NotesModal from "./NotesModal";
import TextField from "@material-ui/core/TextField";
import Mansory from "react-masonry-component";

const options = {
  fitWidth: true
};

const theme = createMuiTheme();

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
  }
};

class ShowNotes extends Component {
  state = {
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

  render() {
    const { classes } = this.props;
    const { notes } = this.props;

    const notes2 = notes.map((note, index) => {
      return (
        <div className={classes.divs}>
          <Paper>
            <TextField
              fullWidth
              variant="outlined"
              required
              disabled={true}
              defaultValue={note.note}
              multiline={true}
              rowsMax={10}
              id="note"
              placeholder="Note"
              onClick={() => this.handleOpen(index)}
              name="note"
              autoComplete="off"
            />
          </Paper>
        </div>
      );
    });

    //Modal Component
    return (
      <List className={classes.root}>
        <Mansory options={options} className={classes.notelistcontainer}>
          {notes2}
        </Mansory>
        {this.state.modalopen ? (
          <NotesModal
            updateNote={this.props.updateNote}
            renderText={this.state.renderText}
            note={notes[this.state.index]}
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

export default withStyles(styles)(ShowNotes);
