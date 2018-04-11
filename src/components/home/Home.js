import React, { Component } from 'react';
import { groupBy } from 'lodash';
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
      Category: 'Government Auth',
      Logs: [{ Id: 'a', Error: 'Succesfully packaged and transmitted', LogDate: new Date().toLocaleString() },
      { Id: 'b', Error: 'There was an error during the execution of current profile, fix and try again.', LogDate: new Date().toLocaleString() },
      { Id: 'v', Error: 'There was an error during the execution of current profile, fix and try again.', LogDate: new Date().toLocaleString() },
      { Id: 's', Error: 'There was an error during the execution of current profile, fix and try again.', LogDate: new Date().toLocaleString() },
      { Id: 'd', Error: 'There was an error during the execution of current profile, fix and try again.', LogDate: new Date().toLocaleString() },
      { Id: 'e', Error: 'There was an error during the execution of current profile, fix and try again.', LogDate: new Date().toLocaleString() },
      { Id: 'f', Error: 'There was an error during the execution of current profile, fix and try again.', LogDate: new Date().toLocaleString() },
      { Id: 'g', Error: 'There was an error during the execution of current profile, fix and try again.', LogDate: new Date().toLocaleString() }
    ],
      Id: 'a'
    }, {
      Name: 'Government Authorization',
      Category: 'Government Auth',
      Logs: [{ Id: '', Error: 'Succesfully packaged and transmitted', LogDate: new Date().toLocaleString() },
      { Id: 'p', Error: 'There was an error during the execution of current profile, fix and try again.', LogDate: new Date().toLocaleString() }],
      Id: 'b'
    }, {
      Name: 'Print PDFs',
      Category: 'Bussiness Automation',
      Logs: [{ Id: '', Error: 'Succesfully packaged and transmitted', LogDate: new Date().toLocaleString() },
      { Id: 'o', Error: 'There was an error during the execution of current profile, fix and try again.', LogDate: new Date().toLocaleString() }],
      Id: 'c'
    }, {
      Name: 'Integration',
      Category: 'Bussiness Automation',
      Logs: [{ Id: '', Error: 'Succesfully packaged and transmitted', LogDate: new Date().toLocaleString() },
      { Id: 'i', Error: 'There was an error during the execution of current profile, fix and try again.', LogDate: new Date().toLocaleString() }],
      Id: 'd'
    }, {
      Name: 'Sales Demo',
      Category: 'Sales',
      Logs: [{ Id: 'j', Error: 'Succesfully packaged and transmitted', LogDate: new Date().toLocaleString() },
      { Id: 'k', Error: 'There was an error during the execution of current profile, fix and try again.', LogDate: new Date().toLocaleString() }],
      Id: 'd'
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
        <button onClick={() => this.setState({ open: !this.state.open })}>Open</button>
        <Stepper
          steps={steps}
          handleStepClick={(step, index) => console.log(step, index)}
          categories={Object.keys(groupBy(steps, 'Category'))}
        />
      </div>
    );
  }
}

export default App;
