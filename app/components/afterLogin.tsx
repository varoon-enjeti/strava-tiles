"use client";
import { useState, useEffect } from "react";
import Tile from "../tile";
import Image from "next/image";

type Athlete = {
	firstname: string;
	lastname: string;
	city: string;
	state: string;
	country: string;
	profile: string;
};

export default function AfterLogin({ onLogout }: { onLogout: () => void }) {
	// Grid Setup

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

	// Athlete Profile Setup

	const [athlete, setAthlete] = useState<Athlete | null>(null);

	useEffect(() => {
		const cookies = Object.fromEntries(
			document.cookie.split("; ").map((c) => {
				const [k, ...v] = c.split("=");
				return [k, v.join("=")];
			})
		);

		if (cookies.strava_athlete) {
			try {
				const decoded = atob(cookies.strava_athlete);
				const parsed = JSON.parse(decoded);

				const cleaned: Athlete = {
					firstname: parsed.firstname,
					lastname: parsed.lastname,
					city: parsed.city,
					state: parsed.state,
					country: parsed.country,
					profile: parsed.profile,
				};

				setAthlete(cleaned);
			} catch (err) {
				console.error("Failed to parse athlete cookie", err);
			}
		}
	}, []);

	// Log Out Button Handler

	function logOut() {
		localStorage.setItem("strava_logged_in", "false");
		onLogout();
	}

	// TSX Code

	return (
		<div className="w-full h-full flex flex-col gap-6 justify-center items-center">
			<div className="flex gap-3 w-[810px] h-[90px]">
				{athlete?.profile && (
					<Image
						className="rounded-full border-[2.5px] border-orange-600"
						src={athlete?.profile}
						width={90}
						height={90}
						alt="Profile Picture"
					/>
				)}
				<div className="flex flex-col gap-1">
					<div className="h-[50px] text-[40px] font-semibold text-center">
						{athlete?.firstname + " " + athlete?.lastname}
					</div>
					<div className="text-gray-600">
						{athlete?.city + ", " + athlete?.state + ", " + athlete?.country}
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center gap-2">
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
			<div className="">Damn {athlete?.firstname}, you chopped bruh...</div>
			<button
				className="bg-orange-600 text-white w-24 h-10 rounded-lg hover:scale-110 transition-all duration-300"
				onClick={logOut}
			>
				Log Out
			</button>
			{/* <button
				className="bg-orange-600 text-white w-24 h-10 rounded-lg hover:scale-110 transition-all duration-300"
				onClick={() => (window.location.href = "api/activities/fetch")}
			>
				Fetch
			</button> */}
		</div>
	);
}
