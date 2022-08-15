import { useState } from "react";
import { Link } from "react-router-dom";
import useReduxSelector from "../../hooks/useReduxSelector";
//Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Mui
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
//Redux
import { useDispatch } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";
//Interfaces
import { NotificationsData } from "../../utils/Interfaces";

const Notifications = () => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [isClickedOnce, setIsClickedOnce] = useState<boolean>(false);
	const data = useReduxSelector();
	const dispatch = useDispatch();
	const { notifications } = data.user;

	const handleOpen = () => {
		setIsOpened(!isOpened);
	};

	const handleClose = () => {
		setIsOpened(false);

		if (!isClickedOnce) {
			let unreadNotificationsIds = notifications
				.filter((not: NotificationsData) => !not.read)
				.map((not: NotificationsData) => not.notificationId);

			dispatch(markNotificationsRead(unreadNotificationsIds));

			setIsClickedOnce(true);
		}
	};

	dayjs.extend(relativeTime);
	let notificationsIcon;

	if (notifications && notifications.length > 0) {
		notifications.filter((not: NotificationsData) => not.read === false)
			.length > 0
			? (notificationsIcon = (
					<Badge
						badgeContent={
							notifications.filter(
								(not: NotificationsData) => not.read === false
							).length
						}
						color="secondary"
					>
						<NotificationsIcon />
					</Badge>
			  ))
			: (notificationsIcon = <NotificationsIcon />);
	} else notificationsIcon = <NotificationsIcon />;

	let notificationsMarkup =
		notifications && notifications.length > 0 ? (
			notifications.map((not: NotificationsData) => {
				const verb = not.type === "like" ? "liked" : "commented on";
				const time = dayjs(
					new Date(not.createdAt._seconds * 1000)
				).fromNow();
				const icon =
					not.type === "like" ? <FavoriteIcon /> : <ChatIcon />;
				const elColor = !not.read ? "rgba(0,68,255,.5)" : "#ff4400";

				return (
					<li
						key={not.createdAt._seconds}
						onClick={handleClose}
						className="notification"
						style={{ background: elColor }}
					>
						<Link
							className="notification__icon"
							to={`/post/${not.postId}`}
						>
							{icon}
						</Link>

						<Link
							className="notification__content"
							to={`/post/${not.postId}`}
						>
							<p>{`${not.sender} ${verb} your post ${time}`}</p>
						</Link>
					</li>
				);
			})
		) : (
			<li onClick={handleClose}>You have no notifications yet</li>
		);

	return (
		<>
			<button onClick={handleOpen} className="btn-notifications">
				{notificationsIcon}
			</button>

			<div className={`notifications ${isOpened ? "is-opened" : ""}`}>
				<button className="btn-close" onClick={handleClose}>
					X
				</button>

				<div
					className="notifications__whitespace"
					onClick={handleClose}
				></div>

				<div className="notifications__content">
					<ul>{notificationsMarkup}</ul>
				</div>
			</div>
		</>
	);
};

export default Notifications;
