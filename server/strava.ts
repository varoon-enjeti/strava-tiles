import express from "express";
import axios from "axios";
import { error } from "console";
import { Activity } from "./activity";

const CLIENT_ID = "131710";

const getAthlete = async () => {
	const url = "https://www.strava.com/api/v3/athlete";
	const accessToken = "1864c3345b70a1ed51f6011bd80efe55115911c1";

	try {
		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error Fetching Athlete: ", error);
	}
};

// const StravaOAuth2 = async () => {
// 	const url = `http://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&approval_prompt=force&scope=activity:read_all`;
// 	const test = "/";

// 	try {
// 		const response = await axios.get(test);
// 		console.log(response);
// 	} catch (error) {
// 		console.error("Error Fetching OAuth2 Response: ", error);
// 	}
// };

const fetchActivities = async () => {
	const url = "https://www.strava.com/api/v3/athlete/activities?";
	const accessToken = "984d07c3a4df0322cb67d5ad9be24477ad140f05";
	const after_epoch = "1704067200";
	const per_page = 200;

	try {
		const response = await axios.get(url, {
			params: {
				access_token: accessToken,
				after: after_epoch,
				per_page: per_page,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error Fetching Activities: ", error);
	}
};

export const formattedActivities = async (): Promise<Activity[]> => {
	try {
		const activities = await fetchActivities();
		let allActivities: Activity[] = [];

		for (let i = 0; i < activities.length; i++) {
			const curr = activities[i];
			const currFormattedActivity = new Activity({
				id: i,
				activity_name: curr.name,
				activity_type: curr.sport_type,
				date: curr.start_date_local,
				distance: curr.distance,
				elapsed_time: curr.elapsed_time,
			});
			allActivities.push(currFormattedActivity);
		}

		return allActivities;
	} catch (error) {
		console.error("Error fetching and formatting activities:", error);
		return [];
	}
};

const test = async () => {
	await StravaOAuth2();
	// let athleteRes = await getAthlete();
	// console.log(athleteRes);

	// let res = await formattedActivities();
	// console.log(res);
};

test();
