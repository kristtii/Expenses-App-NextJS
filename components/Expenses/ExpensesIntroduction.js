import style from "../Expenses/intro.module.css";

function ExpensesIntroduction() {
	return (
		<div className={style["intro"]}>
			<p>
				Manage your finances effortlessly with{" "}
				<span className={style["span"]}>TrackIT!</span> Control expenses
				and make informed financial decisions.
			</p>
		</div>
	);
}

export default ExpensesIntroduction;
