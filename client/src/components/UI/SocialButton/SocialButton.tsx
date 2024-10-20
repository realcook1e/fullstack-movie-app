import { ComponentPropsWithoutRef, FC } from "react";
import styles from "./SocialButton.module.scss";

const SocialButton: FC<ComponentPropsWithoutRef<"a">> = ({
	children,
	href,
}) => {
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
