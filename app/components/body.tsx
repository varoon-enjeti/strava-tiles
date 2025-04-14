"use client";
import { useState, useEffect } from "react";
import BeforeLogin from "./beforeLogin";
import AfterLogin from "./afterLogin";

export default function Body() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const loggedIn = params.get("logged_in");

		if (loggedIn === "true") {
			localStorage.setItem("strava_logged_in", "true");
			setIsLoggedIn(true);

			const cleanUrl = window.location.origin + window.location.pathname;
			window.history.replaceState({}, document.title, cleanUrl);
		} else {
			const stored = localStorage.getItem("strava_logged_in");
			setIsLoggedIn(stored === "true");
		}
	}, []);

	return (
		<div className="w-full h-full flex flex-col gap-1 justify-center items-center">
			{isLoggedIn ? (
				<AfterLogin onLogout={() => setIsLoggedIn(false)} />
			) : (
				<BeforeLogin />
			)}
		</div>
	);
}
