import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookSpinner from "../../../photos/bookSpinner.svg";
import ReplyForm from "../ReplyForm/ReplyForm";
import useReduxSelector from "../../../hooks/useReduxSelector";
//MUI
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from "@material-ui/core";
import DeletePopup from "../../Common/DeletePopup/DeletePopup";
import EditPopup from "../../Common/EditPopup/EditPopup";
//Dayjs
import dayjs from "dayjs";
//Redux
import { useDispatch } from "react-redux";
import {
	getReplies,
	deleteReply,
	editReply,
} from "../../../redux/actions/replyActions";
//Interfaces
import { ReplyData } from "../../../utils/Interfaces";

interface ReplyProps {
	commentId: string;
	index: number;
	repliesCount: number;
}

const Reply = (props: ReplyProps) => {
	const [expanded, setExpanded] = useState<boolean | string>(false);
	const [replyBarStatus, setReplyBarStatus] = useState<string>("");

	useEffect(() => {
		if (props.repliesCount === 1) {
			setReplyBarStatus(`${props.repliesCount} Reply`);
		} else if (props.repliesCount > 1) {
			setReplyBarStatus(`${props.repliesCount} Replies`);
		}
	}, [props.repliesCount]);

	const data = useReduxSelector();
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
			} else {
				setExpanded(false);
				setReplyBarStatus(`${props.repliesCount} Replies`);
			}
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

					const editReplyBtn =
						credentials.username === username ? (
							<EditPopup
								elementId={replyId}
								body={body}
								editElementObject={editReply}
								text="reply"
							/>
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
									{editReplyBtn}
								</div>
							</div>
						</div>
					);
				}
			)
		) : data.data.post.comments[props.index].repliesCount > 0 ? (
			<img
				className="spinner spinner--small spinner--left-aligned"
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
				{replyBarStatus}
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
