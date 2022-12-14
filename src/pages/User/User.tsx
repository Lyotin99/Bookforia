import { useEffect, useState } from "react";
import PostSkeleton from "../../utils/PostSkeleton";
import ProfileSkeleton from "../../utils/ProfileSkeleton";
import StaticProfile from "../../components/ProfileData/StaticProfile/StaticProfile";
import Post from "../../components/PostData/Post/Post";
import { axiosGet } from "../../services/axiosServices";
import useReduxSelector from "../../hooks/useReduxSelector";
//Redux
import { useDispatch } from "react-redux";
import { getUserData } from "../../redux/actions/dataActions";
//Interfaces
import { Credentials, OnePostData } from "../../utils/Interfaces";

interface PropsData {
	match: {
		params: {
			username: string;
			postId: string;
		};
	};
}

const User = (props: PropsData) => {
	const [profile, setProfile] = useState<Credentials | null>(null);
	const [postIdParam, setPostIdParam] = useState<string>("");
	const data = useReduxSelector();
	const dispatch = useDispatch();
	const paramsPostId = props.match.params.postId;
	const paramsUsername = props.match.params.username;

	useEffect(() => {
		paramsPostId && setPostIdParam(paramsPostId);

		dispatch(getUserData(paramsUsername));

		axiosGet(`/user/${paramsUsername}`).then((data) => {
			setProfile(data.credentials);
		});
	}, [paramsUsername, paramsPostId, dispatch]);

	const { posts, loading } = data.data;

	const postsMarkup = loading ? (
		<PostSkeleton />
	) : posts === null ? (
		<p>No posts from this user</p>
	) : !postIdParam ? (
		posts.map((post: OnePostData) => <Post key={post.postId} post={post} />)
	) : (
		posts.map((post: OnePostData) => {
			if (post.postId !== postIdParam) {
				return <Post key={post.postId} post={post} />;
			} else return <Post key={post.postId} post={post} />;
		})
	);
	return (
		<div className="section-content-aside">
			<div className="shell">
				<div className="section__inner">
					<div className="section__content">{postsMarkup}</div>

					<div className="section__aside">
						{profile === null ? (
							<ProfileSkeleton />
						) : (
							<StaticProfile profile={profile} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
