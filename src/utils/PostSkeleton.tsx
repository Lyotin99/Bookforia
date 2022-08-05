import noImg from "../photos/no-img.png";

const PostSkeleton = () => {
	const content = Array.from({ length: 5 }).map((item, index) => (
		<div className="post" key={index}>
			<div className="post__img">
				<img src={noImg} alt="Profile" />
			</div>

			<div className="post__content">
				<div className="post__username"></div>
				<div className="post__date"></div>
				<div className="post__fullLine"></div>
				<div className="post__fullLine"></div>
				<div className="post__halfLine"></div>
			</div>
		</div>
	));
	return <>{content}</>;
};

export default PostSkeleton;
