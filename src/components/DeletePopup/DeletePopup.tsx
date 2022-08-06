import { useState } from "react";
import { DeleteOutline } from "@material-ui/icons";
//Redux
import { useDispatch } from "react-redux";
// import { deleteComment } from "../../redux/actions/dataActions";
import { Dialog } from "@material-ui/core";

interface Props {
	postId?: string;
	commentId?: string;
	replyId?: string;
	deleteElement:
		| ((postId: string) => void)
		| ((postId: string, commentId: string) => void);
	text: string;
}

const DeleteComment = (props: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const dispatch = useDispatch();

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleDeleteComment = () => {
		if (props.postId && props.commentId)
			dispatch(props.deleteElement(props.postId, props.commentId));

		if (props.postId && !props.commentId)
			dispatch(props.deleteElement(props.postId, ""));

		if (props.commentId && props.replyId)
			dispatch(props.deleteElement(props.commentId, props.replyId));

		setOpen(false);
	};

	return (
		<>
			<button
				className="btn-popup-show"
				onClick={handleOpen}
				title="Delete Comment"
			>
				<DeleteOutline />
			</button>

			<Dialog open={open} onClose={handleClose}>
				<div className="popup-delete">
					<div className="popup__delete-inner">
						<div className="popup__delete-content">
							<h6>
								Are you sure you want to delete your{" "}
								{props.text}?
							</h6>
						</div>

						<div className="popup__delete-actions">
							<button
								className="btn btn--blue"
								onClick={handleClose}
							>
								Cancel
							</button>
							<button
								className="btn"
								onClick={handleDeleteComment}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default DeleteComment;
