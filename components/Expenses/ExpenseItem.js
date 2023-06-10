import React, { useState } from "react";
import style from "./ExpenseItem.module.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
	const [isDeleting, setIsDeleting] = useState(false);
	const handleDeleteExpense = async () => {
		try {
			setIsDeleting(true);

			// Make the HTTP request to delete the expense
			const response = await fetch(`http://localhost:5000/expense/deleteExpense/${props.id}`,
				{
					method: "DELETE",
				}
			);

			if (response.ok) {
				// Handle success behavior, e.g., show a success message or update the UI
				console.log("Expense deleted successfully.");
			} else {
				// Handle error behavior, e.g., show an error message or handle the error response
				console.log("Failed to delete the expense.");
			}
		} catch (error) {
			// Handle any other error that occurs during the deletion process
			console.log("An error occurred while deleting the expense.");
			console.log(error);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<Card>
			<ExpenseDate date={props.date} />
			<div className={style["expense-item-description"]}>
				<h2>{props.title}</h2>
				<div className={style["expense-item-price"]}>
					{props.amount} ALL
				</div>
				<button onClick={handleDeleteExpense} disabled={isDeleting}>
					{isDeleting ? "Deleting..." : "Delete"}
				</button>
			</div>
		</Card>
	);
}

export default ExpenseItem;
