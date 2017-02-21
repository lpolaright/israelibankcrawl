import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import './financeControl.scss';

import FinanceCard from '../components/cards/FinanceCard/financeCard';

import store from './store.js';

const App = () => (
  <div className="financeControl">
    <FinanceCard personName="Daniel" />
    <FinanceCard personName="Alina" />
  </div>
); 

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);