import { createStore } from 'redux';
import { reducer } from './reducer';
import App from './app.jsx';

import Calculator from './calculator.jsx';
import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(
  <App store={createStore(reducer)}>
    <Calculator />
  </App>,
  document.getElementById('calculator')
);
