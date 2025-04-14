import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize } from "cookie";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const CODE = req.query.code as string;

	if (!CODE) {
		return res.status(400).send("Missing Authorization Code");
	}

	try {
		const response = await axios.post("https://www.strava.com/oauth/token", {
			client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
			client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
			code: CODE,
			grant_type: "authorization_code",
		});

		const accessToken = response.data.access_token;
		const athlete = response.data.athlete;

		const athleteEncoded = Buffer.from(JSON.stringify(athlete)).toString(
			"base64"
		);

		res.setHeader("Set-Cookie", [
			serialize("strava_access_token", accessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				path: "/",
				maxAge: 60 * 60 * 6,
			}),
			serialize("strava_athlete", athleteEncoded, {
				httpOnly: false, // accessible to client
				secure: process.env.NODE_ENV === "production",
				path: "/",
				maxAge: 60 * 60 * 6,
			}),
		]);

		res.redirect("/?logged_in=true");
	} catch (error: any) {
		console.error("Token exchange failed:", {
			message: error.message,
			status: error.response?.status,
			data: error.response?.data,
		});
		res.status(500).send("Token exchange failed");
	}
}
