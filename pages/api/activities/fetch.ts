import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import axios from "axios";
import { after, before, beforeEach } from "node:test";
import { Activity } from "@/app/activity";
import { Noto_Sans_Imperial_Aramaic } from "next/font/google";

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

	let activityMap: Record<string, Activity[]> = {};
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

			const lastDate = response.data.at(-1).start_date_local;
			beforeEpoch = Math.floor(new Date(lastDate).getTime() / 1000);

			for (const a of response.data) {
				const activity = new Activity({
					name: a.name,
					type: a.type,
					date: a.start_date_local,
					distance: a.distance,
					elapsed_time: a.elapsed_time,
				});

				if (!activityMap[activity.date]) {
					activityMap[activity.date] = [];
				}
				activityMap[activity.date].push(activity);
			}
		}

		console.log(activityMap);

		res.status(200).json(activityMap);
	} catch (error: any) {
		console.error(
			"Failed to fetch activities:",
			error.response?.data || error.message
		);
		res.status(500).json({ error: "Failed to fetch activities from Strava" });
	}
}
