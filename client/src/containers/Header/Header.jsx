import styles from "./Header.module.scss";

import Nav from "../../components/Nav/Nav";

const MENU = [
	{
		link: "/",
		title: "Главная",
	},
	{
		link: "/films",
		title: "Фильмы",
	},
	{
		link: "/actors",
		title: "Актеры",
	},
	{
		link: "/feedback",
		title: "Связаться",
	},
];

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
