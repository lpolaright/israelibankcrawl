import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import './financeControl.scss';  
    
import Card from '../components/cards/card/card';
import TextField from '../components/inputs/TextField/textField';

import store from './store.js'; 

const App = () => (
  <Card headerText="Input your current financial situation: ">
    <div>{console.log(store.getState('people'))}</div>
    <TextField type="text" placeholderText="BankHapoalim (p1) Total"/>
    <TextField type="text" placeholderText="BankHapoalim (p1) Credit"/>
    <TextField type="text" placeholderText="Discount Bank (p2) Total"/>
    <TextField type="text" placeholderText="Discount Bank (p2) Credit"/>
    <TextField type="text" placeholderText="FlyCard (p1) Credit"/>
    <TextField type="text" placeholderText="FlyCard (p2) Credit"/>
    <TextField type="text" placeholderText="Leumi (p1) Credit"/>
    <TextField type="text" placeholderText="Lifestyle (p2) Credit"/>
    <TextField type="text" placeholderText="Corporate (p1) Credit"/>
    <TextField type="text" placeholderText="Other (p1) Credit"/>
    <TextField type="text" placeholderText="Other (p2) Credit"/>
  </Card>
); 
//  asdasd                

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);