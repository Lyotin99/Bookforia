//MUI
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
//REDUX
import { useDispatch } from "react-redux";
import { savePost, unSavePost } from "../../redux/actions/postActions";
import useReduxSelector from "../../hooks/useReduxSelector";
//Interfaces
import { LikesData } from "../../utils/Interfaces";

const SaveButton = (props: { postId: string }) => {
	const data = useReduxSelector();
	const dispatch = useDispatch();
	const { savedPosts } = data.user;

	const savedPost = () => {
		if (
			savedPosts.find(
				(savedPost: LikesData) => savedPost.postId === props.postId
			)
		) {
			return true;
		} else return false;
	};

	const savePostHandler = () => {
		dispatch(savePost(props.postId));
	};
	const unsavePostHandler = () => {
		dispatch(unSavePost(props.postId));
	};

	const savedBtn = savedPost() ? (
		<div title="Unsave post">
			<button onClick={unsavePostHandler}>
				<BookmarkIcon />
			</button>
		</div>
	) : (
		<div title="Save post">
			<button onClick={savePostHandler}>
				<BookmarkBorderIcon />
			</button>
		</div>
	);
	return savedBtn;
};

export default SaveButton;
