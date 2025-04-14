import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import axios from "axios";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const cookies = parse(req.headers.cookie || "");
	const token = cookies.strava_access_token;

	if (!token) {
		return res
			.status(401)
			.json({ error: "Access token not found. Please log in." });
	}

	try {
		const response = await axios.get(
			"https://www.strava.com/api/v3/athlete/activities",
			{
				params: { access_token: token },
			}
		);

		console.log(response.data);
		res.status(200).json(response.data);
	} catch (error: any) {
		console.error(
			"Failed to fetch activities:",
			error.response?.data || error.message
		);
		res.status(500).json({ error: "Failed to fetch activities from Strava" });
	}
}
