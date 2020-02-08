import React, { Component } from "react";
import { createMuiTheme } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { Chip, ListItem } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import clsx from "clsx";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

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
  root: {
    display: "flex"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 260
  },
  fixedHeight2: {
    height: 270
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  complete: {
    color: "white",
    background: "#FFA500"
  }
};

class Dashboard extends Component {
  state = {
    currentdate: Date.now()
  };
  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
    return (
      <div className={classes.root}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Todos Progress</Typography>
              <Paper className={fixedHeightPaper}>
                <List>
                  {this.props.todos.map((todo, index) => {
                    return (
                      <ListItem alignItems="flex-start" key={index}>
                        <ListItemText>
                          <Box component="div" textOverflow="ellipsis">
                            <Typography
                              className={
                                todo.checked === true ? classes.line : ""
                              }
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
                            <Chip
                              size="small"
                              color="secondary"
                              label="Not Done"
                            />
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Upcoming Schedules</Typography>
              <Paper className={fixedHeightPaper}>
                <List>
                  {this.props.schedules.map((schedule, index) => {
                    return (
                      <ListItem alignItems="flex-start" key={index}>
                        <ListItemText>
                          <Box component="div" textOverflow="ellipsis">
                            <Typography color="textPrimary">
                              {schedule.name}
                              {" ("}
                              {new Date(schedule.date).toDateString()}
                              {")"}
                            </Typography>
                          </Box>
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {schedule.checked ? (
                            <Chip
                              size="small"
                              className={classes.complete}
                              icon={<DoneIcon />}
                              label="Done"
                            />
                          ) : Math.round(
                              (new Date(schedule.date).getTime() -
                                new Date(this.state.currentdate).getTime()) /
                                (24 * 3600 * 1000) <
                                0
                            ) ? (
                            <Chip
                              size="small"
                              color="secondary"
                              label={`${Math.round(
                                (new Date(schedule.date).getTime() -
                                  new Date(this.state.currentdate).getTime()) /
                                  (-24 * 3600 * 1000)
                              )} days ago`}
                            />
                          ) : (
                            <Chip
                              size="small"
                              color="primary"
                              label={`${Math.round(
                                (new Date(schedule.date).getTime() -
                                  new Date(this.state.currentdate).getTime()) /
                                  (24 * 3600 * 1000)
                              )} days to go`}
                            />
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Achievements</Typography>
              <Paper className={fixedHeightPaper2}>
                <List>
                  {this.props.achievements.map((achievement, index) => {
                    return (
                      <ListItem alignItems="flex-start" key={index}>
                        <ListItemText>
                          <Box component="div" textOverflow="ellipsis">
                            <Typography color="textPrimary">
                              {achievement.name}
                            </Typography>
                          </Box>
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {achievement.finalvalue !==
                          achievement.initialvalue ? (
                            <Chip
                              size="small"
                              color="primary"
                              label={`In Progress ${achievement.initialvalue} / ${achievement.finalvalue}`}
                            ></Chip>
                          ) : (
                            <Chip
                              className={classes.complete}
                              size="small"
                              color="primary"
                              label={`Achieved`}
                            ></Chip>
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
