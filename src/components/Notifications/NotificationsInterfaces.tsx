export interface DateObj {
	_seconds: number;
	_nanoseconds: number;
}

export interface NotificationsData {
	recipient: string;
	sender: string;
	createdAt: DateObj;
	postId: string;
	type: string;
	read: boolean;
	notificationId: string;
}

export interface StateToPropsData {
	user: { notifications: NotificationsData[] };
}
