import style from "./ExpenseDate.module.css";

function ExpenseDate(props) {
	if (!props.date) {
		return null; // Return null if props.date is undefined or null
	}

	const date = new Date(props.date);
	const month = date.toLocaleString("en-US", { month: "long" });
	const day = date.toLocaleString("en-US", { day: "2-digit" });
	const year = date.getFullYear();

	return (
		<div className={style["expense-date"]}>
			<div className={style["expense-date__month"]}>{month}</div>
			<div className={style["expense-date__year"]}>{year}</div>
			<div className={style["expense-date__day"]}>{day}</div>
		</div>
	);
}

export default ExpenseDate;
