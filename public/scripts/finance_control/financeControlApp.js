import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import './financeControl.scss';

import FinanceCard from '../components/cards/FinanceCard/financeCard';

import store from './store.js';

const App = () => (
  <FinanceCard personName="Daniel" />
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);