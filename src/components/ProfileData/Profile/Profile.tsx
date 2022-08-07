import { Link } from "react-router-dom";
import EditDetails from "../EditDetails/EditDetails";
import ProfileSkeleton from "../../../utils/PostSkeleton";

//Icons
import StarIcon from "../../../photos/ico-star.svg";
import QuoteIcon from "../../../photos/ico-quote.svg";
import DescIcon from "../../../photos/ico-desc.svg";
import PersonIcon from "../../../photos/ico-person.svg";
import "./profile.css";

//Mui
import IconButton from "@material-ui/core/IconButton";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import { KeyboardReturn } from "@material-ui/icons";

//Dayjs
import dayjs from "dayjs";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, logoutUser } from "../../../redux/actions/userActions";

//Interfaces
import { Posts } from "../../../utils/postInterfaces";

interface PropsData {
	user: Posts;
	loading?: boolean;
}

const Profile = () => {
	const mapStateToProps = (state: PropsData) => ({
		user: state.user,
		loading: state.loading,
	});

	const data = useSelector(mapStateToProps);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutUser());
	};
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const image = event.target.files ? event.target.files[0] : "";
		const formData = new FormData();
		if (image) formData.append("image", image, image.name);
		dispatch(uploadImage(formData));
	};

	const {
		user: {
			credentials: {
				bio,
				createdAt,
				favoriteBooks,
				imageUrl,
				favoriteQuote,
				location,
				username,
				website,
			},
			authenticated,
		},
		loading,
	} = data;

	let profileMarkup = !loading ? (
		authenticated ? (
			<div className="profile">
				<div className="profile__img image-fit">
					<img src={imageUrl} alt={username} />

					<div className="profile__edit-img">
						<input
							type="file"
							id="imageInput"
							onChange={handleImageChange}
						/>
					</div>
				</div>

				<div className="profile__content">
					<ul>
						<li className="profile__username">
							<img src={PersonIcon} alt="Person icon" />

							<Link to={`/users/${username}`}>{username}</Link>
						</li>

						<li>
							<img src={DescIcon} alt="Description icon" />
							{bio}
						</li>

						<li>
							{location && (
								<>
									<LocationOn />

									{location}
								</>
							)}
						</li>

						<li>
							{website && (
								<>
									<LinkIcon />

									<Link
										to={website}
										target="_blank"
										rel="noopener noreferrer"
									>
										{website}
									</Link>
								</>
							)}
						</li>

						<li>
							<img src={StarIcon} alt="Star icon" />
							Favorite Book/Books:{" "}
							{favoriteBooks && <span>{favoriteBooks}</span>}
						</li>

						<li>
							<img src={QuoteIcon} alt="Quote icon" />
							Favorite Quote:{" "}
							{favoriteQuote && <cite>' {favoriteQuote} '</cite>}
						</li>

						<li>
							<CalendarToday />
							Joined:
							{createdAt ? (
								<span>
									{dayjs(
										createdAt._seconds
											? new Date(
													createdAt._seconds * 1000
											  ).toString()
											: new Date().toString()
									).format("MMM YYYY")}
								</span>
							) : (
								<p>Loading...</p>
							)}
						</li>
					</ul>
				</div>

				<div className="profile__actions">
					<div className="logout" title="Logout">
						<IconButton onClick={handleLogout}>
							<KeyboardReturn />
						</IconButton>
					</div>

					<EditDetails />
				</div>
			</div>
		) : (
			<div className="section-cta">
				<div className="section__content">
					<p>No profile found, please login again.</p>
				</div>

				<div className="section__actions">
					<Link to="/login" className="btn">
						Login
					</Link>

					<Link to="/signup" className="btn btn--blue">
						Signup
					</Link>
				</div>
			</div>
		)
	) : (
		<ProfileSkeleton />
	);

	return profileMarkup;
};

export default Profile;
