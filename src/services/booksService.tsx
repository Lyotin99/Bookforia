const getBooks = async (category: string) => {
	let apiKey = "QyzWBJom9uRSHkNkVZvMT5xLnnjRqPgV";

	const getData = await fetch(
		`https://api.nytimes.com/svc/books/v3/lists/current/${category}.json?&api-key=${apiKey}`,
		{ method: "get" }
	)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data.results) return data.results.books;
		})
		.catch((err) => {
			console.error(err);
		});

	return getData;
};

export default getBooks;
