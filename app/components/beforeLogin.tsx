"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function BeforeLogin() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-1">
			<Image
				className="bg-orange-500 text-white h-[36px] w-[177.5px] rounded-lg hover:scale-110 transition-all duration-300"
				src="/strava_button.png"
				width={474}
				height={96}
				alt="Connect with Strava Button"
				onClick={() => {
					const origin = window.location.origin;
					window.location.href = `api/auth/login?origin=${encodeURIComponent(
						origin
					)}`;
				}}
			/>
		</div>
	);
}
