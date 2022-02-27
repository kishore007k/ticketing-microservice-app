import React from "react";
import Link from "next/link";

const LandingPage = () => {
	return (
		<div>
			<h1>Landing Page</h1>
			<Link href="/about">About</Link>
			<Link href="/auth/signup">Sign Up</Link>
		</div>
	);
};

export default LandingPage;
