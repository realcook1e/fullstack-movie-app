import { Link, NavLink } from "react-router-dom";
import styles from "./Menu.module.scss";

const Menu = ({ items, inHeader, style }) => {
	return (
		<ul className={styles.menu}>
			{items.map((item, index) => (
				<li
					key={index}
					className={styles.menu__item}
					style={style}
				>
					{inHeader ? (
						<NavLink to={item.link}>{item.title}</NavLink>
					) : (
						<Link to={item.link}>{item.title}</Link>
					)}
				</li>
			))}
		</ul>
	);
};

export default Menu;
