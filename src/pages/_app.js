import "../styles/globals.css";
import Navbar from "../../components/Navbar/Navbar";
import UserContext from "../../context/UserContext";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Namelogo from "../../assets/images/TrackIT.png";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }) {
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const userStr = localStorage.getItem("user");
		if (userStr) {
			const user = JSON.parse(userStr);
			setUserData({
				_id: user._id,
				fname: user.fname,
				lname: user.lname,
				email: user.email,
				password: user.password,
				image: user.image,
			});
		}
	}, []);
	return (
		<>
			<UserContext.Provider value={{ userData, setUserData }}>
				<Navbar />
				<Component {...pageProps} />
				<ToastContainer
					position="top-right"
					autoClose={8000}
					hideProgressBar={false}
					newestOnTop={false}
					draggable={false}
					pauseOnVisibilityChange
					closeOnClick
					pauseOnHover
				/>
			</UserContext.Provider>
		</>
	);
}
