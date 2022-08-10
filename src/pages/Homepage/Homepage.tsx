import { useEffect } from "react";
import PostSkeleton from "../../utils/PostSkeleton";
import Profile from "../../components/ProfileData/Profile/Profile";
import Post from "../../components/PostData/Post/Post";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/postActions";
//Interfaces
import { OnePostData, InitialStateData } from "../../utils/postInterfaces";
import CreatePost from "../../components/PostData/CreatePost/CreatePost";

interface HomepageProps {
	data: InitialStateData;
}

const Homepage = () => {
	const mapStateToProps = (state: HomepageProps) => ({
		data: state.data,
	});
	const data = useSelector(mapStateToProps);
	const dispatch = useDispatch();
	const { posts, loading } = data.data;

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	let recentPostsMarkup =
		!loading && posts ? (
			posts.map((post: OnePostData) => {
				return <Post key={post.postId} post={post} />;
			})
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
