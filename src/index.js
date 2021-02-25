import './index.css';

import React from 'react';
import { positions, Provider, transitions } from 'react-alert';
import ReactDOM from 'react-dom';

import App from './App';
import AlertTemplate from './Templates/react-alert-template-basic';

// optional configuration
const options = {
  position: positions.TOP_CENTER,
  timeout: 4000,
  offset: '30px',
  transition: transitions.FADE,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider template={AlertTemplate} {...options}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
