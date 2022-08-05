import React from "react";
//Redux
import { connect } from "react-redux";
import { createPost, cleanErrors } from "../../../redux/actions/dataActions";
import { CreatePostProps, CreatePostState } from "./CreatePostInterfaces";

class CreatePost extends React.Component<CreatePostProps> {
	state: CreatePostState = {
		open: false,
		body: "",
		errors: { body: "" },
	};

	static getDerivedStateFromProps(
		prevProps: CreatePostProps,
		prevState: CreatePostState
	) {
		const prevStateData = {
			body: prevState.body,
			open: prevState.open,
			errors: prevState.errors,
		};
		if (prevProps.UI)
			if (prevProps.UI.errors) return { errors: prevProps.UI.errors };
		if (!prevProps.UI.errors && !prevProps.UI.loading) {
			prevState.body = "";
			prevState.open = false;
			prevState.errors.body = "";
			return prevStateData;
		}

		return null;
	}

	handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		this.props.createPost({ body: this.state.body });
		this.setState({
			body: "",
		});
	};
	render() {
		const { errors } = this.state;

		return this.props.user?.credentials.username ? (
			<form className="form-post" onSubmit={this.handleSubmit}>
				<div className="form__body">
					<div className="form__row">
						<div className="form__cols">
							<div className="form__col">
								<div className="form__controls">
									<textarea
										name="body"
										placeholder="Write your post"
										onChange={this.handleChange}
									/>

									<span className="form__login-error">
										{errors.body}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="form__actions">
					<button type="submit" className="btn">
						Submit
					</button>
				</div>
			</form>
		) : (
			<></>
		);
	}
}

const mapStateToProps = (state: CreatePostProps) => ({
	UI: state.UI,
	user: state.user,
});

export default connect(mapStateToProps, { createPost, cleanErrors })(
	CreatePost
);
