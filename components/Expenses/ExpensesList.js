import React, { useContext, useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import style from "./ExpensesList.module.css";
import UserContext from "../../context/UserContext";

const ExpensesList = (props) => {
	let totalExpense = 0;

	if (props.items.length === 0) {
		return (
			<h2 className={style["expenses-list-fallback"]}>
				Found no expenses.
			</h2>
		);
	}

	// Sort the expenses by date in descending order
	const sortedExpenses = props.items.sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);

	return (
		<div>
			<ul className={style["expenses-list"]}>
				{sortedExpenses.map((expense) => {
					totalExpense += +expense.amount;
					return (
						<ExpenseItem
							key={expense._id}
							title={expense.title}
							amount={expense.amount}
							date={expense.date}
							id={expense._id}
						/>
					);
				})}
			</ul>
			<ExpenseItem
				title="Total Expense"
				amount={totalExpense}
				id={null}
			/>
		</div>
	);
};

export default ExpensesList;
