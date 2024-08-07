interface DayTile {
	date: Date;
}

export default function Tile({ date }: DayTile) {
	return (
		<div className="w-3 h-3 bg-gray-300 rounded">
			<p className=""></p>
		</div>
	);
}
