import React, { Component, Fragment } from "react";
//MUI
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
//Redux
import { connect } from "react-redux";
import { editPost, cleanErrors } from "../../../redux/actions/dataActions";
//Interfaces
import { UIData, PostDialogErrorData } from "../../../utils/postInterfaces";
interface ErrorsData {
	errors: { error: string };
	loading: boolean;
}

interface MapStateToPropsData {
	UI: ErrorsData;
}
interface EditPostProps {
	postId: string;
	body: string;
	UI?: UIData;
	editPost?: (postId: string, body: string) => void;
	cleanErrors?: () => void;
}
interface EditPostState {
	open: boolean;
	body: string;
	errors: PostDialogErrorData;
}
export class EditPost extends Component<EditPostProps> {
	state: EditPostState = {
		open: false,
		body: "",
		errors: {},
	};

	static getDerivedStateFromProps(
		prevProps: EditPostProps,
		prevState: EditPostState
	) {
		if (prevProps.UI)
			if (prevProps.UI.errors) return { errors: prevProps.UI.errors };
		if (prevProps.UI && !prevProps.UI.errors && !prevProps.UI.loading) {
			const prevStateData = {
				open: false,
				body: prevState.body,
				errors: prevState.errors,
			};
			prevStateData.body = "";
			prevStateData.errors.error = "";

			return prevState;
		}

		return null;
	}

	PostDetailsToState = (PostBody: string) => {
		this.setState({
			body: PostBody,
		});
	};
	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	handleOpen = () => {
		this.setState({
			open: true,
		});
		this.PostDetailsToState(this.props.body);
	};

	handleClose = () => {
		this.setState({
			open: false,
			errors: {},
		});
		if (this.props.cleanErrors) this.props.cleanErrors();
	};

	handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event?.preventDefault();
		if (this.props.editPost) {
			this.props.editPost(this.props.postId, this.state.body);
		}
		if (this.state.body.trim() !== "") {
			this.handleClose();
		}
	};
	render() {
		const { errors } = this.state;

		return (
			<Fragment>
				<div title="Edit post">
					<IconButton onClick={this.handleOpen} className="button">
						<EditIcon color="primary" fontSize="small" />
					</IconButton>
				</div>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
					className="form-popup"
				>
					<DialogTitle>Edit post</DialogTitle>

					<DialogContent>
						<form>
							<TextField
								name="body"
								type="text"
								label="Body"
								multiline
								rows="3"
								error={errors && errors.error ? true : false}
								helperText={errors ? errors.error : ""}
								placeholder="Edit your post."
								className="body"
								value={this.state.body}
								onChange={this.handleChange}
								fullWidth
							/>
						</form>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>

							<Button onClick={this.handleSubmit} color="primary">
								Save
							</Button>
						</DialogActions>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = (state: MapStateToPropsData) => ({
	UI: state.UI,
});
export default connect(mapStateToProps, { editPost, cleanErrors })(EditPost);
