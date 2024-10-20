import { useParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import Comments from "../../components/Comments/Comments";
import { FC } from "react";

const MovieDetails: FC = () => {
	const { id } = useParams();
	return (
		<div className='container'>
			{id && (
				<>
					<MovieCard movieId={id} />
					<Comments movieId={id} />
				</>
			)}
		</div>
	);
};

export default MovieDetails;
