import axios from "axios";
import { error } from "console";
import { Activity } from "./activity";

const fetchActivities = async () => {
	const url = "https://www.strava.com/api/v3/athlete/activities?";
	const accessToken = "";
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
		console.error("Error Fetching Activities:", error);
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

// const test = async () => {
// 	let res = await formattedActivities();
// 	console.log(res);
// };

// test();
