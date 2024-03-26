import styles from "./Button.module.scss";

const Button = props => {
	const { className: classNameProp, children, ...otherProps } = props;
	const className = classNameProp === "primary" ? styles.primary : styles.secondary;
	return (
		<button
			{...otherProps}
			className={className}
		>
			{children}
		</button>
	);
};

export default Button;
