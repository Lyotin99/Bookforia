import useReduxSelector from "../../hooks/useReduxSelector";
//MUI
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
//REDUX
import { useDispatch } from "react-redux";
import { savePost, unSavePost } from "../../redux/actions/postActions";
//Interfaces
import { LikesData } from "../../utils/Interfaces";

const SaveButton = (props: { postId: string }) => {
	const data = useReduxSelector();
	const dispatch = useDispatch();
	const {
		user: { savedPosts },
	} = data;

	const savedPost = () => {
		if (
			savedPosts.find(
				(savedPost: LikesData) => savedPost.postId === props.postId
			)
		) {
			return true;
		} else return false;
	};

	const likePostHandler = () => {
		dispatch(savePost(props.postId));
	};

	const unlikePostHandler = () => {
		dispatch(unSavePost(props.postId));
	};

	const savedBtn = savedPost() ? (
		<div title="Unsave post">
			<button onClick={likePostHandler}>
				<BookmarkIcon color="primary" fontSize="small" />
			</button>
		</div>
	) : (
		<div title="Save post">
			<button onClick={unlikePostHandler}>
				<BookmarkBorderIcon color="primary" fontSize="small" />
			</button>
		</div>
	);

	return savedBtn;
};

export default SaveButton;
