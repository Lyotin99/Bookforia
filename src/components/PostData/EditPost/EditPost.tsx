import React, { useState } from "react";
//MUI
import { Dialog, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { cleanErrors, editPost } from "../../../redux/actions/dataActions";
interface ErrorsData {
	errors: { error: string };
	loading: boolean;
}

interface MapStateToPropsData {
	UI: ErrorsData;
}
interface EditPostProps {
	postId: string;
	body: string;
}

const EditPost = (props: EditPostProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const mapStateToProps = (state: MapStateToPropsData) => ({
		UI: state.UI,
	});
	const data = useSelector(mapStateToProps);
	const dispatch = useDispatch();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		dispatch(cleanErrors());
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const body = formData.get("body");

		dispatch(editPost(props.postId, String(body)));

		String(body).trim() !== "" && handleClose();
	};

	const { errors } = data.UI;

	return (
		<>
			<div title="Edit post">
				<IconButton onClick={handleOpen} className="button">
					<EditIcon color="primary" fontSize="small" />
				</IconButton>
			</div>

			<Dialog open={open} onClose={handleClose}>
				<form className="form-edit" onSubmit={handleSubmit}>
					<div className="form__body">
						<div className="form__row">
							<div className="form__cols">
								<div className="form__col">
									<div className="form__label">
										<label htmlFor="body">
											Edit your post
										</label>
									</div>

									<div className="form__controls">
										<input
											id="body"
											name="body"
											placeholder="Edit your comment"
											defaultValue={props.body}
										/>

										<p className="form__login-error">
											{errors ? errors.error : ""}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="form__actions">
						<button
							className="btn"
							onClick={handleClose}
							type="button"
						>
							Cancel
						</button>

						<button className="btn btn--blue" type="submit">
							Save
						</button>
					</div>
				</form>
			</Dialog>
		</>
	);
};

export default EditPost;
