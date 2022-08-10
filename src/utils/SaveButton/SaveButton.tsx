import React from "react";
//MUI
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
//REDUX
import { connect } from "react-redux";
import { savePost, unSavePost } from "../../redux/actions/postActions";
//Interfaces
import { Posts } from "../postInterfaces";
interface Props {
	postId: string;
	savePost?: (postId: string) => void;
	unSavePost?: (postId: string) => void;
	user: Posts;
}

class SaveButton extends React.Component<Props> {
	savedPost = () => {
		if (
			this.props.user.savedPosts.find(
				(savedPost: any) => savedPost.postId === this.props.postId
			)
		) {
			return true;
		} else return false;
	};

	likePost = () => {
		if (this.props.savePost) this.props.savePost(this.props.postId);
	};
	unlikePost = () => {
		if (this.props.unSavePost) this.props.unSavePost(this.props.postId);
	};
	render() {
		const savedBtn = this.savedPost() ? (
			<div title="Unsave post">
				<button onClick={this.unlikePost}>
					<BookmarkIcon color="primary" fontSize="small" />
				</button>
			</div>
		) : (
			<div title="Save post">
				<button onClick={this.likePost}>
					<BookmarkBorderIcon color="primary" fontSize="small" />
				</button>
			</div>
		);
		return savedBtn;
	}
}
const mapActionsToProps = {
	savePost,
	unSavePost,
};
const mapStateToProps = (state: Props) => ({
	user: state.user,
});
export default connect(mapStateToProps, mapActionsToProps)(SaveButton);
