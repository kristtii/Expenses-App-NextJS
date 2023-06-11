import Link from "next/link";
import style from "../Navbar/footer.module.css";

const Footer = () => {
	return (
		<footer>
			<div className={style["footer-container"]}>
				<div className={style["footer-links"]}>
					<Link href="/about">About</Link>
					<Link href="/contact">Contact</Link>
				</div>
				<div className={style["footer-copyright"]}>
					&copy; {new Date().getFullYear()} TrackIT. All rights
					reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
