//User
export interface UserData {
	authenticated: boolean;
	loading: boolean;
	credentials: Credentials;
	likes: LikesData[];
	notifications: NotificationsData & NotificationsData[];
	savedPosts: LikesData[];
}
export interface UserDetails {
	bio: string;
	website: string;
	location: string;
	favoriteQuote: string;
	favoriteBooks: string;
}
export interface Credentials {
	username: string;
	createdAt: DateObj;
	imageUrl: string;
	bio: string;
	favoriteQuote: string;
	favoriteBooks: string;
	website: string;
	location: string;
}

export interface ReplyData {
	body: string;
	createdAt: DateObj;
	username: string;
	commentId: string;
	userImage: string;
	replyId: string;
}
//Data
export interface InitialStateData {
	posts: OnePostData[];
	post: OnePostData;
	loading: boolean;
}
export interface Posts {
	credentials: Credentials;
	authenticated: boolean;
	likes: LikesData[];
	savedPosts: LikesData[];
}
export interface OnePostData {
	postId: string;
	body: string;
	imageUrl: string;
	createdAt: DateObj;
	likeCount: number;
	commentCount: number;
	userImage: string;
	username: string;
	comments: CommentsData[];
}
export interface CommentsData {
	body: string;
	postId: string;
	userImage: string;
	createdAt: DateObj;
	username: string;
	commentId: string;
	repliesCount: number;
	replies: ReplyData[];
}
export interface LikesData {
	postId: string;
	username: string;
}
export interface NotificationsData {
	createdAt: DateObj;
	postId: string;
	read: boolean;
	recipient: string;
	sender: string;
	type: string;
	notificationId: string;
}
export interface DateObj {
	_seconds: number;
	_nanoseconds: number;
}

export interface History {
	push(url: string): void;
}
//UI

export interface AuthData {
	email: string;
	password: string;
	confirmPassword?: string;
	username?: string;
}

export interface LoginUIData {
	loading: boolean;
	errors: LoginErrorsData;
}

export interface LoginErrorsData {
	email?: string;
	password?: string;
	general?: string;
	error?: string;
}

export interface CommentErrorsData {
	comment?: string;
	general?: string;
}

export interface PostDialogErrorData {
	error?: string;
}

export interface SignupErrorsData {
	email?: string;
	password?: string;
	confirmPassword?: string;
	username?: string;
	general?: string;
	error?: string;
}
export interface UIData {
	loading: boolean;
	errors: CommentErrorsData &
		PostDialogErrorData & { comments: string } & SignupErrorsData & {
			body: string;
		};
}

export interface UIErrors {
	errors: CommentErrorsData &
		PostDialogErrorData & { comments: string } & SignupErrorsData & {
			body: string;
		};
}

export interface SignupUIData {
	loading: boolean;
	errors: SignupErrorsData;
}

//NYTimes

export interface NYTimesBook {
	age_group: string;
	amazon_product_url: string;
	article_chapter_link: string;
	asterisk: number;
	author: string;
	book_image: string;
	book_image_height: number;
	book_image_width: number;
	book_review_link: string;
	book_uri: string;
	buy_links: [];
	contributor: string;
	contributor_note: string;
	dagger: number;
	description: string;
	first_chapter_link: string;
	isbns: [];
	price: string;
	primary_isbn10: string;
	primary_isbn13: string;
	publisher: string;
	rank: number;
	rank_last_week: number;
	sunday_review_link: string;
	title: string;
	weeks_on_list: number;
}
