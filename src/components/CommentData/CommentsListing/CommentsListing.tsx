import { Link } from "react-router-dom";
import DeletePopup from "../../DeletePopup/DeletePopup";
import EditPopup from "../../EditPopup/EditPopup";
import CommentReply from "../../ReplyData/Reply/Reply";
//Dayjs
import dayjs from "dayjs";
//Redux
import { useSelector } from "react-redux";
import {
	deleteComment,
	editComment,
} from "../../../redux/actions/commentActions";
//Interfaces
import { DataPost, CommentsListingProps } from "./CommentsListInterfaces";
import { CommentsData } from "../../../utils/postInterfaces";

const CommentsListing = (props: CommentsListingProps) => {
	const mapStateToProps = (state: DataPost) => ({
		post: state.data.post,
		user: state.user,
	});
	const data = useSelector(mapStateToProps);

	const { comments } = props;

	return (
		<>
			{comments.map((comment: CommentsData, index) => {
				const {
					body,
					createdAt,
					userImage,
					username,
					commentId,
					repliesCount,
				} = comment;

				const deleteCommentBtn =
					data.user.credentials.username === username ? (
						<DeletePopup
							postId={data.post.postId}
							commentId={commentId}
							deleteElement={deleteComment}
							text="comment"
						/>
					) : (
						""
					);

				const editCommentBtn =
					data.user.credentials.username === username ? (
						<EditPopup
							elementId={commentId}
							body={body}
							editElementObject={editComment}
							text="comment"
						/>
					) : (
						""
					);

				return (
					<div className="comment" key={index}>
						<div className="comment__img">
							<Link to={`/users/${username}`}>
								<img src={userImage} alt={username} />
							</Link>
						</div>

						<div className="comment__content">
							<h5>
								<Link to={`/users/${username}`}>
									{username}
								</Link>
							</h5>

							<div className="comment__meta">
								<p>
									<em>
										{typeof createdAt !== "number"
											? dayjs(
													new Date(
														createdAt._seconds! *
															1000
													)
											  ).format("h:mm a, MMMM DD YYYY")
											: dayjs(
													new Date(createdAt * 1000)
											  ).format("h:mm a, MMMM DD YYYY")}
									</em>
								</p>
							</div>

							<div className="comment__entry">
								<p>{body}</p>
							</div>
						</div>

						<div className="comment__delete-btn">
							{deleteCommentBtn}
						</div>

						<div className="comment__edit-btn">
							{editCommentBtn}
						</div>
						<div className="replies">
							<CommentReply
								commentId={commentId}
								index={index}
								repliesCount={repliesCount}
							/>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default CommentsListing;
