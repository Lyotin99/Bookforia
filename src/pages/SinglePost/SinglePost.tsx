import { useEffect } from "react";
import { Link } from "react-router-dom";
import EditPost from "../../components/PostData/EditPost/EditPost";
import Comments from "../../components/CommentData/CommentsListing/CommentsListing";
import LikeButton from "../../utils/LikeButton/LikeButton";
import CommentForm from "../../components/CommentData/CommentForm/CommentForm";
import BookSpinner from "../../photos/bookSpinner.svg";
//MUI
import ChatIcon from "@material-ui/icons/Chat";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../redux/actions/dataActions";
//Dayjs
import dayjs from "dayjs";
//Interfaces
import { SinglePostProps, StateToPropsData } from "./SinglePostInterfaces";

const SinglePost = (props: SinglePostProps) => {
	const dispatch = useDispatch();
	const mapStateToProps = (state: StateToPropsData) => ({
		post: state.data.post,
		UI: state.UI,
		user: state.user,
	});
	const data = useSelector(mapStateToProps);
	const paramsPostId = props.match.params.postId;

	useEffect(() => {
		dispatch(getPost(paramsPostId));
	}, [dispatch, paramsPostId]);

	const {
		post: { body, createdAt, postId, userImage, username },
		UI: { loading },
	} = data;

	const editBtn =
		data.user?.credentials.username === username ? (
			<EditPost postId={postId} body={body} />
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

						<span>{data.post.likeCount} likes</span>
					</div>

					<div className="post__single-comments" title="Comments">
						<button>
							<ChatIcon color="primary" />
						</button>

						<span>{data.post.commentCount} Comments</span>
					</div>
					<div className="post__single-edit">{editBtn}</div>
				</div>
			</div>

			<div className="post__single-comments-listing">
				<CommentForm postId={postId} />

				<div className="comments">
					{data.post.comments && (
						<Comments comments={data.post.comments} />
					)}
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
