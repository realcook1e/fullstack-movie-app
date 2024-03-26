import { NavLink } from "react-router-dom";
import styles from "./Menu.module.scss";

const Menu = ({ items }) => {
	return (
		<ul className={styles.menu}>
			{items.map((item, index) => (
				<li
					key={index}
					className={styles.menu__item}
				>
					<NavLink to={item.link}>{item.title}</NavLink>
				</li>
			))}
		</ul>
	);
};

export default Menu;
