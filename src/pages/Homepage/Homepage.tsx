import { useEffect } from "react";
import PostSkeleton from "../../utils/PostSkeleton";
import Profile from "../../components/ProfileData/Profile/Profile";
import Post from "../../components/PostData/Post/Post";
import useReduxSelector from "../../hooks/useReduxSelector";
//Redux
import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/postActions";
//Interfaces
import { OnePostData } from "../../utils/Interfaces";
import CreatePost from "../../components/PostData/CreatePost/CreatePost";

const Homepage = () => {
	const data = useReduxSelector();
	const dispatch = useDispatch();
	const {
		data: { posts, loading },
	} = data;

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	let recentPostsMarkup =
		!loading && posts ? (
			posts.map((post: OnePostData) => (
				<Post key={post.postId} post={post} />
			))
		) : (
			<PostSkeleton />
		);
	return (
		<div className="section-content-aside">
			<div className="shell">
				<div className="section__inner">
					<div className="section__content">
						<CreatePost />

						{recentPostsMarkup}
					</div>

					<div className="section__aside">
						<Profile />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
