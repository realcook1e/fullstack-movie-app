export interface IMenu {
	link: string;
	title: string;
}

export const MENU: IMenu[] = [
	{
		link: "/",
		title: "Главная",
	},
	{
		link: "/movies",
		title: "Фильмы",
	},
	{
		link: "/favorites",
		title: "Избранное",
	},
	{
		link: "/feedback",
		title: "Связаться",
	},
];
