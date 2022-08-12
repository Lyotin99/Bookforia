import React, { Component } from "react";
import { Link } from "react-router-dom";
//MUI
import { Favorite, FavoriteBorder } from "@material-ui/icons";
//Redux
import { connect } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/postActions";
//Interfaces
import { Posts, LikesData } from "./postInterfaces";

interface Props {
	likePost?: (postId: string) => void;
	unlikePost?: (postId: string) => void;
	postId: string;
	user: Posts;
}

export class LikeButton extends Component<Props> {
	likedPost = () => {
		if (
			this.props.user &&
			this.props.user.likes &&
			this.props.user.likes.find(
				(like: LikesData) => like.postId === this.props.postId
			)
		) {
			return true;
		} else return false;
	};

	likePost = () => {
		if (this.props.likePost) this.props.likePost(this.props.postId);
	};
	unlikePost = () => {
		if (this.props.unlikePost) this.props.unlikePost(this.props.postId);
	};
	render() {
		const { user } = this.props;

		const likeButton =
			user && !user.authenticated ? (
				<Link to="/login">
					<div title="Like">
						<button>
							<FavoriteBorder color="primary" />
						</button>
					</div>
				</Link>
			) : this.likedPost() ? (
				<div title="Unlike">
					<button onClick={this.unlikePost}>
						<Favorite color="primary" />
					</button>
				</div>
			) : (
				<button title="Like" onClick={this.likePost}>
					<FavoriteBorder color="primary" />
				</button>
			);
		return likeButton;
	}
}
const mapActionsToProps = {
	likePost,
	unlikePost,
};
const mapStateToProps = (state: Props) => ({
	user: state.user,
});
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
