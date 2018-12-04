import React from 'react';
import { Route, IndexRoute } from 'react-router';
import paths from './constants/paths';
import AppLayout from './containers/layout/AppLayoutContainer';
import ConsultaPage from './pages/consulta/ConsultaPage';
import ResultsPage from './pages/results/ResultsPage';

export default (
  <Route
    component={ AppLayout }
    path={ paths.home }
  >
    <IndexRoute component={ ConsultaPage } />
    <Route path={ paths.results } component={ ResultsPage }/>
  </Route>
);
