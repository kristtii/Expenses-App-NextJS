/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "../.././components/Toast";
import style from "../styles/editProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [passwordError, setPasswordError] = useState(""); // State to store the password error message

	useEffect(() => {
		setInput(userData);
	}, [userData]);

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUserData("");
		router.push("/login");
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setInput((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleImageChange = (event) => {
		setInput((prevState) => ({
			...prevState,
			image: event.target.files[0],
		}));
	};

	const validatePassword = (password) => {
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordRegex.test(password);
	};

	const updateUser = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("fname", input.fname);
		formData.append("lname", input.lname);
		formData.append("email", input.email);
		formData.append("password", input.password);
		formData.append("cpassword", input.cpassword);

		if (input.image && input.image !== userData.image) {
			formData.append("image", input.image, input.image.name);
		}

		if (!validatePassword(input.password)) {
			setPasswordError(
				"Password must contain at least 8 characters, including capital letters, lowercase letters, numbers, and symbols."
			);
			return;
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

	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(
			(prevShowConfirmPassword) => !prevShowConfirmPassword
		);
	};

	return (
		<>
			<div className={style["edit-profile"]}>
				<form>
					<div className={style["edit-profile"]}>
						<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
							<h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight">
								Edit Your Profile
							</h2>
							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div className="sm:col-span-full">
									<label
										htmlFor="first-name"
										className="text-left block text-sm font-medium leading-6 text-white"
									>
										First name
									</label>
									<div className={style["edit-fields"]}>
										<input
											type="text"
											name="fname"
											onChange={handleInputChange}
											value={input?.fname}
											id="first-name"
											autoComplete="given-name"
										/>
									</div>
								</div>

								<div className="sm:col-span-full">
									<label
										htmlFor="last-name"
										className="text-left block text-sm font-medium leading-6 text-white"
									>
										Last name
									</label>
									<div className={style["edit-fields"]}>
										<input
											type="text"
											name="lname"
											id="last-name"
											onChange={handleInputChange}
											value={input?.lname}
											autoComplete="family-name"
										/>
									</div>
								</div>

								<div className="sm:col-span-full">
									<label
										htmlFor="email"
										className="text-left block text-sm font-medium leading-6 text-white"
									>
										Email address
									</label>
									<div className={style["edit-fields"]}>
										<input
											id="email"
											name="email"
											type="email"
											onChange={handleInputChange}
											value={input?.email}
											autoComplete="email"
										/>
									</div>
								</div>

								<div className="sm:col-span-full">
									<label
										htmlFor="password"
										className="text-left block text-sm font-medium leading-6 text-white"
									>
										Password
									</label>
									<div className={style["edit-fields"]}>
										<input
											type={
												showPassword
													? "text"
													: "password"
											}
											name="password"
											id="password"
											onChange={handleInputChange}
											autoComplete="current-password"
										/>
										<button
											type="button"
											className={style["password-toggle"]}
											onClick={togglePasswordVisibility}
										>
											<FontAwesomeIcon
												icon={
													showPassword
														? faEyeSlash
														: faEye
												}
												className={style["eye-icon"]}
											/>
										</button>
									</div>
								</div>

								<div className="sm:col-span-full">
									<label
										htmlFor="cpassword"
										className="text-left block text-sm font-medium leading-6 text-white"
									>
										Confirm Password
									</label>
									<div className={style["edit-fields"]}>
										<input
											type={
												showConfirmPassword
													? "text"
													: "password"
											}
											name="cpassword"
											id="cpassword"
											onChange={handleInputChange}
											autoComplete="current-password"
										/>
										<button
											type="button"
											className={style["password-toggle"]}
											onClick={
												toggleConfirmPasswordVisibility
											}
										>
											<FontAwesomeIcon
												icon={
													showConfirmPassword
														? faEyeSlash
														: faEye
												}
												className={style["eye-icon"]}
											/>
										</button>
									</div>
								</div>

								<div className="sm:col-span-full">
									<label className="text-left block text-sm font-medium leading-6 text-white">
										User Image
									</label>

									<img
										className="h-8 w-8 rounded-full"
										src={`http://localhost:5000/uploads/${userData?.image}`}
										alt=""
									/>
									<label
										htmlFor="image"
										className="text-left block text-sm font-medium leading-6 text-white sm:col-span-3"
									>
										Select a new image
									</label>
									<div className={style["edit-fields"]}>
										<input
											onChange={handleImageChange}
											type="file"
											className={style["input"]}
											name="image"
											id="image"
											placeholder="Select a Photo"
										/>
									</div>
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
							className="rounded-md bg-cyan-300 px-3 py-2 text-sm font-semibold text-black shadow-sm"
							onClick={updateUser}
						>
							Save
						</button>
					</div>
					{passwordError && (
						<p className="text-red-500 text-sm text-center">
							{passwordError}
						</p>
					)}
				</form>
			</div>
		</>
	);
}

export default EditProfile;
