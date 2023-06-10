import React, { useContext, useEffect, useState } from "react";

import ExpenseItem from "./ExpenseItem";
import style from "./ExpensesList.module.css";
import UserContext from "../../context/UserContext";

const ExpensesList = (props) => {
	console.log(props)
	if (props.items.length === 0) {
		return (
			<h2 className={style["expenses-list-fallback"]}>
				Found no expenses.
			</h2>
		);
	}

	return (
		<ul className={style["expenses-list"]}>
			{props.items.map((expense) => (
				<ExpenseItem
					key={expense._id}
					title={expense.title}
					amount={expense.amount}
					date={expense.date}
					id={expense._id}
				/>
			))}
		</ul>
	);
};

export default ExpensesList;
