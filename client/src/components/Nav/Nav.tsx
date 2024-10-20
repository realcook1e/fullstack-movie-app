import { FC } from "react";
import Menu from "../Menu/Menu";
import logo from "../../assets/img/Logo.svg";
import HeaderControls from "../HeaderControls/HeaderControls";
import styles from "./Nav.module.scss";
import { IMenu } from "../../constants/menu";

interface NavProps {
	menu: IMenu[];
	hasLogo: boolean;
	isHeader: boolean;
}

const Nav: FC<NavProps> = ({ menu, hasLogo, isHeader }) => {
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
