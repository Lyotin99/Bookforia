import { useState, useEffect } from "react";
import BookSpinner from "../../photos/bookSpinner.svg";
import SliderBooks from "../../components/SliderBooks/SliderBooks";
import FormBooks from "../../components/FormBooks/FormBooks";
import booksService from "../../services/booksService";
import { NYTimesBook } from "../../utils/Interfaces";

const BooksLibrary = () => {
	const [reviewedBooksFiction, setReviewedBooksFiction] = useState<
		NYTimesBook[]
	>([]);
	const [reviewedBooksNonFiction, setReviewedBooksNonFiction] = useState<
		NYTimesBook[]
	>([]);
	const [reviewedBooksPaperback, setReviewedBooksPaperBack] = useState<
		NYTimesBook[]
	>([]);
	const [formIsClicked, setFormIsClicked] = useState<boolean>(false);

	useEffect(() => {
		const hardcoverFiction = booksService("hardcover-fiction");
		const hardcoverNonFiction = booksService("hardcover-nonfiction");
		const paperbackNonFiction = booksService("paperback-nonfiction");

		hardcoverFiction.then((data) => {
			setReviewedBooksFiction(data);
		});

		hardcoverNonFiction.then((data) => {
			setReviewedBooksNonFiction(data);
		});

		paperbackNonFiction.then((data) => {
			setReviewedBooksPaperBack(data);
		});
	}, []);

	let handleFormSubmitted = (isClicked: boolean) => {
		if (isClicked) {
			setFormIsClicked(true);
		}
	};

	const reviewedBooksMarkup = (
		<SliderBooks reviewedBooks={reviewedBooksFiction} />
	);
	const reviewedBooksNonFictional = (
		<SliderBooks reviewedBooks={reviewedBooksNonFiction} />
	);
	const reviewedBooksPaperbackNonfiction = (
		<SliderBooks reviewedBooks={reviewedBooksPaperback} />
	);

	let allCategoriesFetched =
		reviewedBooksFiction.length > 0 &&
		reviewedBooksNonFiction.length > 0 &&
		reviewedBooksPaperback.length > 0;

	return (
		<div className="section-sliders">
			<div className="shell">
				<div className="section__inner">
					<div className="section__search-books">
						<FormBooks handleFormSubmitted={handleFormSubmitted} />
					</div>

					{!formIsClicked ? (
						allCategoriesFetched ? (
							<div className="section__sliders">
								<div className="section__slider">
									<h2>Hardcover Fiction</h2>

									{reviewedBooksMarkup}
								</div>

								<div className="section__slider">
									<h2>Hardcover non-fiction</h2>

									{reviewedBooksNonFictional}
								</div>

								<div className="section__slider">
									<h2>Paperback non-fictional</h2>

									{reviewedBooksPaperbackNonfiction}
								</div>
							</div>
						) : (
							<img
								className="spinner"
								src={BookSpinner}
								alt="Book Spinner"
							/>
						)
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default BooksLibrary;
