import React from "react";
import Link from "next/link";
import buildClient from "../api/buildClient";

const LandingPage = ({ user }) => {
	return (
		<div>
			<h1>Landing Page</h1>
			<Link href="/about">About</Link> | <Link href="/auth/signup">Sign Up</Link>
		</div>
	);
};

LandingPage.getInitialProps = async (context) => {
	const client = buildClient(context);
	const { data } = await client.get("/api/users/currentuser").catch((error) => {
		const errorsArr = error.response.data.errors;
		setErrors(errorsArr);
		errorsArr.forEach((error) => {
			errorToast(JSON.stringify(error.message));
		});
	});

	return {
		user: data,
	};
};

export default LandingPage;
