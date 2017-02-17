// import {FinancialStateController} from "financial_state/financialStateController";
// import {StatusFetchingService} from "services/statusFetchingService";
 
import React from 'react';
import ReactDOM from 'react-dom';
// import {MuiThemeProvider} from 'material-ui /styles     /MuiThemeProvider'; 

const App = () => (
  <div>
    <div>Hello world</div>
  </div>
); 
//  asdasd          

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

// let statusFetchingService = new StatusFetchingService();        
// let financialStateController = new FinancialStateController(statusFetchingService);  
// financialStateController.bindFetchingStatusForBank(jQuery('.bhp-get-status'), jQuery('.bhp-status-panel'), "BankHapoalim");
// financialStateController.bindFetchingStatusForBank(jQuery('.dis-get-status'), jQuery('.dis-status-panel'), "BankDiscount");    