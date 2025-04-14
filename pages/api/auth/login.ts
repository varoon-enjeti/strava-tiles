import type { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";

const CLIENT_ID = "131710";
// const REDIRECT_URI = "http://localhost:3000/api/auth/callback";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const origin = new URL(
		req.url || "",
		`http://${req.headers.host}`
	).searchParams.get("origin");

	if (!origin) {
		return res.status(400).send("Missing origin for redirect_uri");
	}

	const REDIRECT_URI = `${origin}/api/auth/callback`;
	const stravaOAuth2URL = `http://www.strava.com/oauth/authorize?client_id= ${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
		REDIRECT_URI
	)}&approval_prompt=force&scope=activity:read_all`;
	res.redirect(stravaOAuth2URL);
}
