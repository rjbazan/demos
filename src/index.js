import React from 'react';
import ReactDOM from 'react-dom';
import { SovosThemeProvider } from 's1-ui';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import SovosTheme from "./sovos-theme";

ReactDOM.render(<SovosThemeProvider theme={ SovosTheme }><App /></SovosThemeProvider>, document.getElementById('root'));
registerServiceWorker();
