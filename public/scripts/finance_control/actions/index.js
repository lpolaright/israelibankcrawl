export const ADD_FINANCE_VALUE = 'ADD_FINANCE_VALUE';

export function addFinanceValue(person, financeProperty, value) {
	return {
		type: ADD_FINANCE_VALUE,
		person,
		financeProperty: value
	}
}