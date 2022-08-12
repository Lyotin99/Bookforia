import { Link } from "react-router-dom";
import LikeButton from "../../Common/LikeButton";
import DeletePopup from "../../Common/DeletePopup/DeletePopup";
import useReduxSelector from "../../../hooks/useReduxSelector";
//MUI
import ChatIcon from "@material-ui/icons/Chat";
//Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Redux
import { deletePost } from "../../../redux/actions/postActions";
//Interfaces
import { OnePostData } from "../../../utils/Interfaces";
import SavedButton from "../../Common/SaveButton";

interface PostProps {
	post: OnePostData;
}

const Post = (props: PostProps) => {
	const data = useReduxSelector();
	const { body, createdAt, userImage, username, imageUrl, postId } =
		props.post;
	const { user } = data;

	const deleteButton =
		user.authenticated && username === user.credentials.username ? (
			<DeletePopup
				postId={postId}
				deleteElement={deletePost}
				text="post"
			/>
		) : null;

	const saveBtn = user.authenticated ? <SavedButton postId={postId} /> : null;

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
							<LikeButton postId={postId} />
							<span>{props.post.likeCount} Likes</span>
						</div>
						<div className="post__comments">
							<Link to={`/post/${postId}`} title="Expand post">
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
