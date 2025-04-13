import express from "express";
import axios from "axios";
import { Activity } from "./activity";

const app = express();
const PORT = 3000;

const CLIENT_ID = "131710";
const REDIRECT_URI = "http://localhost:3000";

app.get("/auth/strava", (req, res) => {
	const stravaOAuth2URL = `http://www.strava.com/oauth/authorize?client_id= ${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=activity:read_all`;
	res.redirect(stravaOAuth2URL);
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
