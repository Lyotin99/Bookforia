import React, { useState } from "react";
import { Link } from "react-router-dom";
import useReduxSelector from "../../hooks/useReduxSelector";
//Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Mui
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
	const [anchorEl, setAnchorEl] = useState<any>(null);
	const data = useReduxSelector();
	const dispatch = useDispatch();
	const { notifications } = data.user;

	const handleOpen = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		setAnchorEl(event.target);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onMenuOpened = () => {
		let unreadNotificationsIds = notifications
			.filter((not) => !not.read)
			.map((not) => not.notificationId);

		dispatch(markNotificationsRead(unreadNotificationsIds));
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
				const iconColor = not.read ? "primary" : "secondary";
				const icon =
					not.type === "like" ? (
						<FavoriteIcon color={iconColor} />
					) : (
						<ChatIcon color={iconColor} />
					);
				return (
					<MenuItem
						key={not.createdAt._seconds}
						onClick={handleClose}
						className="notification"
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
					</MenuItem>
				);
			})
		) : (
			<MenuItem onClick={handleClose}>
				You have no notifications yet
			</MenuItem>
		);

	return (
		<>
			<button
				aria-owns={anchorEl ? "simple-menu" : undefined}
				aria-haspopup="true"
				onClick={handleOpen}
				className="btn-notifications"
			>
				{notificationsIcon}
			</button>
			<Menu
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={handleClose}
				onEntered={onMenuOpened}
				className="notifications"
			>
				{notificationsMarkup}
			</Menu>
		</>
	);
};

export default Notifications;
