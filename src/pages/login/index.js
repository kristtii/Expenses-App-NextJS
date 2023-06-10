import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import UserContext from "../../../context/UserContext";
import toast from "../../../components/Toast";
import style from "../login/login.module.css";

export default function Login() {
	const router = useRouter();
	const { setUserData } = useContext(UserContext);
	const [input, setInput] = useState({
		email: "",
		password: "",
	});

	const handleInput = (event) => {
		const { name, value } = event.target;
		setInput((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};
	const notify = React.useCallback((type, message) => {
		toast({ type, message });
	}, []);
	const dismiss = React.useCallback(() => {
		toast.dismiss();
	}, []);
	const handleClick = async (event) => {
		event.preventDefault();
		const { name, email, password } = input;
		const res = await fetch("http://localhost:5000/user/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
		const data = await res.json();
		// console.log(data.data)
		if (res.status === 400 || !data) {
			notify("error", "Invalid Email or Password");
			// window.alert("Invalid");
		} else {
			localStorage.setItem("token", data.data.token);
			const userObj = JSON.stringify(data.data.emailExist);
			localStorage.setItem("user", userObj);
			setUserData(JSON.parse(localStorage.getItem("user")));
			router.push("/");
		}
	};
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action="#" method="POST">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 "
							>
								Email address
							</label>
							<div className={style["login-fields"]}>
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
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 "
								>
									Password
								</label>
							</div>
							<div className={style["login-fields"]}>
								<input
									id="password"
									value={input.password}
									name="password"
									onChange={handleInput}
									type="password"
									autoComplete="current-password"
									required
								/>
							</div>
						</div>

						<div className={style["login"]}>
							<button type="submit" onClick={handleClick}>
								Sign in
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?{" "}
						<Link
							href="/signup"
							className="font-semibold leading-6 text-cyan-300 hover:text-cyan-500"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
