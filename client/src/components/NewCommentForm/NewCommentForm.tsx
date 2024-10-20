import { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./NewCommentForm.module.scss";
import { useAddCommentMutation } from "../../api/reviews";
import {
	isFetchBaseQueryError,
	isServerError,
} from "../../services/helpers";

interface NewCommentFormProps {
	movieID: string;
	userID: string;
}

const NewCommentForm: FC<NewCommentFormProps> = ({ movieID, userID }) => {
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const [addComment, response] = useAddCommentMutation();

	const messageChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(evt.target.value);
	};

	const formResetHandler = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setMessage("");
	};

	const formSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		if (message) {
			try {
				setError("");
				const res = await addComment({
					movieID,
					userID,
					text: message,
					date: new Date().toString(),
				});
				console.log(res);
			} catch (e) {
				console.log(e);
			}
		} else {
			setError("Введите текст комментария");
		}
	};

	return (
		<form
			className={styles.commentForm}
			onSubmit={formSubmitHandler}
			onReset={formResetHandler}
		>
			<textarea
				className={styles.commentForm__message}
				placeholder='Текст комментария'
				rows={5}
				value={message}
				onChange={messageChangeHandler}
			></textarea>
			{response.isError && !error && !response.isSuccess && (
				<p className={styles.commentForm__failure}>
					{isFetchBaseQueryError(response.error) &&
					isServerError(response.error.data)
						? response.error.data.message
						: "Непредвиденная ошибка"}
				</p>
			)}
			{error && !response.isSuccess && !response.isError && (
				<p className={styles.commentForm__failure}>{error}</p>
			)}
			{response.isSuccess && !error && !response.isError && (
				<p className={styles.commentForm__success}>Комментарий добавлен</p>
			)}
			<div className={styles.commentForm__group}>
				<button
					type='submit'
					className={styles.btnSend}
				>
					Отправить
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

export default NewCommentForm;
