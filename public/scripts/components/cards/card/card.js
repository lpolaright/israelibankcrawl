import "./card.scss";

const Card = ({headerText, children}) => {
	return (
		<div className="card">
			<div className="cardHeader">{headerText}</div>
			<div className="cardBody">{children}</div>
		</div>
	);
}

export default Card;