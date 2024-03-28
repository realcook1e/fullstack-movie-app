import Slider from "react-slick";

import styles from "./MovieSlider.module.scss";
import MovieSliderItem from "../MovieSliderItem/MovieSliderItem";
import MovieFavoriteSliderItem from "../MovieFavoriteSliderItem/MovieFavoriteSliderItem";

const MovieSlider = props => {
	const { title, items, type } = props;

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: items?.length < 4 ? items?.length : 4,
		slidesToScroll: items?.length < 4 ? 0 : 4,
		initialSlide: 0,
		variableWidth: type === "favorites" ? true : false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: items?.length < 3 ? items?.length : 3,
					slidesToScroll: items?.length < 3 ? 0 : 3,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: items?.length < 2 ? items?.length : 2,
					slidesToScroll: items?.length < 2 ? 0 : 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className={styles.movieSlider}>
			<h3 className={styles.movieSlider__title}>{title}</h3>
			<div className='slider-container'>
				<Slider {...settings}>
					{items?.map((item, index) => {
						if (index < 9) {
							return type === "movies" ? (
								<MovieSliderItem
									key={item._id}
									item={item}
									type={type}
								/>
							) : (
								<MovieFavoriteSliderItem
									key={item}
									id={item}
								/>
							);
						}
					})}
				</Slider>
			</div>
		</div>
	);
};

export default MovieSlider;
