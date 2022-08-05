import { Component } from "react";
import BookSpinner from "../../photos/bookSpinner.svg";
import SliderBooks from "../../components/SliderBooks/SliderBooks";
import FormBooks from "../../components/FormBooks/FormBooks";

class BooksLibrary extends Component {
	state = {
		books: [],
		reviewedBooksPaperback: [],
		reviewedBooksNonFictional: [],
		reviewedBooksFictional: [],
		bookSearchFilter: "",
		formIsClicked: false,
	};

	componentDidMount() {
		let apiKey = "QyzWBJom9uRSHkNkVZvMT5xLnnjRqPgV";
		fetch(
			"https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?&api-key=" +
				apiKey,
			{ method: "get" }
		)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				if (json.results)
					this.setState({
						reviewedBooksFictional: json.results.books,
					});
			});
		fetch(
			"https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?&api-key=" +
				apiKey,
			{ method: "get" }
		)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				if (json.results)
					this.setState({
						reviewedBooksNonFictional: json.results.books,
					});
			});
		fetch(
			"https://api.nytimes.com/svc/books/v3/lists/current/paperback-nonfiction.json?&api-key=" +
				apiKey,
			{ method: "get" }
		)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				if (json.results)
					this.setState({
						reviewedBooksPaperback: json.results.books,
					});
			});
	}

	render() {
		let handleFormSubmitted = (isClicked: boolean) => {
			if (isClicked) {
				return this.setState({
					formIsClicked: true,
				});
			}
		};

		const reviewedBooksMarkup = (
			<SliderBooks reviewedBooks={this.state.reviewedBooksFictional} />
		);
		const reviewedBooksNonFictional = (
			<SliderBooks reviewedBooks={this.state.reviewedBooksNonFictional} />
		);
		const reviewedBooksPaperback = (
			<SliderBooks reviewedBooks={this.state.reviewedBooksPaperback} />
		);

		let booksFetched =
			this.state.reviewedBooksFictional.length > 0 &&
			this.state.reviewedBooksNonFictional.length > 0 &&
			this.state.reviewedBooksPaperback.length > 0;

		return (
			<div className="section-sliders">
				<div className="shell">
					<div className="section__inner">
						<div className="section__search-books">
							<FormBooks
								handleFormSubmitted={handleFormSubmitted}
							/>
						</div>

						{!this.state.formIsClicked ? (
							booksFetched ? (
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

										{reviewedBooksPaperback}
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
	}
}

export default BooksLibrary;
