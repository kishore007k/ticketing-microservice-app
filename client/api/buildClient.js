import axios from "axios";

const buildClient = ({ req }) => {
	if (process.browser) {
		// we are in the browser
		return axios.create({
			baseURL: "/",
		});
	} else {
		// we are on the server
		return axios.create({
			baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
			headers: req.headers,
		});
	}
};

export default buildClient;
