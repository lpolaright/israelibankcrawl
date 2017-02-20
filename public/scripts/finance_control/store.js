import { createStore } from 'redux';
import financeControlReducer from './reducers/index';
import {addFinanceValue} from './actions/index';

let store = createStore(financeControlReducer);

store.dispatch(addFinanceValue('daniel', 'BankHapoalim', 3000));

export default store;