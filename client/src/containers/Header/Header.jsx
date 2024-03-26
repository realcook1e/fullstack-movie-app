import Nav from "../../components/Nav/Nav";
import { MENU } from "../../constants/menu";
import styles from "./Header.module.scss";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className='container'>
				<Nav
					menu={MENU}
					hasLogo={true}
					isHeader={true}
				/>
			</div>
		</header>
	);
};

export default Header;
