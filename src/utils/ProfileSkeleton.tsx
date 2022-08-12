import noImg from "../photos/no-img.png";

const ProfileSkeleton = () => {
	return (
		<>
			<div className="profile profile--skeleton">
				<div className="profile__img image-fit">
					<img src={noImg} alt="profile" />
				</div>
				<hr />
				<div className="profile__content">
					<ul>
						<li></li>

						<li></li>

						<li></li>

						<li></li>

						<li></li>

						<li></li>

						<li></li>
					</ul>
				</div>
			</div>
		</>
	);
};
export default ProfileSkeleton;
