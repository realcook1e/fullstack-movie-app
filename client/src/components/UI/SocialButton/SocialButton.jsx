import styles from "./SocialButton.module.scss";

const SocialButton = ({ children, href }) => {
	return (
		<a
			className={styles.socialBtn}
			href={href}
		>
			{children}
		</a>
	);
};

export default SocialButton;
