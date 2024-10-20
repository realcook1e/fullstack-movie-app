import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaGoogle, FaInstagram } from "react-icons/fa6";
import { FC } from "react";
import Menu from "../../components/Menu/Menu";
import SocialButton from "../../components/UI/SocialButton/SocialButton";
import { MENU } from "../../constants/menu";
import styles from "./Footer.module.scss";

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className='container'>
				<div className={styles.footer__content}>
					<Menu items={MENU} />
					<div className={styles.footer__copyright}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
						pretium erat ut enim pretium volutpat a in ligula. Sed ut
						fermentum diam. Curabitur fermentum venenatis efficitur. Nullam
						ornare ut urna vitae fringilla. Interdum et malesuada fames ac
						ante ipsum primis in faucibus. Nulla tempor placerat lectus
						quis blandit. Curabitur tempor mauris ac semper aliquet.
					</div>
					<div className={styles.footer__socials}>
						<SocialButton href='#'>
							<FaFacebookF color='#fff' />
						</SocialButton>
						<SocialButton href='#'>
							<FaTwitter color='#fff' />
						</SocialButton>
						<SocialButton href='#'>
							<FaGoogle color='#fff' />
						</SocialButton>
						<SocialButton href='#'>
							<FaInstagram color='#fff' />
						</SocialButton>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
