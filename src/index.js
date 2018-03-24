import React from 'react';
import ReactDOM from 'react-dom';
import { SovosThemeProvider } from 's1-ui';
import store from './store/index';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import SovosTheme from "./sovos-theme";
import routes from './routes';
import AppContainer from './containers/app/AppContainer';

ReactDOM.render(
  <SovosThemeProvider theme={SovosTheme}>
    <AppContainer routes={ routes } store={ store } />
    </SovosThemeProvider>
  , document.getElementById('root'));
registerServiceWorker();
