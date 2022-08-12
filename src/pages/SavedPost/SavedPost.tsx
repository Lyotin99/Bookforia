import { useEffect } from "react";
import Post from "../../components/PostData/Post/Post";
import PostSkeleton from "../../utils/PostSkeleton";
import useReduxSelector from "../../hooks/useReduxSelector";
//REDUX
import { useDispatch } from "react-redux";
import { getSavedPosts } from "../../redux/actions/postActions";
//Interfaces
import { OnePostData } from "../../utils/Interfaces";

const SavedPost = () => {
	const data = useReduxSelector();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSavedPosts());
	}, [dispatch]);

	const { posts, loading } = data.data;

	let recentPostsMarkup = !loading ? (
		posts.map((post: OnePostData) => {
			return <Post key={post.postId} post={post} />;
		})
	) : (
		<PostSkeleton />
	);
	return (
		<div className="section-content-aside section-content-aside--saved-posts">
			<div className="shell">
				<div className="section__inner">
					<div className="section__content">{recentPostsMarkup}</div>
				</div>
			</div>
		</div>
	);
};

export default SavedPost;
