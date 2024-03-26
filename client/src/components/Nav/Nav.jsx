import Menu from "../Menu/Menu";
import logo from "../../assets/img/Logo.svg";
import styles from "./Nav.module.scss";
import HeaderControls from "../HeaderControls/HeaderControls";

const Nav = ({ menu, hasLogo, isHeader }) => {
	return (
		<nav className={styles.navigation}>
			{hasLogo && (
				<div className={styles.logo}>
					<img
						src={logo}
						alt='Logo'
						width={199}
						height={60}
					/>
				</div>
			)}
			{menu && (
				<Menu
					items={menu}
					inHeader={true}
					style={{ fontSize: "18px", fontWeight: "700" }}
				/>
			)}
			{isHeader && <HeaderControls />}
		</nav>
	);
};

export default Nav;
