import type { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const origin = new URL(
		req.url || "",
		`http://${req.headers.host}`
	).searchParams.get("origin");

	if (!origin) {
		return res.status(400).send("Missing origin for redirect_uri");
	}

	const REDIRECT_URI = `${origin}/api/auth/callback`;
	console.log(REDIRECT_URI);

	const stravaOAuth2URL = `http://www.strava.com/oauth/authorize?client_id= ${process.env.NEXT_PUBLIC_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=activity:read_all`;
	res.redirect(stravaOAuth2URL);
}
