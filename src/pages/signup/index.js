import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "../signup/signup.module.css";
import toast from "../../../components/Toast";
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
		// console.log(event.target.files[0]);
		setInput({ ...input, image: event.target.files[0] });
	};
	const notify = React.useCallback((type, message) => {
		toast({ type, message });
	}, []);
	const dismiss = React.useCallback(() => {
		toast.dismiss();
	}, []);
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
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
						Create New Account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action="#" method="POST">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 "
							>
								First Name
							</label>
							<div className={style["signup-fields"]}>
								<input
									id="fname"
									value={input.fname}
									name="fname"
									onChange={handleInput}
									type="name"
									autoComplete="flase"
									required
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 "
							>
								Last Name
							</label>
							<div className={style["signup-fields"]}>
								<input
									id="lname"
									value={input.lname}
									name="lname"
									onChange={handleInput}
									type="name"
									autoComplete="flase"
									required
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 "
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
								className="block text-sm font-medium leading-6 "
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
							<div className={style["signup-fields"]}>
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
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 "
								>
									Confirm Password
								</label>
							</div>
							<div className={style["signup-fields"]}>
								<input
									id="password"
									value={input.cpassword}
									name="cpassword"
									onChange={handleInput}
									type="password"
									autoComplete="current-password"
									required
								/>
							</div>
						</div>
						<div className={style["signup"]}>
							<button type="submit" onClick={handleClick}>
								Sign up
							</button>
						</div>
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
		</>
	);
}
