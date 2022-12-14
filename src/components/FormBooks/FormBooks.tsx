import { axiosGet } from "../../services/axiosServices";
import { useState } from "react";
import NoBookCoverImg from "../../photos/NoBookCover.jpg";

interface FormBooksProps {
	handleFormSubmitted: (istrue: boolean) => void;
}

const FormBooks = (props: FormBooksProps) => {
	const [error, setError] = useState<boolean>(false);
	const [books, setBooks] = useState([]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const searchBar = String(formData.get("searchBar"));

		if (searchBar.trim() !== "") {
			props.handleFormSubmitted(true);
			const url = `https://www.googleapis.com/books/v1/volumes?q=+:${searchBar}&printType=books&maxResults=20`;

			axiosGet(url).then((data) => {
				setBooks(data.items);
			});
		} else setError(true);
	};

	const booksMarkup = books.map((book: any, index) => {
		const { volumeInfo } = book;

		return (
			<div className="card-horizontal" key={index}>
				<div className="card__horizontal-img">
					{book.volumeInfo.imageLinks ? (
						<a
							href={volumeInfo.previewLink}
							target="_blank"
							rel="noreferrer"
						>
							{" "}
							<img
								src={book.volumeInfo.imageLinks.thumbnail}
								alt="No cover"
							/>
						</a>
					) : (
						<a
							href={volumeInfo.previewLink}
							target="_blank"
							rel="noreferrer"
						>
							<img src={NoBookCoverImg} alt="No cover" />
						</a>
					)}
				</div>

				<div className="card__horizontal-content">
					<ul>
						<li>
							<strong>Title: </strong> {volumeInfo.title}
						</li>

						<li>
							{" "}
							<strong>Authors: </strong>
							{volumeInfo.authors
								? volumeInfo.authors.join()
								: "No authors found"}
						</li>

						<li>
							{" "}
							<strong>Category: </strong>
							{volumeInfo.categories
								? volumeInfo.categories
								: "No category"}
						</li>

						<li>
							<strong>Published: </strong>
							{volumeInfo.publishedDate
								? volumeInfo.publishedDate
								: "No published date found"}
						</li>

						<li>
							{" "}
							<strong>Number of pages: </strong>
							{volumeInfo.pageCount
								? volumeInfo.pageCount
								: "No page count available"}
						</li>

						<li>
							{" "}
							<strong>Description: </strong>{" "}
							{volumeInfo.description
								? volumeInfo.description.trim()
								: "No description available"}
						</li>
					</ul>
				</div>
			</div>
		);
	});

	return (
		<>
			<div className="form-search-books">
				<form onSubmit={handleSubmit}>
					<div className="form__body">
						<input
							type="text"
							name="searchBar"
							placeholder="Search for book titles"
						/>

						<span className="form_search-error">
							{error ? "The field is empty" : ""}
						</span>
					</div>

					<div className="form__actions">
						<button className="btn">Submit</button>
					</div>
				</form>
			</div>

			<div className="cards-horizontal">{booksMarkup}</div>
		</>
	);
};

export default FormBooks;
