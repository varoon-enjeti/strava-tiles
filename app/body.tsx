import { GetServerSideProps } from "next";
import Tile from "./tile";

export default function Body() {
	const raw = [];

	const today = new Date();
	const reference = new Date();
	reference.setDate(today.getDate() - today.getDay() - 364);

	for (let i = 0; i < 7; i++) {
		const row = [];
		// const curr = new Date();
		// curr.setDate(reference.getDate() + i);
		for (let j = 0; j < 52; j++) {
			const inst = new Date();
			inst.setDate(reference.getDate() + j * 7 + i);
			inst.setFullYear(inst.getFullYear() - 1);
			row.push(<Tile date={inst} />);
			// curr.setDate(curr.getDate() + 7);
			console.log(inst.toDateString() + "\n");
		}
		raw.push(row);
	}

	const format = [];
	for (const row of raw) {
		format.push(<div className="flex gap-1">{row}</div>);
	}

	const test1 = new Date();
	test1.setDate(reference.getDate() + 7);
	const test2 = new Date();
	test2.setDate(reference.getDate() + 7);

	return (
		<div className="w-full h-full flex flex-col gap-1 justify-center items-center">
			{format}
			<div className="">{test1.toDateString()}</div>
		</div>
	);
}
