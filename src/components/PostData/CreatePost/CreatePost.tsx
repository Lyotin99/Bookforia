//Redux
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../redux/actions/dataActions";
import { CreatePostProps } from "./CreatePostInterfaces";

const CreatePost = () => {
	const mapStateToProps = (state: CreatePostProps) => ({
		user: state.user,
		UI: state.UI,
	});

	const data = useSelector(mapStateToProps);
	const dispatch = useDispatch();

	const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const body = formData.get("body");

		dispatch(createPost({ body: String(body) }));
		event.currentTarget.reset();
	};

	const {
		user,
		UI: { errors },
	} = data;

	return user?.credentials.username ? (
		<form className="form-post" onSubmit={handleSubmit}>
			<div className="form__body">
				<div className="form__row">
					<div className="form__cols">
						<div className="form__col">
							<div className="form__controls">
								<textarea
									name="body"
									placeholder="Write your post"
								/>

								<span className="form__login-error">
									{errors ? errors.body : ""}
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
};

export default CreatePost;
