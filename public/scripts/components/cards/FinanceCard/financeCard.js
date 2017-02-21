import './financeCard.scss';

import Card from '../card/card';
import FinanceButton from '../../buttons/FinanceButton/financeButton';
import TextField from '../../inputs/TextField/textField';

const FinanceCard = ({personName}) => {
	let headerText = "Input the current financials for " + personName + ":";
	return (
		<div className="financeCard">
			<Card headerText={headerText}>
				<TextField type="text" placeholderText="BankHapoalim Total" />
				<TextField type="text" placeholderText="BankHapoalim Credit" />
				<TextField type="text" placeholderText="Discount Bank Total" />
				<TextField type="text" placeholderText="Discount Bank Credit" />
				<TextField type="text" placeholderText="FlyCard Credit" />
				<TextField type="text" placeholderText="Leumi Credit" />
				<TextField type="text" placeholderText="Lifestyle Credit" />
				<TextField type="text" placeholderText="Corporate Credit" />
				<TextField type="text" placeholderText="Other Credit" />
				<FinanceButton onClick={() => console.log('awesome')} buttonText="Submit" />
			</Card>
		</div>
	);
}

export default FinanceCard;