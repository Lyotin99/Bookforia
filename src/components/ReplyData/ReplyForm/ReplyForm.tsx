import { Link } from "react-router-dom";
import useReduxSelector from "../../../hooks/useReduxSelector";
//Redux
import { useDispatch } from "react-redux";
import { PostReply } from "../../../redux/actions/replyActions";

const ReplyForm = (props: { commentId: string }) => {
	const data = useReduxSelector();
	const dispatch = useDispatch();
	const { credentials } = data.user;

	const handleSubmitReplyInput = (
		event: React.ChangeEvent<HTMLFormElement>
	) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const body = formData.get("body");

		dispatch(PostReply(props.commentId, { body: String(body) }));

		event.currentTarget.reset();
	};

	return (
		<div className="form-replies">
			<div className="form__replies-img">
				<Link to={`/users/${credentials.username}`}>
					<img
						src={credentials.imageUrl}
						alt={credentials.username}
					/>
				</Link>
			</div>

			<div className="form__replies-form">
				<form onSubmit={handleSubmitReplyInput}>
					<input
						type="text"
						name="body"
						placeholder="Write your reply here..."
					/>

					<p className="form__reply-error"></p>

					<p className="form__reply-helper-text">
						<em>Press enter to send message</em>
					</p>
				</form>
			</div>
		</div>
	);
};

export default ReplyForm;
