export default function beforeLogin() {
	return (
		<div className="">
			Before Login
			<button
				className="bg-orange-500 text-white h-10 w-32 rounded-lg hover:scale-110 transition-all duration-300"
				onClick={() => (window.location.href = "api/auth/login")}
			>
				Strava OAuth
			</button>
		</div>
	);
}
