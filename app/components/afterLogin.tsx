"use client";
import { useState, useEffect } from "react";
import Tile from "../tile";

export default function AfterLogin() {
	const [grid, setGrid] = useState<JSX.Element[]>([]);
	const [today, setToday] = useState(new Date());

	useEffect(() => {
		const raw: JSX.Element[] = [];
		const currentToday = new Date();
		const reference = new Date();
		reference.setDate(currentToday.getDate() - currentToday.getDay() - 364);

		for (let i = 0; i < 7; i++) {
			const row: JSX.Element[] = [];

			// i represents the day of the week (row), and j represents the week (column)
			for (let j = 0; j < 53; j++) {
				const inst = new Date(reference);
				inst.setDate(reference.getDate() + j * 7 + i);
				if (j === 52 && inst > currentToday) {
					continue;
				}
				row.push(<Tile key={`${i}-${j}`} date={inst} />);
			}
			raw.push(
				<div key={i} className="flex gap-1">
					{row}
				</div>
			);
		}

		setGrid(raw);
		setToday(currentToday);
	}, []);

	return (
		<div className="w-full h-full flex flex-col gap-1 justify-center items-center">
			<div className="flex gap-2">
				<div className="flex flex-col mt-3 gap-[12px]">
					<div className="text-sm">Mon</div>
					<div className="text-sm">Wed</div>
					<div className="text-sm">Fri</div>
				</div>
				<div className="items-start flex flex-col gap-1">{grid}</div>
			</div>
			<div className="">{today.toDateString()}</div>
		</div>
	);
}
