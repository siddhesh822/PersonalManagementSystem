import React, { Component } from "react";
import MiniDrawer from "./components/Sidebar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Todo from "./components/Todos/Todo";
import Notes from "./components/Notes/Notes";
import Contacts from "./components/Contacts/Contacts";
import Passwords from "./components/Passwords/Passwords";
import Achievements from "./components/Achievements/Achievements";
import Schedules from "./components/Schedules/Schedules";
import Images from "./components/Images/Images";
import SignUp2 from "./components/Forms/SignUp2";
import SignIn2 from "./components/Forms/SignIn2";
import Home from "./components/Home";
import Error from "./components/Error";
import firebase from "firebase";
import base from "./base";
import ChangePassword from "./components/Forms/ChangePassword";
import Profile from "./components/Profile/Profile";
import SetProfile from "./components/Profile/SetProfile";

class App extends Component {
  state = {
    user: null,
    notes: [],
    contacts: [],
    achievements: [],
    schedules: [],
    todos: [],
    passwords: [],
    images: []
  };
  callback = () => {
    this.ref = base.syncState(`Todos/${this.state.user.uid}`, {
      context: this,
      state: "todos",
      asArray: true
    });
    this.ref = base.syncState(`Schedules/${this.state.user.uid}`, {
      context: this,
      state: "schedules",
      asArray: true
    });
    this.ref = base.syncState(`Images/${this.state.user.uid}`, {
      context: this,
      state: "images",
      asArray: true
    });
    this.ref = base.syncState(`Contacts/${this.state.user.uid}`, {
      context: this,
      state: "contacts",
      asArray: true
    });
    this.ref = base.syncState(`Achievements/${this.state.user.uid}`, {
      context: this,
      state: "achievements",
      asArray: true
    });
    this.ref = base.syncState(`Passwords/${this.state.user.uid}`, {
      context: this,
      state: "passwords",
      asArray: true
    });
    this.ref = base.syncState(`Notes/${this.state.user.uid}`, {
      context: this,
      state: "notes",
      asArray: true
    });
  };
  componentWillMount() {
    this.authListener(this.callback);
  }
  authListener = callback => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user: user });
        console.log(this.state.user);
        console.log("Callbacking");
        localStorage.setItem("uid", this.state.user.uid);
        callback();
      } else {
        this.setState({ user: null });
      }
    });
  };
  addImageUrl = url => {
    let images = [...this.state.images, url];
    this.setState({
      images: images
    });
  };
  deleteContact = index => {
    let contacts = [...this.state.contacts];
    contacts.splice(index, 1);
    this.setState({
      contacts: contacts
    });
  };
  addContact = contact => {
    const contacts = [...this.state.contacts, contact];
    this.setState({
      contacts: contacts
    });
  };
  updateContact = (updatedContact, index) => {
    const contacts = [...this.state.contacts];
    contacts[index] = updatedContact;
    this.setState({
      contacts: contacts
    });
  };
  addAchievement = achievement => {
    const achievements = [...this.state.achievements, achievement];
    this.setState({
      achievements: achievements
    });
  };
  deleteAchievement = index => {
    let achievements = [...this.state.achievements];
    achievements.splice(index, 1);
    this.setState({
      achievements: achievements
    });
  };
  updateAchievement = (updatedAchievement, index) => {
    const achievements = [...this.state.achievements];
    achievements[index] = updatedAchievement;
    this.setState({
      achievements: achievements
    });
  };
  addPassword = password => {
    const passwords = [...this.state.passwords, password];
    this.setState({
      passwords: passwords
    });
  };
  deletePassword = index => {
    let password = [...this.state.password];
    password.splice(index, 1);
    this.setState({
      password: password
    });
  };
  updatePassword = (updatedPassword, index) => {
    const passwords = [...this.state.passwords];
    passwords[index] = updatedPassword;
    this.setState({
      passwords: passwords
    });
  };
  addNote = note => {
    const notes = [...this.state.notes, note];
    this.setState({
      notes: notes
    });
  };
  updateNote = (updatedNote, index) => {
    const notes = [...this.state.notes];
    notes[index] = updatedNote;
    this.setState({
      notes: notes
    });
  };
  addSchedule = schedule => {
    const schedules = [...this.state.schedules, schedule];
    schedules.sort(function(a, b) {
      return a.date - b.date;
    });
    this.setState({
      schedules: schedules
    });
  };

  deleteSchedule = index => {
    let schedules = [...this.state.schedules];
    schedules.splice(index, 1);
    this.setState({
      schedules: schedules
    });
  };
  updateSchedule = (updatedSchedule, index) => {
    const schedules = [...this.state.schedules];
    schedules[index] = updatedSchedule;
    schedules.sort(function(a, b) {
      return a.date - b.date;
    });
    this.setState({
      schedules: schedules
    });
  };
  addTodo = todo => {
    const todos = [...this.state.todos, todo];
    this.setState({
      todos: todos
    });
  };
  deleteTodo = index => {
    let todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({
      todos: todos
    });
  };
  updateTodo = (updatedTodo, index) => {
    const todos = [...this.state.todos];
    todos[index] = updatedTodo;
    this.setState({
      todos: todos
    });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn2} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route path="/signup" component={SignUp2} />
            <Route path="/User/Setup" component={SetProfile} />
            {this.state.user ? (
              <Switch>
                <Route
                  path="/dashboard"
                  component={() => (
                    <MiniDrawer title="Dashboard">
                      <Dashboard
                        todos={this.state.todos}
                        schedules={this.state.schedules}
                        achievements={this.state.achievements}
                      />
                    </MiniDrawer>
                  )}
                />
                <Route
                  path="/todo"
                  component={() => (
                    <MiniDrawer title="Todo">
                      <Todo
                        addTodo={this.addTodo}
                        todos={this.state.todos}
                        deleteTodo={this.deleteTodo}
                        updateTodo={this.updateTodo}
                      />
                    </MiniDrawer>
                  )}
                />
                <Route
                  path="/notes"
                  component={() => (
                    <MiniDrawer title="Notes">
                      <Notes
                        addNote={this.addNote}
                        updateNote={this.updateNote}
                        notes={this.state.notes}
                      />
                    </MiniDrawer>
                  )}
                />
                <Route
                  path="/contacts"
                  component={() => (
                    <MiniDrawer title="Contacts">
                      <Contacts
                        addContact={this.addContact}
                        deleteContact={this.deleteContact}
                        updateContact={this.updateContact}
                        contacts={this.state.contacts}
                      />
                    </MiniDrawer>
                  )}
                />
                <Route
                  path="/passwords"
                  component={() => (
                    <MiniDrawer title="Passwords">
                      <Passwords
                        addPassword={this.addPassword}
                        passwords={this.state.passwords}
                        deletePassword={this.deletePassword}
                        updatePassword={this.updatePassword}
                      />
                    </MiniDrawer>
                  )}
                />
                <Route
                  path="/achievements"
                  component={() => (
                    <MiniDrawer title="Achievements">
                      <Achievements
                        addAchievement={this.addAchievement}
                        deleteAchievement={this.deleteAchievement}
                        achievements={this.state.achievements}
                        updateAchievement={this.updateAchievement}
                      />
                    </MiniDrawer>
                  )}
                />
                <Route
                  path="/schedules"
                  component={() => (
                    <MiniDrawer title="Schedules">
                      <Schedules
                        addSchedule={this.addSchedule}
                        deleteSchedule={this.deleteSchedule}
                        updateSchedule={this.updateSchedule}
                        schedules={this.state.schedules}
                      />
                    </MiniDrawer>
                  )}
                />
                <Route
                  path="/images"
                  component={() => (
                    <MiniDrawer title="Images">
                      <Images
                        addImageUrl={this.addImageUrl}
                        images={this.state.images}
                      />
                    </MiniDrawer>
                  )}
                />
                <Route
                  path="/profile"
                  component={() => (
                    <MiniDrawer title="Profile">
                      <Profile />
                    </MiniDrawer>
                  )}
                />
              </Switch>
            ) : (
              <SignIn2 />
            )}

            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
