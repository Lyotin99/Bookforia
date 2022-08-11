import React, { useState } from "react";
import useReduxSelector from "../../hooks/useReduxSelector";
//MUI
import { Dialog } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
//Redux
import { useDispatch } from "react-redux";
import { cleanErrors } from "../../redux/actions/dataActions";

interface EditPostProps {
	elementId: string;
	body: string;
	text: string;
	editElement?: (postId: string, body: string) => void;
	editElementObject?: (postId: string, body: { body: string }) => void;
}

const EditPost = (props: EditPostProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const data = useReduxSelector();
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

		props.editElement &&
			dispatch(props.editElement(props.elementId, String(body)));

		props.editElementObject &&
			dispatch(
				props.editElementObject(props.elementId, { body: String(body) })
			);

		props.editElementObject &&
			dispatch(
				props.editElementObject(props.elementId, { body: String(body) })
			);

		String(body).trim() !== "" && handleClose();
	};

	const { errors } = data.UI;

	return (
		<>
			<div title={`Edit ${props.text}`}>
				<button onClick={handleOpen} className="button">
					<EditIcon />
				</button>
			</div>

			<Dialog open={open} onClose={handleClose}>
				<form className="form-edit" onSubmit={handleSubmit}>
					<div className="form__body">
						<div className="form__row">
							<div className="form__cols">
								<div className="form__col">
									<div className="form__label">
										<label htmlFor="body">
											Edit your {props.text}
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
