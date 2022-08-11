import useReduxSelector from "../../../hooks/useReduxSelector";
//Redux
import { useDispatch } from "react-redux";
import { createPost } from "../../../redux/actions/postActions";

const CreatePost = () => {
	const data = useReduxSelector();
	const dispatch = useDispatch();
	const {
		user,
		UI: { errors },
	} = data;

	const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const body = formData.get("body");

		dispatch(createPost({ body: String(body) }));
		event.currentTarget.reset();
	};

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
