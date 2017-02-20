import React from 'react';
import ReactDOM from 'react-dom';
 
import './financeControl.scss';  
    
import Card from '../components/cards/card/card';
import TextField from '../components/inputs/TextField/textField';
         
const App = () => (
  <Card headerText="Input your current financial situation: ">
    <TextField type="text" placeholderText="Label here"/>
  </Card>
); 
//  asdasd                

ReactDOM.render(
  <App />,
  document.getElementById('app')
);