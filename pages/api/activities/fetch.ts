import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import axios from "axios";
import { after, before, beforeEach } from "node:test";
import { Activity } from "@/app/activity";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let beforeEpoch = parseInt(req.query.beforeEpoch as string);
	const afterEpoch = parseInt(req.query.afterEpoch as string);

	if (!beforeEpoch) {
		return res.status(400).send("Missing beforeEpoch");
	}

	if (!afterEpoch) {
		return res.status(400).send("Missing afterEpoch");
	}

	const cookies = parse(req.headers.cookie || "");
	const token = cookies.strava_access_token;

	if (!token) {
		return res
			.status(401)
			.json({ error: "Access token not found. Please log in." });
	}

	// console.log(token);

	let activities: Activity[] = [];
	const per_page = 200;

	try {
		while (true) {
			const response = await axios.get(
				"https://www.strava.com/api/v3/athlete/activities",
				{
					headers: { Authorization: "Bearer " + token },
					params: {
						before: beforeEpoch,
						after: afterEpoch,
						per_page: per_page,
					},
				}
			);

			if (Object.keys(response.data).length === 0) {
				break;
			}

			const lastDate = response.data.at(-1).start_date;
			beforeEpoch = Math.floor(new Date(lastDate).getTime() / 1000);

			const currActivities: Activity[] = response.data.map(
				(a: any) =>
					new Activity({
						name: a.name,
						type: a.type,
						date: a.start_date,
						distance: a.distance,
						elapsed_time: a.elapsed_time,
					})
			);

			activities.push(...currActivities);
		}

		// console.log(activities);

		console.log(activities.length);

		// console.log(response.data[0].start_date);

		// console.log(Object.keys(response.data).length);
		res.status(200).json(activities);
	} catch (error: any) {
		console.error(
			"Failed to fetch activities:",
			// error.response?.data || error.message
			error
		);
		res.status(500).json({ error: "Failed to fetch activities from Strava" });
	}
}
