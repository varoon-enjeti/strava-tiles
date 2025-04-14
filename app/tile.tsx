import { Activity } from "./activity";
import { Duration } from "luxon";

interface DayTileProps {
	date: Date;
	activities: Activity[];
	isLoaded: boolean;
}

export default function Tile({ date, activities, isLoaded }: DayTileProps) {
	const totalSeconds = activities.reduce(
		(acc, a) => acc + a.raw_elapsed_seconds,
		0
	);
	const totalFormatted = Duration.fromObject({
		seconds: totalSeconds,
	}).toFormat("hh:mm:ss");

	let color = "bg-gray-300";
	if (totalSeconds > 0 && totalSeconds <= 1800) {
		color = "bg-orange-200";
	} else if (totalSeconds > 1800 && totalSeconds <= 3600) {
		color = "bg-orange-300";
	} else if (totalSeconds > 3600 && totalSeconds <= 7200) {
		color = "bg-orange-500";
	} else if (totalSeconds > 7200) {
		color = "bg-orange-700";
	}

	if (!isLoaded) {
		color = "bg-gray-300";
	}

	return (
		<div className="relative w-3 h-3 group">
			<div
				className={`w-full h-full ${color} transition-colors duration-700 rounded`}
			></div>

			<div className="absolute left-0 bottom-0 translate-y-[0px] scale-0 group-hover:scale-100 transition-transform z-10 bg-gray-300 border border-gray-900 text-xs rounded p-1 flex flex-col items-start w-max max-w-[10rem] whitespace-nowrap shadow-lg">
				<div className="font-semibold">{date.toLocaleDateString()}</div>
				{activities.map((activity, idx) => (
					<div key={idx}>
						{activity.type}: {activity.elapsed_time}
					</div>
				))}
				<div className="mt-1 font-semibold">
					Total:{" "}
					{Duration.fromObject({ seconds: totalSeconds }).toFormat("hh:mm:ss")}
				</div>
			</div>
		</div>
	);
}
