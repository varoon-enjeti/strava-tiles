import { Duration } from "luxon";

export class Activity {
	name: string;
	type: string;
	date: string;
	distance: number; // miles
	elapsed_time: string; // hh:mm:ss
	raw_elapsed_seconds: number;

	constructor({
		name,
		type,
		date,
		distance,
		elapsed_time,
	}: {
		name: string;
		type: string;
		date: string;
		distance: number;
		elapsed_time: number;
	}) {
		this.name = name;
		this.type = type;
		this.date = new Date(date).toISOString().split("T")[0];
		this.distance = Math.round((distance / 1609.34) * 100) / 100;
		this.elapsed_time = Duration.fromObject({ seconds: elapsed_time }).toFormat(
			"hh:mm:ss"
		);
		this.raw_elapsed_seconds = elapsed_time;
	}
}
