import './financeButton.scss';

const FinanceButton = ({onClick, buttonText}) => {
	return <button className="financeButton" onClick={onClick}>{buttonText}</button>
}

export default FinanceButton;