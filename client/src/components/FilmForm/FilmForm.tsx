import { FC, FormEvent, useRef, useState } from "react";
import { useAddMovieMutation } from "../../api/movies";
import { IAddMovieRequest } from "../../types/api.types";
import {
	isFetchBaseQueryError,
	isServerError,
} from "../../services/helpers";
import styles from "./FilmForm.module.scss";

interface FilmFormProps {
	type?: string;
}

const FilmForm: FC<FilmFormProps> = props => {
	const [upload, response] = useAddMovieMutation();

	const [file, setFile] = useState<File | null>(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [director, setDirector] = useState("");
	const [country, setCountry] = useState("");
	const [genre, setGenre] = useState("");
	const [casting, setCasting] = useState("");
	const [year, setYear] = useState("");

	const [duration, setDuration] = useState("");
	const [rating, setRating] = useState("");

	const [error, setError] = useState("");

	const inputRef = useRef<HTMLInputElement>(null);
	const successRef = useRef<HTMLParagraphElement>(null);

	const formSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		if (
			file &&
			title &&
			description &&
			director &&
			country &&
			genre &&
			casting &&
			year
		) {
			try {
				setError("");
				const formData = new FormData();
				formData.append("poster", file);
				formData.append("title", title);
				formData.append("description", description);
				formData.append("director", director);
				formData.append("country", country);
				formData.append("genre", genre);
				formData.append("casting", casting);
				formData.append("year", year);
				if (duration) formData.append("duration", duration);
				if (rating) formData.append("rating", rating);

				const req: IAddMovieRequest = Object.fromEntries(
					formData
				) as unknown as IAddMovieRequest;
				const res = await upload(req);
				console.log(res);
			} catch (e) {
				console.log(e);
			}
		} else {
			setError(
				`Поля "${!title ? "Название," : ""} ${!genre ? "Жанр," : ""} ${
					!country ? "Страна," : ""
				} ${!year ? "Год," : ""} ${!director ? "Режиссер," : ""} ${
					!casting ? "В ролях," : ""
				} ${!file ? "Постер," : ""} ${
					!description ? "Описание" : ""
				}" обязательны к заполнению`
			);
		}
	};

	const formResetHandler = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setTitle("");
		setDescription("");
		setFile(null);
		setDirector("");
		setCountry("");
		setGenre("");
		setCasting("");
		setYear("");
		setDuration("");
		setRating("");
		setError("");
		if (inputRef.current) inputRef.current.value = "";
	};

	return (
		<form
			method='post'
			className={styles.filmForm}
			onSubmit={formSubmitHandler}
			onReset={formResetHandler}
			encType='multipart/form-data'
		>
			<input
				type='text'
				name='title'
				className={styles.filmForm__input}
				placeholder='Название фильма'
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<input
				type='text'
				name='genre'
				className={styles.filmForm__input}
				placeholder='Жанр(ы)'
				value={genre}
				onChange={e => setGenre(e.target.value)}
			/>
			<input
				type='text'
				name='country'
				className={styles.filmForm__input}
				placeholder='Страна(ы)'
				value={country}
				onChange={e => setCountry(e.target.value)}
			/>
			<input
				type='number'
				name='year'
				className={styles.filmForm__input}
				placeholder='Год'
				value={year}
				onChange={e => setYear(e.target.value)}
			/>
			<input
				type='text'
				name='director'
				className={styles.filmForm__input}
				placeholder='Режиссер'
				value={director}
				onChange={e => setDirector(e.target.value)}
			/>
			<input
				type='text'
				name='casting'
				className={styles.filmForm__input}
				placeholder='В ролях'
				value={casting}
				onChange={e => setCasting(e.target.value)}
			/>
			<input
				type='number'
				min={1}
				max={10}
				step={0.1}
				name='rating'
				className={styles.filmForm__input}
				placeholder='Рейтинг'
				value={rating}
				onChange={e => setRating(e.target.value)}
			/>
			<input
				type='number'
				name='duration'
				className={styles.filmForm__input}
				placeholder='Продолжительность (в минутах)'
				value={duration}
				onChange={e => setDuration(e.target.value)}
			/>
			<div className={styles.filmForm__group}>
				<label
					className={styles.filmForm__label}
					htmlFor='poster'
				>
					Постер:
				</label>
				<input
					id='poster'
					type='file'
					name='poster'
					accept='image/*'
					className={styles.filmForm__file}
					onChange={e =>
						e.target.files ? setFile(e.target.files[0]) : setFile(null)
					}
					ref={inputRef}
				/>
			</div>
			<textarea
				placeholder='Описание фильма'
				rows={5}
				value={description}
				onChange={e => setDescription(e.target.value)}
			></textarea>
			{response.isError && !error && !response.isSuccess && (
				<p className={styles.filmForm__failure}>
					{isFetchBaseQueryError(response.error) &&
					isServerError(response.error.data)
						? response.error.data.message
						: "Неизвестная ошибка"}
				</p>
			)}
			{error && !response.isSuccess && !response.isError && (
				<p className={styles.filmForm__failure}>{error}</p>
			)}
			{response.isSuccess && !error && !response.isError && (
				<p
					className={styles.filmForm__success}
					ref={successRef}
				>
					Фильм добавлен в базу
				</p>
			)}
			<div className={styles.filmForm__group}>
				<button
					type='submit'
					className={styles.btnSend}
				>
					Добавить
				</button>
				<button
					type='reset'
					className={styles.btnReset}
				>
					Сбросить
				</button>
			</div>
		</form>
	);
};

export default FilmForm;
