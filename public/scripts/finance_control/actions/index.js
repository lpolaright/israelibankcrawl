export const ADD_FINANCE_VALUE = 'ADD_FINANCE_VALUE';

export function addFinanceValue(person, financeProperty, financeValue) {
	return {
		type: ADD_FINANCE_VALUE,
		person,
		financeProperty,
		financeValue
	}
}