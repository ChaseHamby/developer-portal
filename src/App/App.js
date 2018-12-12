import React, { Component } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button
            tag="a"
            color="success"
            size="large"
            href="http://reactstrap.github.io"
            target="_blank"
          >
            View Reactstrap Docs
          </Button>
          <button className='btn btn-danger'>HELP ME</button>
        </header>
      </div>
    );
  }
}

export default App;
