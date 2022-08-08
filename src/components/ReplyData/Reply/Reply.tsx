import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookSpinner from "../../../photos/bookSpinner.svg";

//MUI
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from "@material-ui/core";
import DeletePopup from "../../DeletePopup/DeletePopup";
import EditReply from "../EditReply/EditReply";

//Dayjs
import dayjs from "dayjs";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getReplies, deleteReply } from "../../../redux/actions/dataActions";

//Interfaces
import {
	Credentials,
	InitialStateData,
	ReplyData,
	UserData,
} from "../../../utils/postInterfaces";
import ReplyForm from "../ReplyForm/ReplyForm";

interface Props {
	commentId: string;
	index: number;
	repliesCount: number;
}

interface mapStateToProps {
	data: InitialStateData;
	user: UserData;
}

const Reply = (props: Props) => {
	const [expanded, setExpanded] = useState<boolean | string>(false);
	const [replyBarStatus, setReplyBarStatus] = useState<string>("");

	const mapStateToProps = (state: mapStateToProps) => ({
		data: state.data,
		user: state.user,
	});

	const data = useSelector(mapStateToProps);
	const dispatch = useDispatch();
	const { credentials } = data.user;

	const handleSubmit = () => {
		dispatch(getReplies(props.commentId));
	};

	const handleSubmitReply = () => {
		setExpanded("panel1");
		setReplyBarStatus("Hide replies");
		dispatch(getReplies(props.commentId));
	};

	const handleChange =
		(panel: string) =>
		(event: React.ChangeEvent<{}>, newExpanded: boolean) => {
			if (newExpanded) {
				setExpanded(panel);
				setReplyBarStatus("Hide replies");
			} else setExpanded(false);
		};

	const repliesMarkup =
		data.data.post.comments[props.index].replies &&
		data.data.post.comments[props.index].replies.length > 0 ? (
			data.data.post.comments[props.index].replies?.map(
				(reply: ReplyData) => {
					const {
						body,
						createdAt,
						userImage,
						username,
						replyId,
						commentId,
					} = reply;
					const deleteReplyBtn =
						credentials.username === username ? (
							<DeletePopup
								replyId={replyId}
								commentId={commentId}
								deleteElement={deleteReply}
								text="reply"
							/>
						) : (
							""
						);

					const editReply =
						credentials.username === username ? (
							<EditReply replyId={replyId} body={body} />
						) : (
							""
						);
					return (
						<div className="reply" key={reply.replyId}>
							<div className="reply__img">
								<Link to={`/users/${username}`}>
									<img src={userImage} alt={username} />
								</Link>
							</div>

							<div className="reply__content">
								<h6>
									<Link to={`/users/${username}`}>
										{username}
									</Link>
								</h6>

								<div className="reply__meta">
									<p>
										<em>
											{" "}
											{typeof createdAt !== "number"
												? dayjs(
														new Date(
															createdAt._seconds! *
																1000
														)
												  ).format(
														"h:mm a, MMMM DD YYYY"
												  )
												: dayjs(
														new Date(
															createdAt * 1000
														)
												  ).format(
														"h:mm a, MMMM DD YYYY"
												  )}
										</em>
									</p>
								</div>

								<div className="reply__entry">
									<p>{body}</p>
								</div>

								<div className="reply__delete-btn">
									{deleteReplyBtn}
								</div>

								<div className="reply__edit-btn">
									{editReply}
								</div>
							</div>
						</div>
					);
				}
			)
		) : data.data.post.comments[props.index].repliesCount > 0 ? (
			<img
				className="spinner spinner--small"
				src={BookSpinner}
				alt="Spinner"
			/>
		) : (
			""
		);

	const customReplyInput = credentials.username ? (
		<ReplyForm commentId={props.commentId} />
	) : (
		""
	);
	return (
		<div className="reply-accordion">
			<div className="reply__accordion-head" onClick={handleSubmitReply}>
				{credentials.username ? "Reply" : ""}
			</div>

			<div
				id="btn"
				className="reply__accordion-body"
				onClick={handleSubmit}
			>
				<Accordion
					elevation={0}
					style={{
						backgroundColor: "transparent",
					}}
					expanded={expanded === "panel1"}
					onChange={handleChange("panel1")}
				>
					<AccordionSummary
						aria-controls="panel1d-content"
						id="panel1d-header"
						className="reply__accordion-summary"
					>
						<p>
							{data.data.post.comments[props.index].repliesCount >
							0
								? replyBarStatus
								: ""}
						</p>
					</AccordionSummary>

					<AccordionDetails>
						<div
							style={{
								width: "100%",
								textAlign: "left",
								wordWrap: "break-word",
							}}
						>
							{repliesMarkup}
							{customReplyInput}
						</div>
					</AccordionDetails>
				</Accordion>
			</div>
		</div>
	);
};

export default Reply;
