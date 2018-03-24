import React from 'react';
import { Route, IndexRoute } from 'react-router';
import paths from './constants/paths';
import AppLayout from './containers/layout/AppLayoutContainer';
import HomePage from './pages/home/HomePage';

export default (
  <Route
    component={ HomePage }
    path={ paths.home }
  >
    <IndexRoute component={ HomePage } />
  </Route>
);
