import type { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";

const CLIENT_ID = "131710";
// const REDIRECT_URI = "http://localhost:3000/api/auth/callback";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const REDIRECT_URI = req.url?.split("currentURI=")[1] + "api/auth/callback";
	const stravaOAuth2URL = `http://www.strava.com/oauth/authorize?client_id= ${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=activity:read_all`;
	res.redirect(stravaOAuth2URL);
}
