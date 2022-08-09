import { useEffect, useState } from "react";
import axios from "axios";
import PostSkeleton from "../../utils/PostSkeleton";
import ProfileSkeleton from "../../utils/ProfileSkeleton";
import StaticProfile from "../../components/ProfileData/StaticProfile/StaticProfile";
import Post from "../../components/PostData/Post/Post";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/actions/dataActions";
//Interfaces
import { PropsData } from "./UserInterfaces";
import { Credentials } from "../../utils/postInterfaces";

const User = (props: PropsData) => {
	const [profile, setProfile] = useState<Credentials | null>(null);
	const [postIdParam, setPostIdParam] = useState<string>("");

	const mapStateToProps = (state: PropsData) => ({
		data: state.data,
	});

	const data = useSelector(mapStateToProps);
	const dispatch = useDispatch();
	const paramsPostId = props.match.params.postId;
	const paramsUsername = props.match.params.username;

	useEffect(() => {
		if (paramsPostId) {
			setPostIdParam(paramsPostId);
		}

		dispatch(getUserData(paramsUsername));

		axios
			.get(`/user/${paramsUsername}`)
			.then((res) => {
				setProfile(res.data.credentials);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [paramsUsername, paramsPostId, dispatch]);

	const { posts, loading } = data.data;

	const postsMarkup = loading ? (
		<PostSkeleton />
	) : posts === null ? (
		<p>No posts from this user</p>
	) : !postIdParam ? (
		posts.map((post) => <Post key={post.postId} post={post} />)
	) : (
		posts.map((post) => {
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
