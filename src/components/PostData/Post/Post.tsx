import { Link } from "react-router-dom";
import LikeButton from "../../../utils/LikeButton/LikeButton";
import DeletePost from "../DeletePost/DeletePost";
//MUI
import ChatIcon from "@material-ui/icons/Chat";

//Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Redux
import { useSelector } from "react-redux";
//Interfaces
import { OnePostData, Posts } from "../../../utils/postInterfaces";
import SavedButton from "../../../utils/SaveButton/SaveButton";

interface StateToPropsData {
	data: { post: OnePostData };
	user: Posts;
}
interface Props {
	post: OnePostData;
	likePost?: (postId: string) => void;
	unlikePost?: (postId: string) => void;
	openDialog?: boolean;
}

const Post = (props: Props) => {
	const mapStateToProps = (state: StateToPropsData) => ({
		user: state.user,
		post: state.data.post,
	});
	const data = useSelector(mapStateToProps);
	const { body, createdAt, userImage, username, imageUrl } = props.post;
	const { user } = data;
	const userPostId = props.post.postId;

	const deleteButton =
		user.authenticated && username === user.credentials.username ? (
			<DeletePost postId={userPostId} />
		) : null;

	const saveBtn = user.authenticated ? (
		<SavedButton postId={userPostId} />
	) : null;

	dayjs.extend(relativeTime);

	return (
		<div className="post">
			<div className="post__img">
				<Link to={`/users/${username}`}>
					<img src={userImage} alt={username} />
				</Link>
			</div>

			<div className="post__content">
				<div className="post__content-head">
					<h5>
						<Link to={`/users/${username}`}>{username}</Link>
					</h5>

					<p>
						{createdAt && typeof createdAt !== "number"
							? dayjs(
									new Date(createdAt._seconds * 1000)
							  ).fromNow()
							: dayjs(new Date(createdAt * 1000)).fromNow()}
					</p>

					<p>{body ? body : imageUrl}</p>
				</div>

				<div className="post__delete">{deleteButton}</div>

				<div className="post__content-body">
					<div className="post__likes-comments">
						<div className="post__likes">
							<LikeButton postId={userPostId} />
							<span>{props.post.likeCount} Likes</span>
						</div>
						<div className="post__comments">
							<Link
								to={`/post/${userPostId}`}
								title="Expand post"
							>
								<button>
									<ChatIcon />
								</button>

								<span>
									{props.post.postId === props.post?.postId &&
									props.post.commentCount !== 0
										? props.post.commentCount
										: props.post.commentCount}{" "}
									Comments
								</span>
							</Link>
						</div>

						<div className="post__save-btn">{saveBtn}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
