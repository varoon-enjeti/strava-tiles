"use client";
import { useState, useEffect, useRef } from "react";
import Tile from "../tile";
import Image from "next/image";
import { Activity } from "../activity";

type Athlete = {
	firstname: string;
	lastname: string;
	city: string;
	state: string;
	country: string;
	profile: string;
};

export default function AfterLogin({ onLogout }: { onLogout: () => void }) {
	const [activityMap, setActivityMap] = useState<Record<string, Activity[]>>(
		{}
	);
	const [grid, setGrid] = useState<JSX.Element[]>([]);
	const [today, setToday] = useState(new Date());
	const [athlete, setAthlete] = useState<Athlete | null>(null);

	// Fetch Activities

	useEffect(() => {
		console.log("fetching activities");
		const presentDay = new Date();
		const oneYearAgo = new Date();
		oneYearAgo.setDate(presentDay.getDate() - presentDay.getDay() - 364);
		const afterEpoch = Math.floor(oneYearAgo.getTime() / 1000);
		const beforeEpoch = Math.floor(presentDay.getTime() / 1000);

		fetch(
			`/api/activities/fetch?beforeEpoch=${beforeEpoch}&afterEpoch=${afterEpoch}`
		)
			.then((res) => res.json())
			.then((rawMap: Record<string, any[]>) => {
				const convertedMap: Record<string, Activity[]> = {};
				for (const date in rawMap) {
					convertedMap[date] = rawMap[date].map(
						(a) =>
							new Activity({
								name: a.name,
								type: a.type,
								date: a.date,
								distance: a.distance,
								elapsed_time: a.elapsed_time,
							})
					);
				}
				setActivityMap(convertedMap);
			})
			.catch((err) => {
				console.error("Failed to fetch activities: ", err);
			});
	}, []);

	// Grid Setup

	useEffect(() => {
		if (!today || Object.keys(activityMap).length === 0) return;

		const raw: JSX.Element[] = [];
		const presentDay = new Date();
		const oneYearAgo = new Date();
		oneYearAgo.setDate(presentDay.getDate() - presentDay.getDay() - 364);

		for (let i = 0; i < 7; i++) {
			const row: JSX.Element[] = [];

			for (let j = 0; j < 53; j++) {
				const inst = new Date(oneYearAgo.getTime());
				inst.setDate(oneYearAgo.getDate() + j * 7 + i);
				if (j === 52 && inst > presentDay) continue;

				const key = inst.toISOString().split("T")[0];
				const dayActivities = activityMap[key] || [];

				row.push(
					<Tile key={`${i}-${j}`} date={inst} activities={dayActivities} />
				);
			}

			raw.push(
				<div key={i} className="flex gap-1">
					{row}
				</div>
			);
		}

		setGrid(raw);
	}, [activityMap, today]);

	// Month Labels
	const monthLabels: JSX.Element[] = [];
	const oneYearAgo = new Date();
	oneYearAgo.setDate(today.getDate() - today.getDay() - 364);
	let lastMonth = -1;

	for (let j = 0; j < 53; j++) {
		const date = new Date(oneYearAgo.getTime());
		date.setDate(date.getDate() + j * 7);

		const month = date.getMonth(); // 0-11
		if (month !== lastMonth) {
			lastMonth = month;
			monthLabels.push(
				<div key={j} className="text-sm w-3 text-center">
					{date.toLocaleString("default", { month: "short" })}
				</div>
			);
		} else {
			monthLabels.push(<div key={j} className="w-3" />); // empty space
		}
	}

	// Athlete Profile Setup

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
				<div className="flex ml-[38px] gap-[4px] mb-[-1px]">{monthLabels}</div>
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
			<button
				className="bg-orange-600 text-white w-24 h-10 rounded-lg hover:scale-110 transition-all duration-300"
				onClick={logOut}
			>
				Log Out
			</button>
		</div>
	);
}
