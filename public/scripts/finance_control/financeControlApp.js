import React from 'react';
import ReactDOM from 'react-dom';

import './financeControl.scss';  
    
import Card from '../components/cards/card/card';
import TextField from '../components/inputs/TextField/textField';
         
const App = () => (
  <Card headerText="Input your current financial situation: ">
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

ReactDOM.render(
  <App />,
  document.getElementById('app')
);