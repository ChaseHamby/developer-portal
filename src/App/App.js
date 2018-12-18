import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/auth';
import Profile from '../components/Profile/profile';
import Tutorials from '../components/Tutorials/tutorials';
import CommitsData from '../components/CommitsData/commitsData';
import MyNavbar from '../components/MyNavbar/myNavbar';
import './App.scss';
import authRequests from '../helpers/data/authRequests';
import Tabs from '../components/Tabs/tabs';
import tutorialsRequests from '../helpers/data/tutorialsRequests';


class App extends Component {
  state = {
    authed: false,
    tutorials: [],
  }

  componentDidMount() {
    connection();
    tutorialsRequests.getRequest()
      .then((tutorials) => {
        this.setState({ tutorials });
      })
      .catch(err => console.error('err getting tutorials', err));

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  deleteOne = (tutorialId) => {
    tutorialsRequests.deleteTutorial(tutorialId)
      .then(() => {
        tutorialsRequests.getRequest()
          .then((tutorials) => {
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }


  render() {
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (!this.state.authed) {
      return (
        <div className="App">
          <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      );
    }
    return (
      <div className="App">
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
        <Profile />
        <Tutorials
          tutorials={this.state.tutorials}
          deleteSingleTutorial={this.deleteOne}
        />
        <CommitsData />
        <Tabs />
      </div>
    );
  }
}

export default App;
