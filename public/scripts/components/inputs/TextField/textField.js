import './textField.scss';

const TextField = ({placeholderText, type, onBlur}) => {
	return (
		<input className="textField" type={type} placeholder={placeholderText} onBlur={onBlur}/>
	);
}

export default TextField;