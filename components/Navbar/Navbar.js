import React, { useContext } from "react";
import logo from "../../assets/images/ExpenseAppLogo.png";
import Namelogo from "../../assets/images/TrackIT.png";
import Image from "next/image";
import UserContext from "../../context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const router = useRouter();
	const { userData, setUserData } = useContext(UserContext);
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUserData("");
		router.push("/login");
	};
	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">
										Open main menu
									</span>
									{open ? (
										<XMarkIcon
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									) : (
										<Bars3Icon
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex flex-shrink-0 items-center">
									<Link href="/">
										<Image
											className="block h-10 w-auto lg:hidden"
											src={logo}
											alt="Logo"
										/>
									</Link>
									<Link href="/">
										<Image
											className="hidden h-10 w-auto lg:block"
											src={logo}
											alt="Logo"
										/>
									</Link>
								</div>
							</div>
							<div className="flex-1 flex-shrink-0">
								<Link href="/">
									<Image
										className="block h-8 w-auto lg:hidden"
										src={Namelogo}
										alt="Logo"
									/>
								</Link>
								<Link href="/">
									<Image
										className="hidden h-8 w-auto lg:block"
										src={Namelogo}
										alt="Logo"
									/>
								</Link>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{userData?.fname ? (
									<h1 className="capitalize">
										{userData?.fname +
											" " +
											userData?.lname}
									</h1>
								) : (
									""
								)}
								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										{userData?.fname ? (
											<Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
												<span className="sr-only">
													Open user menu
												</span>
												<Image
													className="h-8 w-8 rounded-full"
													src={`http://localhost:5000/uploads/${userData?.image}`}
													alt=""
													width="500"
													height="500"
												/>
											</Menu.Button>
										) : (
											<Link href="/login">Login</Link>
										)}
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											{userData?.fname ? (
												<>
													<Menu.Item>
														{({ active }) => (
															<Link
																href="/EditProfile"
																className={classNames(
																	active
																		? "bg-gray-100"
																		: "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
															>
																Settings
															</Link>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<a
																href="#"
																className={classNames(
																	active
																		? "bg-gray-100"
																		: "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
																onClick={logout}
															>
																Sign out
															</a>
														)}
													</Menu.Item>
												</>
											) : (
												<Menu.Item>
													{({ active }) => (
														<Link
															href="/login"
															className={classNames(
																active
																	? "bg-gray-100"
																	: "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Login
														</Link>
													)}
												</Menu.Item>
											)}
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>
				</>
			)}
		</Disclosure>
	);
}
