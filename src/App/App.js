import React, { Component } from 'react';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/auth';
import Profile from '../components/Profile/profile';
import MyNavbar from '../components/MyNavbar/myNavbar';
import './App.scss';

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    if (!this.state.authed) {
      return (
        <div className="App">
          <MyNavbar />
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      );
    }
    return (
      <div className="App">
        <MyNavbar />
        <Profile />
      </div>
    );
  }
}

export default App;
