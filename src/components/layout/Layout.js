import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LoadingBar from 'react-redux-loading-bar';

class Layout extends Component {
  handleClose = () => {
    this.props.dismissToast();
  }
  render() {
    const actions = [
      <FlatButton
        label="Cerrar"
        primary={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div className="App">
        <LoadingBar className="App-loading-bar" />
        <header className="App-header">
        </header>
        <div>
          {this.props.children}
          <footer className="footer">
          </footer>
          <Dialog
            actions={actions}
            modal={false}
            open={this.props.showErrorModal}
            onRequestClose={this.handleClose}
          >
            <p>{this.props.errorMessage}</p>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default Layout;
