import { Activity } from "./activity";
import { Duration } from "luxon";

interface DayTileProps {
	date: Date;
	activities: Activity[];
}

export default function Tile({ date, activities }: DayTileProps) {
	const totalSeconds = activities.reduce(
		(acc, a) => acc + a.raw_elapsed_seconds,
		0
	);
	const totalFormatted = Duration.fromObject({
		seconds: totalSeconds,
	}).toFormat("hh:mm:ss");

	console.log(totalFormatted);

	return (
		<div className="w-3 h-3 rounded group">
			<div className="w-full h-full bg-gray-300 rounded"></div>
			<span className="absolute scale-0 -mt-10 rounded-lg bg-gray-300 border-[1px] border-gray-900 text-xs group-hover:scale-100 flex flex-col p-1 items-start">
				<div className="font-semibold">{date.toLocaleDateString()}</div>
				{activities.map((activity, idx) => (
					<div className="" key={idx}>
						{activity.type}: {activity.elapsed_time}
					</div>
				))}
				<div className="mt-1 font-semibold">Total: {totalFormatted}</div>
			</span>
		</div>
	);
}
