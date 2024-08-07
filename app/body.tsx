import { GetServerSideProps } from "next";
import Tile from "./tile";

export default function Body() {
	const raw = [];

	for (let i = 0; i < 7; i++) {
		const row = [];
		for (let j = 0; j < 52; j++) {
			row.push(<Tile />);
		}
		raw.push(row);
	}

	const format = [];
	for (const row of raw) {
		format.push(<div className="flex gap-1">{row}</div>);
	}

	const date = new Date();

	const pastDate = new Date(date);
	pastDate.setDate(date.getDate() - 365);

	return (
		<div className="w-full h-full flex flex-col gap-1 justify-center items-center">
			{format}
			<div className="">{pastDate.toUTCString()}</div>
		</div>
	);
}
