import React, { useState } from "react";
import useReduxSelector from "../../../hooks/useReduxSelector";
//MUI
import { Dialog } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
//Redux
import { useDispatch } from "react-redux";
import { editUserDetails } from "../../../redux/actions/userActions";

const EditDetails = () => {
	const [open, setOpen] = useState<boolean>(false);
	const data = useReduxSelector();
	const dispatch = useDispatch();
	const {
		user: {
			credentials: {
				bio,
				website,
				location,
				favoriteBooks,
				favoriteQuote,
			},
		},
	} = data;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const bio = String(formData.get("bio"));
		const website = String(formData.get("website"));
		const location = String(formData.get("location"));
		const favoriteBooks = String(formData.get("favoriteBooks"));
		const favoriteQuote = String(formData.get("favoriteQuote"));

		dispatch(
			editUserDetails({
				bio,
				website,
				location,
				favoriteBooks,
				favoriteQuote,
			})
		);
		handleClose();
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div title="Edit details">
				<button onClick={handleOpen} className="button">
					<EditIcon color="primary" />
				</button>
			</div>
			<Dialog open={open} onClose={handleClose}>
				<form className="form-edit" onSubmit={handleSubmit}>
					<div className="form__body">
						<div className="form__row">
							<div className="form__cols">
								<div className="form__col">
									<div className="form__label">
										<label htmlFor="bio">Bio</label>
									</div>

									<div className="form__controls">
										<input
											type="text"
											name="bio"
											id="bio"
											defaultValue={bio}
											placeholder="A short bio about yourself"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="form__row">
							<div className="form__cols">
								<div className="form__col">
									<div className="form__label">
										<label htmlFor="website">Website</label>
									</div>

									<div className="form__controls">
										<input
											type="text"
											name="website"
											id="website"
											defaultValue={website}
											placeholder="Your personal/professional website"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="form__row">
							<div className="form__cols">
								<div className="form__col">
									<div className="form__label">
										<label htmlFor="location">
											Location
										</label>
									</div>

									<div className="form__controls">
										<input
											type="text"
											name="location"
											id="location"
											defaultValue={location}
											placeholder="Where do you live?"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="form__row">
							<div className="form__cols">
								<div className="form__col">
									<div className="form__label">
										<label htmlFor="favoriteBooks">
											Favorite Books
										</label>
									</div>

									<div className="form__controls">
										<input
											type="text"
											name="favoriteBooks"
											id="favoriteBooks"
											defaultValue={favoriteBooks}
											placeholder="What is/are your favorite book/s"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="form__row">
							<div className="form__cols">
								<div className="form__col">
									<div className="form__label">
										<label htmlFor="favoriteQuote">
											Favorite Quote
										</label>
									</div>

									<div className="form__controls">
										<input
											type="text"
											name="favoriteQuote"
											id="favoriteQuote"
											defaultValue={favoriteQuote}
											placeholder="What is your favorite quote?"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="form__actions">
						<button
							type="button"
							className="btn btn--blue"
							onClick={handleClose}
						>
							Cancel
						</button>

						<button type="submit" className="btn">
							Save
						</button>
					</div>
				</form>
			</Dialog>
		</>
	);
};

export default EditDetails;
