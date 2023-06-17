import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "../signup/signup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import toast from "../../../components/Toast";
import Footer from "../../../components/Navbar/Footer";

export default function Signup() {
	const router = useRouter();
	const [input, setInput] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		cpassword: "",
		image: "",
	});

	const [passwordError, setPasswordError] = useState(""); // State to store the password error message

	const handleInput = (event) => {
		const { name, value } = event.target;
		setInput((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleChangeI = (event) => {
		setInput({ ...input, image: event.target.files[0] });
	};

	const validatePassword = (password) => {
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordRegex.test(password);
	};

	const handleClick = async (event) => {
		const formData = new FormData();
		formData.append("fname", input.fname);
		formData.append("lname", input.lname);
		formData.append("email", input.email);
		formData.append("password", input.password);
		formData.append("cpassword", input.cpassword);
		formData.append("image", input.image, input.image.name);
		event.preventDefault();
		const { name, email, password } = input;

		if (!validatePassword(password)) {
			setPasswordError(
				"Password must contain at least 8 characters, including capital letters, lowercase letters, numbers, and symbols."
			);
			return;
		}

		const res = await fetch("http://localhost:5000/user/signup", {
			method: "POST",
			body: formData,
		});
		const data = await res.json();
		if (res.status === 422 || !data) {
			notify("error", data.message);
		} else {
			router.push("/login");
		}
	};

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
						Create New Account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action="#" method="POST">
						<div>
							<label
								htmlFor="fname"
								className="block text-sm font-medium leading-6"
							>
								First Name
							</label>
							<div className={style["signup-fields"]}>
								<input
									id="fname"
									value={input.fname}
									name="fname"
									onChange={handleInput}
									type="text"
									autoComplete="false"
									required
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="lname"
								className="block text-sm font-medium leading-6"
							>
								Last Name
							</label>
							<div className={style["signup-fields"]}>
								<input
									id="lname"
									value={input.lname}
									name="lname"
									onChange={handleInput}
									type="text"
									autoComplete="false"
									required
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6"
							>
								Email address
							</label>
							<div className={style["signup-fields"]}>
								<input
									id="email"
									value={input.email}
									name="email"
									onChange={handleInput}
									type="email"
									autoComplete="email"
									required
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="image"
								className="block text-sm font-medium leading-6"
							>
								Select an image
							</label>
							<div className={style["signup-fields"]}>
								<input
									onChange={handleChangeI}
									type="file"
									className={style["input"]}
									name="image"
									id="image"
									placeholder="Select a Photo"
									required
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6"
								>
									Password
								</label>
							</div>
							<div className={style["password-input-container"]}>
								<div className={style["signup-fields"]}>
									<input
										id="password"
										value={input.password}
										name="password"
										onChange={handleInput}
										type={
											showPassword ? "text" : "password"
										}
										autoComplete="current-password"
										required
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
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="confirm-password"
									className="block text-sm font-medium leading-6"
								>
									Confirm Password
								</label>
							</div>
							<div className={style["password-input-container"]}>
								<div className={style["signup-fields"]}>
									<input
										id="confirm-password"
										value={input.cpassword}
										name="cpassword"
										onChange={handleInput}
										type={
											showConfirmPassword
												? "text"
												: "password"
										}
										autoComplete="current-password"
										required
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
						</div>

						<div className={style["signup"]}>
							<button type="submit" onClick={handleClick}>
								Sign up
							</button>
						</div>
						{passwordError && (
							<p className="text-red-500 text-sm text-center">
								{passwordError}
							</p>
						)}
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already a member?{" "}
						<Link
							href="/login"
							className="font-semibold leading-6 text-cyan-300 hover:text-cyan-500"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
			<Footer />
		</>
	);
}
