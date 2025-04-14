import { Duration } from "luxon";

export class Activity {
	id: number;
	activity_name: string;
	activity_type: string;
	date: Date;
	distance: number; // miles
	elapsed_time: string; // hh:mm:ss

	constructor({
		id,
		activity_name,
		activity_type,
		date,
		distance,
		elapsed_time,
	}: {
		id: number;
		activity_name: string;
		activity_type: string;
		date: string;
		distance: number;
		elapsed_time: number;
	}) {
		this.id = id;
		this.activity_name = activity_name;
		this.activity_type = activity_type;
		this.date = new Date(date);
		this.distance = Math.round((distance / 1609.34) * 100) / 100;
		this.elapsed_time = Duration.fromObject({ seconds: elapsed_time }).toFormat(
			"hh:mm:ss"
		);
	}
}
