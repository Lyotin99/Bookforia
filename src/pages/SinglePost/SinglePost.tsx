import { useEffect } from "react";
import { Link } from "react-router-dom";
import EditPopup from "../../components/Common/EditPopup/EditPopup";
import Comments from "../../components/CommentData/CommentsListing/CommentsListing";
import LikeButton from "../../components/Common/LikeButton";
import CommentForm from "../../components/CommentData/CommentForm/CommentForm";
import BookSpinner from "../../photos/bookSpinner.svg";
import useReduxSelector from "../../hooks/useReduxSelector";
//MUI
import ChatIcon from "@material-ui/icons/Chat";
//Redux
import { useDispatch } from "react-redux";
import { getPost, editPost } from "../../redux/actions/postActions";
//Dayjs
import dayjs from "dayjs";

export interface SinglePostProps {
	match: {
		params: {
			username: string;
			postId: string;
		};
	};
}

const SinglePost = (props: SinglePostProps) => {
	const dispatch = useDispatch();
	const data = useReduxSelector();
	const paramsPostId = props.match.params.postId;

	useEffect(() => {
		dispatch(getPost(paramsPostId));
	}, [dispatch, paramsPostId]);

	const {
		data: {
			post: {
				body,
				createdAt,
				postId,
				userImage,
				username,
				comments,
				likeCount,
				commentCount,
			},
		},
		UI: { loading },
	} = data;

	const editBtn =
		data.user?.credentials.username === username ? (
			<EditPopup
				elementId={postId}
				body={body}
				editElement={editPost}
				text="post"
			/>
		) : (
			""
		);

	const dialogMarkup = loading ? (
		<div className="section__spinner">
			<img src={BookSpinner} alt="Book Spinner" className="spinner" />
		</div>
	) : (
		<div className="post-single">
			<div className="post__single-img">
				<Link to={`/users/${username}`}>
					<img src={userImage} alt="Profile" />
				</Link>
			</div>

			<div className="post__single-content">
				<h5>
					<Link to={`/users/${username}`}>{username}</Link>
				</h5>

				<div className="post__single-meta">
					<p>
						<em>
							{createdAt
								? dayjs(createdAt._seconds! * 1000).format(
										"h:mm a, MMMM DD YYYY"
								  )
								: ""}
						</em>
					</p>
				</div>

				<div className="post__single-entry">
					<p>{body}</p>
				</div>

				<div className="post__single-likes-comments">
					<div className="post__single-likes">
						<LikeButton postId={postId} />

						<span>{likeCount} likes</span>
					</div>

					<div className="post__single-comments" title="Comments">
						<button>
							<ChatIcon color="primary" />
						</button>

						<span>{commentCount} Comments</span>
					</div>
					<div className="post__single-edit">{editBtn}</div>
				</div>
			</div>

			<div className="post__single-comments-listing">
				<CommentForm postId={postId} />

				<div className="comments">
					{comments && <Comments comments={comments} />}
				</div>
			</div>
		</div>
	);

	return (
		<div className="section-post-single">
			<div className="shell">
				<div className="section__inner">{dialogMarkup}</div>
			</div>
		</div>
	);
};

export default SinglePost;
