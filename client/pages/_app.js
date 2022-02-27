import "../styles.css";
import "tailwindcss/tailwind.css";
import buildClient from "../api/buildClient";
import { errorToast } from "../components/Toast";
import Layout from "../components/Layout";

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<>
			<Layout user={currentUser} />
			<Component {...pageProps} />
		</>
	);
};

AppComponent.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);
	const { data } = await client.get("/api/users/currentuser").catch((error) => {
		const errorsArr = error.response.data.errors;
		errorsArr.forEach((error) => {
			errorToast(JSON.stringify(error.message));
		});
	});

	// This will be used to pass the current user to the page through the pageProps
	let pageProps = {};

	if (appContext.Component.getInitialProps) {
		// this will initiate getInitialProps of that are used in every page where defined
		pageProps = await appContext.Component.getInitialProps(appContext.ctx);
	}

	return {
		pageProps,
		...data,
	};
};

export default AppComponent;
