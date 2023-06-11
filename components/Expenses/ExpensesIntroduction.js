import style from "../Expenses/intro.module.css";

function ExpensesIntroduction() {
	return (
		<div className={style["intro"]}>
			<p>
				Manage your finances effortlessly with{" "}
				<span className={style["span"]}>TrackIT!</span> Take control of
				your expenses and make informed financial decisions. Start by
				adding your expenses below using the {`'Add New Expense'`}
				button:
			</p>
		</div>
	);
}

export default ExpensesIntroduction;
