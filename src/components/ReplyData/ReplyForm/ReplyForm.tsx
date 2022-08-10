import { Link } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { PostReply } from "../../../redux/actions/replyActions";
//Interfaces
import { UserData } from "../../../utils/postInterfaces";
import { ReplyDataForm } from "../../CommentData/CommentsListing/CommentsListInterfaces";

interface MapStateToProps {
	user: UserData;
}

const ReplyForm = (props: { commentId: string }) => {
	const mapStateToProps = (state: MapStateToProps) => ({
		user: state.user,
	});

	const data = useSelector(mapStateToProps);
	const dispatch = useDispatch();
	const { credentials } = data.user;

	const handleSubmitReplyInput = (
		event: React.ChangeEvent<HTMLFormElement>
	) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const body = formData.get("body");

		let reply: ReplyDataForm = {
			body: String(body),
		};

		dispatch(PostReply(props.commentId, reply));

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
