import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Layout = ({ user }) => {
	const router = useRouter();
	const nav = router.pathname.split("/");
	return (
		<div
			className={
				nav[1] === ""
					? `bg-indigo-800 bg-opacity-5 overflow-auto fixed left-0 right-0 top-0`
					: `bg-indigo-800 overflow-auto fixed left-0 right-0 top-0`
			}
		>
			<div>
				<div className="md:max-w-6xl md:mx-auto md:flex md:items-center md:justify-between">
					<div className="flex justify-between items-center">
						<Link href="/">
							<div className="inline-block text-4xl font-bold cursor-pointer">🎫</div>
						</Link>
						<div className="inline-block cursor-pointer md:hidden">
							<div className="bg-gray-400 w-8 mb-2 h-[2px]"></div>
							<div className="bg-gray-400 w-8 mb-2 h-[2px]"></div>
							<div className="bg-gray-400 w-8 h-[2px]"></div>
						</div>
					</div>

					<div>
						<div className="hidden md:block">
							<Link href="/">
								<div className="inline-block py-1 md:py-4 text-gray-100 mr-6 font-bold cursor-pointer">
									How it Works
								</div>
							</Link>
							<Link href="/">
								<div className="inline-block py-1 md:py-4 text-gray-200 hover:text-gray-100 mr-6 cursor-pointer">
									Services
								</div>
							</Link>
							<Link href="/">
								<div className="inline-block py-1 md:py-4 text-gray-200 hover:text-gray-100 cursor-pointer">
									Blog
								</div>
							</Link>
						</div>
					</div>
					<div className="hidden md:block">
						{user && user.currentUser !== null ? (
							<Link href="/auth/signout">
								<div
									className="md:py-2 text-slate-50 rounded-md
								bg-indigo-500 py-1 px-5 hover:text-gray-100 mr-6 cursor-pointer"
								>
									Sign Out
								</div>
							</Link>
						) : (
							<div className="flex items-center justify-center space-x-5 px-5">
								<Link href="/auth/signin">
									<div className="inline-block py-1 md:py-4 text-slate-100 hover:text-gray-100 cursor-pointer">
										Login
									</div>
								</Link>
								<Link href="/auth/signup">
									<div
										className="md:py-2 text-slate-50 rounded-md
										bg-indigo-500 py-1 px-5 hover:text-gray-100 cursor-pointer"
									>
										Sign Up
									</div>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
