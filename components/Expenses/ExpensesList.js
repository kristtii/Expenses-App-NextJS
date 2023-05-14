import React from "react";

import ExpenseItem from "./ExpenseItem";
import style from "./ExpensesList.module.css";

const ExpensesList = (props) => {
	if (props.items.length === 0) {
		return (
			<h2 className={style['expenses-list-fallback']}>
				Found no expenses.
			</h2>
		);
	}

	return (
		<ul className={style['expenses-list']}>
			{props.items.map((expense) => (
				<ExpenseItem
					key={expense.id}
					title={expense.title}
					amount={expense.amount}
					date={expense.date}
				/>
			))}
		</ul>
	);
};

export default ExpensesList;
