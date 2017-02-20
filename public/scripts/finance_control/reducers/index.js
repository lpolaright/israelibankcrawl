import { ADD_FINANCE_VALUE } from '../actions/index';

const initialState = {
	people: [
		{
			name: 'daniel',
			finance: {
				BankHapoalim: 0,
				BankDiscount: 0,
				LeumiCredit: 0,
				LifestyleCredit: 0,
				FlycardCredit: 0,
				CorporateCredit: 0,
				Other: 0,
			}
		},
		{
			name: 'alina',
			finance: {
				BankHapoalim: 0,
				BankDiscount: 0,
				LeumiCredit: 0,
				LifestyleCredit: 0,
				FlycardCredit: 0,
				CorporateCredit: 0,
				Other: 0,
			}
		}
	],

}

function people(state = initialState, action) {
	switch (action.type) {
		case ADD_FINANCE_VALUE:
			return Object.assign({}, state, {
				people: state.people.map((person) => {
					if (person.name === action.person) {
						let personCopy = Object.assign({}, person);
						personCopy.finance[action.financeProperty] = action.financeValue;
						return personCopy;
					} else {
						return person;
					}
				})
			});
			break;
		default:
			return state;
	}
}

const financeControlReducer = function reducer(state = {}, action) {
	return {
		people: people(state.people, action)
	};
}

export default financeControlReducer;