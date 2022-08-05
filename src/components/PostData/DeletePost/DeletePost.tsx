import React, { Fragment } from "react";
//MUI
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
//Redux
import { connect } from "react-redux";
import { deletePost } from "../../../redux/actions/dataActions";

interface DeletePostProps {
	postId: string;
	deletePost: (postId: string) => void;
}

class DeletePost extends React.Component<DeletePostProps> {
	state = { open: false };

	handleOpen = () => {
		this.setState({
			open: true,
		});
	};
	handleClose = () => {
		this.setState({
			open: false,
		});
	};

	deletePost = () => {
		this.props.deletePost(this.props.postId);
		this.setState({ open: false });
	};
	render() {
		return (
			<Fragment>
				<div title="Delete Post">
					<button onClick={this.handleOpen}>
						<DeleteOutline color="primary" fontSize="small" />
					</button>
				</div>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
					className="form-popup"
				>
					<DialogTitle>
						Are you sure you want to delete the post?
					</DialogTitle>
					<DialogActions>
						<Button onClick={this.handleClose} color="secondary">
							Cancel
						</Button>
						<Button onClick={this.deletePost} color="primary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

export default connect(null, { deletePost })(DeletePost);
