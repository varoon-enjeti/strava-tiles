"use client";
import { useState, useEffect } from "react";

export default function BeforeLogin() {
	return (
		<div className="flex flex-col items-center justify-centerw-full h-full flex flex-col gap-1 justify-center items-center">
			<button
				className="bg-orange-500 text-white h-10 w-32 rounded-lg hover:scale-110 transition-all duration-300"
				onClick={() =>
					(window.location.href = `api/auth/login?currentURI=${window.location.href}`)
				}
			>
				Strava OAuth
			</button>
		</div>
	);
}
