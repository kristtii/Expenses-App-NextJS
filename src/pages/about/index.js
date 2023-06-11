import Footer from "../../../components/Navbar/Footer";
import style from "../about/about.module.css";

function about() {
	return (
		<>
			<div className={style["about"]}>
				<h1 id="h1">
					<b>About Us!</b>
				</h1>
				<br />

				<h2>Welcome to our Expenses Web Application!</h2>
				<br />

				<p>
					{`Our platform is designed to simplify and streamline the way you
				track your expenses, making financial management effortless and
				stress-free.`}
				</p>

				<p>
					{`At its core, our application is built on the principle that
				understanding your spending habits is essential for effective
				budgeting and achieving your financial goals. We understand that
				keeping track of expenses can be time-consuming and tedious,
				which is why we've created a user-friendly interface that makes
				the process as easy as possible.`}
				</p>

				<p>
					{`With our Expenses Web Application, you can effortlessly log and
				categorize your expenses with just a few clicks. Whether you're
				tracking daily purchases, monthly bills, or business
				expenditures, our intuitive system allows you to enter your
				expenses quickly and efficiently. No more rummaging through
				piles of receipts or struggling to remember where your money
				went.`}
				</p>

				<p>
					{`One of the key features of our application is the ability to
				create customized budgets. By setting spending limits for
				various categories, you gain valuable insights into your
				financial habits and can make informed decisions to cut back on
				unnecessary expenses. Our application provides detailed reports
				and visualizations, allowing you to monitor your progress and
				take control of your finances.`}
				</p>

				<p>
					{`Security is a top priority for us, and we understand the
				importance of protecting your sensitive financial information.
				That's why we have implemented robust security measures to
				ensure that your data remains safe and confidential. You can
				trust that your financial details are securely stored and
				encrypted, giving you peace of mind while using our platform.`}
				</p>

				<p>
					{`Our Expenses Web Application is also accessible across multiple
				devices, including desktops, laptops, tablets, and smartphones.
				This means you can track your expenses on the go, wherever you
				are, and stay connected to your financial goals.`}
				</p>

				<p>
					{`Whether you're an individual striving for better personal
				finance management or a business owner looking for a streamlined
				expense tracking solution, our Expenses Web Application is here
				to help you achieve financial success. Say goodbye to the hassle
				of manual expense tracking and start your journey toward
				financial freedom with us today.`}
				</p>
			</div>
			<Footer></Footer>
		</>
	);
}

export default about;
