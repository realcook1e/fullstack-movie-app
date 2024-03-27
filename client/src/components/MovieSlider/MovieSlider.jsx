import Slider from "react-slick";

import styles from "./MovieSlider.module.scss";
import MovieSliderItem from "../MovieSliderItem/MovieSliderItem";

const MovieSlider = props => {
	const { title, items } = props;

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
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
							return (
								<MovieSliderItem
									key={item._id}
									item={item}
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
