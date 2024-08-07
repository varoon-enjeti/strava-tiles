interface DayTile {
	date: Date;
}

export default function Tile({ date }: DayTile) {
	return (
		<div className="w-3 h-3 rounded group">
			<div className="w-full h-full bg-gray-300 rounded"></div>
			<span className="absolute scale-0 w-20 h-5 -mt-10 rounded bg-gray-300 border-[1px] border-gray-900 text-xs group-hover:scale-100 flex items-center justify-center">
				{date.toLocaleDateString()}
			</span>
		</div>
	);
}
