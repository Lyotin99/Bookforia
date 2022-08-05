import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Pagination, Navigation } from "swiper";

//Styles
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";

export default function SliderBooks(props: any) {
	const NYTimes = (
		index: number,
		book_image: string,
		title: string,
		author: string,
		rank: number,
		rank_last_week: number,
		weeks_on_list: number,
		description: string
	) => {
		return (
			<div className="card">
				<div className="card__img">
					<img src={book_image} alt="No cover" />
				</div>

				<div className="card__content">
					<ul>
						<li>
							<strong>Title: </strong> {title}
						</li>

						<li>
							<strong>Authors: </strong> {author}
						</li>

						<li>
							<strong>Rank: </strong> {rank}
						</li>

						<li>
							<strong>Rank last week: </strong>{" "}
							{rank_last_week !== 0 ? rank_last_week : "N/A"}
						</li>

						<li>
							<strong>Weeks on the list: </strong> {weeks_on_list}
						</li>

						<li>
							<strong>Description: </strong> {description}
						</li>
					</ul>
				</div>
			</div>
		);
	};

	return (
		<Swiper
			pagination={{
				type: "fraction",
				el: ".swiper-pagination",
			}}
			slidesPerView={3}
			spaceBetween={20}
			slidesPerGroup={3}
			allowTouchMove={false}
			effect={"fade"}
			navigation={{
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			}}
			modules={[Pagination, Navigation]}
			className="slider-books"
		>
			{props.reviewedBooks.map((book: any, index: number) => {
				const {
					book_image,
					author,
					description,
					rank,
					rank_last_week,
					weeks_on_list,
					title,
				} = book;

				return (
					<SwiperSlide key={rank}>
						{NYTimes(
							index,
							book_image,
							title,
							author,
							rank,
							rank_last_week,
							weeks_on_list,
							description
						)}
					</SwiperSlide>
				);
			})}

			<div className="swiper-actions">
				<div className="swiper-button-prev"></div>

				<div className="swiper-pagination"></div>

				<div className="swiper-button-next"></div>
			</div>
		</Swiper>
	);
}
