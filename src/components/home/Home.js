import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Stepper from '../stepper/Steps';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  render() {
    const styles = {
      transition: '1s ease-in',
      width: this.state.open ? '10%' : 0,
      backgroundColor: 'red',
      height: 100,
      position: 'absolute',
      right: 0
    }

    const block = {
      backgroundColor: 'blue',
      width: '100%',
      height: 100,
    }

    const steps = [{
      Name: 'Transmit to Government',
      Logs: ['Succesfully packaged and transmitted', 'The import falied. Go to import catches and upload a batch again, the tremendous power', '2', '3'],
      Id: 'a'
    }, {
      Name: 'Government Authorization',
      Logs: ['1', '2', '3'],
      Id: 'b'
    }, {
      Name: 'Government Authorization',
      Logs: ['1', '2', '3'],
      Id: 'b'
    }, {
      Name: 'Government Authorization',
      Logs: ['1', '2', '3'],
      Id: 'b'
    }, {
      Name: 'Government Authorization',
      Logs: ['1', '2', '3'],
      Id: 'b'
    }, {
      Name: 'Government Authorization',
      Logs: ['1', '2', '3', '8'],
      Id: 'b'
    }]
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={ () => this.setState({open: !this.state.open})}>Open</button>
        <Stepper steps={ steps } />
      </div>
    );
  }
}

export default App;
