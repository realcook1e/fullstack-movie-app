import FilmForm from "../../components/FilmForm/FilmForm";
import styles from "./AddFilm.module.scss";

const AddFilm = () => {
	return (
		<div className='container'>
			<h2 className={styles.title}>Обратная связь</h2>
			<FilmForm type='add' />
		</div>
	);
};

export default AddFilm;
