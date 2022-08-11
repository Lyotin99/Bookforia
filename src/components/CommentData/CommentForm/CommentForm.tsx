import { submitComment } from "../../../redux/actions/commentActions";
import useReduxSelector from "../../../hooks/useReduxSelector";
//Redux
import { useDispatch } from "react-redux";

const CommentForm = (props: { postId: string }) => {
	const data = useReduxSelector();
	const dispatch = useDispatch();
	const {
		user,
		UI,
		data: { post },
	} = data;

	const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const name = formData.get("body");

		dispatch(
			submitComment(props.postId, {
				body: String(name),
			})
		);

		post && post.commentCount++;
		event.currentTarget.reset();
	};

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
