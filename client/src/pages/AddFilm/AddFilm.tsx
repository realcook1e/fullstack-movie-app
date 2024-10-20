import { FC } from "react";
import FilmForm from "../../components/FilmForm/FilmForm";
import styles from "./AddFilm.module.scss";

const AddFilm: FC = () => {
	return (
		<div className='container'>
			<h2 className={styles.title}>Добавить фильм</h2>

			<FilmForm type='add' />
		</div>
	);
};

export default AddFilm;
