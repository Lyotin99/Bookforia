export interface CredentialData {
	bio?: string;
	createdAt?: CreatedAt;
	email?: string;
	imageUrl?: string;
	location?: string;
	userId?: string;
	username?: string;
	website?: string;
	favoriteQuote?: string;
	favoriteBooks?: string;
}

export interface LikesData {
	postId: string;
	username: string;
}

export interface CreatedAt {
	_seconds?: number;
	_nanoseconds?: number;
}

export interface NotificationsData {
	createdAt: CreatedAt;
	postId: string;
	read: boolean;
	recipient: string;
	sender: string;
	type: string;
}

export interface initialStateProps {
	authenticated: boolean;
	loading: boolean;
	credentials?: CredentialData;
	likes: LikesData[];
	savedPosts: LikesData[];
	notifications?: NotificationsData[];
}
