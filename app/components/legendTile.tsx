interface LegendTileProps {
	text: string;
	color: string;
}

export default function LegendTile({ text, color }: LegendTileProps) {
	return (
		<div className="relative w-3 h-3 group">
			<div
				className={`w-full h-full ${color} transition-colors duration-700n rounded`}
			></div>
			<div className="absolute left-0 bottom-0 translate-y-[0px] scale-0 group-hover:scale-100 transition-transform z-10 bg-gray-300 border border-gray-900 text-xs rounded p-1 flex flex-col items-start w-max max-w-[10rem] whitespace-nowrap shadow-lg">
				<div className="font-semibold">{text}</div>
			</div>
		</div>
	);
}
