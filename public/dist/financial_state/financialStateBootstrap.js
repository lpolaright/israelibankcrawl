(function (React,ReactDOM) {
'use strict';

React = 'default' in React ? React['default'] : React;
ReactDOM = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

// import {FinancialStateController} from "financial_state/financialStateController";
// import {StatusFetchingService} from "services/statusFetchingService";

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; 

const App = () => React.createElement(
  'div',
  null,
  React.createElement(
    'div',
    null,
    'Hello world'
  )
);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

// let statusFetchingService = new StatusFetchingService();        
// let financialStateController = new FinancialStateController(statusFetchingService);  
// financialStateController.bindFetchingStatusForBank(jQuery('.bhp-get-status'), jQuery('.bhp-status-panel'), "BankHapoalim");
// financialStateController.bindFetchingStatusForBank(jQuery('.dis-get-status'), jQuery('.dis-status-panel'), "BankDiscount");

}(React,ReactDOM));
