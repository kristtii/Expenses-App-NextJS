import React from "react";
import style from "./ExpenseItem.module.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
	return (
		<Card >
			{/* <div className={style["expense-date"]}> */}
			<ExpenseDate date={props.date} />
			{/* </div> */}
			<div className={style["expense-item-description"]}>
				<h2>{props.title}</h2>
				<div className={style["expense-item-price"]}>
					{props.amount} ALL
				</div>
			</div>
		</Card>
	);
}

export default ExpenseItem;
