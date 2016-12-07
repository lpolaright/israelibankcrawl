import {FinancialStateController} from "financial_state/financialStateController";
import {StatusFetchingService} from "services/statusFetchingService";
 
let statusFetchingService = new StatusFetchingService();        
let financialStateController = new FinancialStateController(statusFetchingService);  
financialStateController.bindFetchingStatusForBank(jQuery('.bhp-get-status'), jQuery('.bhp-status-panel'), "BankHapoalim");
financialStateController.bindFetchingStatusForBank(jQuery('.dis-get-status'), jQuery('.dis-status-panel'), "BankDiscount");  

//  D:\Web Projects\israelibankcrawl\public\scripts\financial_state\financialStateController.js
//  D:\Web Projects\israelibankcrawl\public\scripts\financial_state\financialStateController.es6.js   