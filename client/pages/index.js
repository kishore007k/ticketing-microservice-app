import React from "react";
import buildClient from "../api/buildClient";
import {
	SvelteLogo,
	VueLogo,
	ReactLogo,
	AngularLogo,
} from "../components/Images";
import Layout from "../components/Layout";

const LandingPage = ({ user }) => {
	return (
		<div className="bg-gradient-to-br from-indigo-900 to-green-900 min-h-screen h-full px-4">
			<div className="container mx-auto">
				<div className="pt-40 w-4/5">
					<h1 className="text-white text-6xl font-bold">
						The fastest, most secure dev environment <br />
						<span className="text-blue-400">on the planet.</span>
					</h1>
				</div>
				<div className="w-5/6 my-10 ml-6">
					<h3 className="text-gray-300">
						Create, edit & deploy fullstack apps with <br />
						<strong className="text-white">
							faster package installations & greater security
						</strong>
						<br />
						than even local environments.
					</h3>
				</div>
				<div className="hidden sm:block opacity-50 z-0">
					<div className="shadow-2xl w-96 h-96 rounded-full -mt-72"></div>
					<div className="shadow-2xl w-96 h-96 rounded-full -mt-96"></div>
					<div className="shadow-xl w-80 h-80 rounded-full ml-8 -mt-96"></div>
				</div>
				<div className="text-white relative">
					<h3 className="text-uppercase font-semibold">Frameworks & Libraries</h3>
					<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-5 uppercase">
						<div className="group flex items-center bg-indigo-900 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 mt-5 cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition">
							<AngularLogo />
							<div>
								<span>Angular</span>
								<span className="text-xs text-blue-300 block">Typescript</span>
							</div>
							<div>
								<i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
							</div>
						</div>

						<div className="group flex items-center bg-indigo-900 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 mt-5 cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition">
							<ReactLogo />
							<div>
								<span>React</span>
								<span className="text-xs text-blue-300 block">Javascript</span>
							</div>
							<div>
								<i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
							</div>
						</div>

						<div className="group flex items-center bg-indigo-900 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 mt-5 cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition">
							<VueLogo />
							<div>
								<span>Vue</span>
								<span className="text-xs text-blue-300 block">v3 (beta)</span>
							</div>
							<div>
								<i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
							</div>
						</div>

						<div className="group flex items-center bg-indigo-900 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 mt-5 cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition">
							<SvelteLogo />
							<div>
								<span>Svelte</span>
								<span className="text-xs text-blue-300 block">Javascript</span>
							</div>
							<div>
								<i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
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
