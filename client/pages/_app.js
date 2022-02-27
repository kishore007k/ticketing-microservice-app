import "../styles.css";
import "tailwindcss/tailwind.css";

export default ({ Component, pageProps }) => {
	return (
		<div>
			<Component {...pageProps} />
		</div>
	);
};
