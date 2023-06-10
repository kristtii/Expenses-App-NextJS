import React, { useState } from "react";
import style from "./ExpenseItem.module.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteExpense = async () => {
		try {
			setIsDeleting(true);

			const response = await fetch(
				`http://localhost:5000/expense/deleteExpense/${props.id}`,
				{
					method: "DELETE",
				}
			);

			if (response.ok) {
				console.log("Expense deleted successfully.");
				window.location.reload(); // Auto-refresh the page after successful deletion
			} else {
				notify("error", "Failed to delete the expense");
			}
		} catch (error) {
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
				{props.id !== null && (
					<button
						className={style["delete-button"]}
						onClick={handleDeleteExpense}
						disabled={isDeleting}
					>
						&times;
					</button>
				)}
			</div>
		</Card>
	);
}

export default ExpenseItem;
