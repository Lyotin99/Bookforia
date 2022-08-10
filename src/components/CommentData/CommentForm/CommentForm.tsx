import { submitComment } from "../../../redux/actions/commentActions";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Interfaces
import { CommentFormProps, StateToPropsData } from "./CommentFormInterfaces";

const CommentForm = (props: CommentFormProps) => {
	const mapStateToProps = (state: StateToPropsData) => ({
		UI: state.UI,
		user: state.user,
		post: state.data.post,
	});
	const data = useSelector(mapStateToProps);
	const dispatch = useDispatch();

	const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const name = formData.get("body");

		dispatch(
			submitComment(props.postId, {
				body: String(name),
			})
		);

		data.post && data.post.commentCount++;
		event.currentTarget.reset();
	};

	const { user, UI } = data;

	const commentFormMarkup =
		user && user.authenticated ? (
			<div className="form-comments">
				<form onSubmit={handleSubmit}>
					<div className="form__comments-body">
						<div className="form__comments-controls">
							<input
								type="text"
								name="body"
								placeholder="Comment on post..."
							/>

							<p className="form__comments-error">
								{UI?.errors && UI.errors.comment}
							</p>
						</div>
					</div>

					<div className="form__comments-actions">
						<p>
							<em>Press Enter to send your comment</em>
						</p>
					</div>
				</form>
			</div>
		) : (
			<></>
		);

	return commentFormMarkup;
};

export default CommentForm;
