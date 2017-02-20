import React from 'react';
import ReactDOM from 'react-dom';
 
import './financeControl.scss';  
    
import Card from '../components/cards/card/card';
     
const App = () => (
  <Card headerText="Input your current financial situation: ">
    <div>Hello world</div>
  </Card>
); 
//  asdasd                

ReactDOM.render(
  <App />,
  document.getElementById('app')
);