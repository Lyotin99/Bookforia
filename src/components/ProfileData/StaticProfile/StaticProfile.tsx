import { Link } from "react-router-dom";

import StarIcon from "../../../photos/ico-star.svg";
import QuoteIcon from "../../../photos/ico-quote.svg";
import DescIcon from "../../../photos/ico-desc.svg";
import PersonIcon from "../../../photos/ico-person.svg";
//MUI
import { LocationOn, CalendarToday } from "@material-ui/icons";
import LinkIcon from "@material-ui/icons/Link";
//Dayjs
import dayjs from "dayjs";
//Interfaces
import { Credentials } from "../../../utils/postInterfaces";

interface Props {
	profile: Credentials;
}

function StaticProfile(props: Props) {
	const {
		profile: {
			username,
			createdAt,
			imageUrl,
			bio,
			website,
			location,
			favoriteBooks,
			favoriteQuote,
		},
	} = props;

	return (
		<div className="profile">
			<div className="profile__img image-fit">
				<img src={imageUrl} alt={username} />
			</div>

			<div className="profile__content">
				<ul>
					<li className="profile__username">
						<img src={PersonIcon} alt="Person icon" />

						{username}
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
		</div>
	);
}
export default StaticProfile;
