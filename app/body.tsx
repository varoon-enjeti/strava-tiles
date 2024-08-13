import { GetServerSideProps } from "next";
import Tile from "./tile";

export default function Body() {
	const raw = [];

	const today = new Date();
	const reference = new Date();
	reference.setDate(today.getDate() - today.getDay() - 364);

	for (let i = 0; i < 7; i++) {
		const row = [];

		// i represents the day of the week (row), and j represents the week (column)
		for (let j = 0; j < 53; j++) {
			const inst = new Date(reference);
			inst.setDate(reference.getDate() + j * 7 + i);
			if (j === 52) {
				console.log(inst);
				if (inst > today) {
					console.log("no");
					continue;
				}
			}
			row.push(<Tile date={inst} />);
		}
		raw.push(row);
	}

	const format = [];
	for (const row of raw) {
		format.push(<div className="flex gap-1">{row}</div>);
	}

	return (
		<div className="w-full h-full flex flex-col gap-1 justify-center items-center">
			<div className="items-start flex flex-col gap-1">{format}</div>
			<div className="">{today.toDateString()}</div>
		</div>
	);
}
