import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    store: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { routes, store } = this.props;

    return (
      <Provider store={ store }>
        <Router history={ hashHistory } routes={ routes } />
      </Provider>
    );
  }
}

export default AppContainer;
