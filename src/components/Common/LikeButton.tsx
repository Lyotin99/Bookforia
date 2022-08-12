import { Link } from "react-router-dom";
import useReduxSelector from "../../hooks/useReduxSelector";
//MUI
import { Favorite, FavoriteBorder } from "@material-ui/icons";
//Redux
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/postActions";
//Interfaces
import { LikesData } from "../../utils/Interfaces";

const LikeButton = (props: { postId: string }) => {
	const data = useReduxSelector();
	const dispatch = useDispatch();
	const { user } = data;

	const likedPost = () => {
		if (
			user &&
			user.likes &&
			user.likes.find((like: LikesData) => like.postId === props.postId)
		) {
			return true;
		} else return false;
	};

	const likePostHandler = () => {
		dispatch(likePost(props.postId));
	};

	const unlikePostHandler = () => {
		dispatch(unlikePost(props.postId));
	};

	const likeButton =
		user && !user.authenticated ? (
			<Link to="/login">
				<div title="Like">
					<button>
						<FavoriteBorder color="primary" />
					</button>
				</div>
			</Link>
		) : likedPost() ? (
			<div title="Unlike">
				<button onClick={unlikePostHandler}>
					<Favorite color="primary" />
				</button>
			</div>
		) : (
			<button title="Like" onClick={likePostHandler}>
				<FavoriteBorder color="primary" />
			</button>
		);

	return likeButton;
};

export default LikeButton;
