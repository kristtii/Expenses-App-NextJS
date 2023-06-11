import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import toast from "../.././components/Toast";
function EditProfile() {
	const router = useRouter();
	const { userData, setUserData } = useContext(UserContext);
	const [input, setInput] = useState({
		fname: userData?.fname,
		lname: userData?.lname,
		email: userData?.email,
		password: userData?.password,
		cpassword: userData?.cpassword,
		image: userData?.image,
	});

	useEffect(() => {
		setInput(userData);
	}, [userData]);
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUserData("");
		router.push("/login");
	};
	const hii = (event) => {
		const { name, value } = event.target;
		setInput((prevalue) => {
			return {
				...prevalue,
				[name]: value,
			};
		});
	};
	const handleChangeI = (event) => {
		// console.log(event.target.files[0]);
		setInput({ ...input, image: event.target.files[0] });
	};
	const updateUser = async (event) => {
		const { fname, lname, email } = input;
		event.preventDefault();
		// debugger
		const formData = new FormData();
		formData.append("fname", input.fname);
		formData.append("lname", input.lname);
		formData.append("email", input.email);
		formData.append("password", input.password);
		formData.append("cpassword", input.cpassword);
		// formData.append('image', input?.image, input?.image.name);
		if (input.image && input.image !== userData.image) {
			formData.append("image", input.image, input.image.name);
		}
		const res = await fetch(
			`http://localhost:5000/user/updateuser/${userData._id}`,
			{
				method: "PUT",
				body: formData,
			}
		);
		const data1 = await res.json();
		if (res.status === 422 || !data1) {
			notify("error", data1.message);
		} else {
			notify("success", "Success!");
			// alert("User Updated");
			logout();
			router.push("/");
		}
	};
	const notify = React.useCallback((type, message) => {
		toast({ type, message });
	}, []);
	const dismiss = React.useCallback(() => {
		toast.dismiss();
	}, []);
	return (
		<>
			<div className="flex justify-center items-center h-full">
				<form>
					<div className="space-y-12 !bg-white max-w-xl p-10">
						<div className="border-b border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 text-gray-900">
								Edit Your Profile
							</h2>
							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div className="sm:col-span-3">
									<label
										htmlFor="first-name"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										First name
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="fname"
											onChange={hii}
											value={input?.fname}
											id="first-name"
											autoComplete="given-name"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div className="sm:col-span-3">
									<label
										htmlFor="last-name"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Last name
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="lname"
											id="last-name"
											onChange={hii}
											value={input?.lname}
											autoComplete="family-name"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div className="sm:col-span-4">
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Email address
									</label>
									<div className="mt-2">
										<input
											id="email"
											name="email"
											type="email"
											onChange={hii}
											value={input?.email}
											autoComplete="email"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div className="sm:col-span-3">
									<label
										htmlFor="password"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Password
									</label>
									<div className="mt-2">
										<input
											type="password"
											name="password"
											id="password"
											value={input?.password}
											onChange={hii}
											autoComplete="current-password"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
								<div className="sm:col-span-3">
									<label
										htmlFor="password"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Confirm Password
									</label>
									<div className="mt-2">
										<input
											type="password"
											name="cpassword"
											id="cpassword"
											value={input?.cpassword}
											onChange={hii}
											autoComplete="current-password"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
								<div className="sm:col-span-12">
									<label className="block text-sm font-medium leading-6 text-gray-900">
										User Image
									</label>

									<Image
										className="h-8 w-8 rounded-full"
										src={`http://localhost:5000/uploads/${userData?.image}`}
										alt=""
										width={500}
										height={500}
									/>
									<label
										htmlFor="image"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Select an new image
									</label>
									<input
										onChange={handleChangeI}
										type="file"
										className="form__input"
										name="image"
										id="image"
										placeholder="Select a Photo"
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-6 flex items-center justify-end gap-x-6">
						<Link href="/">
							<button
								type="button"
								className="text-sm font-semibold leading-6 "
							>
								Cancel
							</button>
						</Link>
						<button
							type="submit"
							className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={updateUser}
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
export default EditProfile;
