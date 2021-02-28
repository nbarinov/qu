import './styles/styles.css';
import React from 'react';
import { render } from 'react-dom';
import { Reducer } from './Reducer';
import { App } from './App';

render(
  <Reducer>
    <App />
  </Reducer>,
  document.getElementById('root')
);
