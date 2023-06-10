import style from "./ExpenseDate.module.css";
function ExpenseDate(props) {
	const dateStr = props.date.toLocaleString("en-US", { month: "long" });
	

// Split the date string into year, month, and day
const [year, month, day] = dateStr.split("-");

// Convert the month to English
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const monthInEnglish = monthNames[parseInt(month) - 1];

// console.log(`${monthInEnglish} ${day}, ${year}`);
	// const year = props.date.getFullYear();

	return (
		<div className={style['expense-date']}>
			<div className={style['expense-date-month']}>{monthInEnglish}</div>
			<div className={style['expense-date-year']}>{year}</div>
			<div className={style['expense-date-day']}>{day}</div>
		</div>
	);
}

export default ExpenseDate;
