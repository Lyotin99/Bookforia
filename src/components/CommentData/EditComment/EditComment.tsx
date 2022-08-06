import React, { useState } from "react";
import { editComment, cleanErrors } from "../../../redux/actions/dataActions";
//MUI
import { Dialog } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
//Redux
import { useSelector, useDispatch } from "react-redux";

interface mapStateToPropsData {
	UI: { errors: { error: string } };
}
interface Props {
	commentId: string;
	body: string;
}

const EditComment = (props: Props) => {
	const [open, setOpen] = useState<boolean>(false);

	const mapStateToProps = (state: mapStateToPropsData) => ({
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
		const body = String(formData.get("body"));

		dispatch(editComment(props.commentId, { body }));

		if (body !== "") {
			console.log(body);
			handleClose();
		}
	};

	const { errors } = data.UI;

	return (
		<>
			<button
				className="btn-popup-show"
				onClick={handleOpen}
				title="Edit Comment"
			>
				<EditIcon />
			</button>

			<Dialog open={open} onClose={handleClose}>
				<form className="form-edit" onSubmit={handleSubmit}>
					<div className="form__body">
						<div className="form__row">
							<div className="form__cols">
								<div className="form__col">
									<div className="form__label">
										<label htmlFor="body">
											Edit your comment
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
						<button className="btn" onClick={handleClose}>
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

export default EditComment;
