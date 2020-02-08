import React, { Component } from "react";
import {
  Typography,
  createMuiTheme,
  IconButton,
  Box,
  ListItem,
  TextField,
  Divider,
  Chip
} from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Checkbox from "@material-ui/core/Checkbox";
import DoneIcon from "@material-ui/icons/Done";

const theme = createMuiTheme();

const styles = {
  root: {
    width: "100%"
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
  line: {
    textDecoration: "line-through"
  },
  complete: {
    color: "white",
    background: "#FFA500"
  }
};

class ShowTodos extends Component {
  state = {};

  handleChange = (e, todo) => {
    const updatedTodo = {
      checked: !todo.checked,
      item: todo.item
    };
    this.props.updateTodo(updatedTodo, todo.key);
  };
  render() {
    const { classes } = this.props;
    const { todos } = this.props;
    //Modal Component
    return (
      <div>
        <List className={classes.root}>
          {todos.map((todo, index) => {
            return (
              <div>
                <ListItem alignItems="flex-start" key={index}>
                  <Checkbox
                    checked={todo.checked}
                    value="primary"
                    onChange={e => {
                      this.handleChange(e, todo);
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  <ListItemText>
                    <Box component="div" textOverflow="ellipsis">
                      <Typography
                        className={todo.checked === true ? classes.line : ""}
                        color="textPrimary"
                      >
                        {todo.item}
                      </Typography>
                    </Box>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    {todo.checked ? (
                      <Chip
                        size="small"
                        icon={<DoneIcon />}
                        className={classes.complete}
                        label="Done"
                      />
                    ) : (
                      ""
                    )}
                    <IconButton onClick={() => this.props.deleteTodo(todo.key)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(ShowTodos);
