import React, { useContext, useState } from "react";
import style from "./ExpenseForm.module.css";
import UserContext from "../../context/UserContext";
import toast from "../../components/Toast";

const ExpenseForm = (props) => {
	const { userData } = useContext(UserContext);
	const [enteredTitle, setEnteredTitle] = useState("");
	const [enteredAmount, setEnteredAmount] = useState("");
	const [enteredDate, setEnteredDate] = useState(
		new Date().toISOString().slice(0, 10)
	);

	// Use state to get values from form
	const titleChangeHandler = (event) => {
		setEnteredTitle(event.target.value);
	};
	const amountChangeHandler = (event) => {
		setEnteredAmount(event.target.value);
	};
	const dateChangeHandler = (event) => {
		setEnteredDate(event.target.value);
	};

	const notify = React.useCallback((type, message) => {
		toast({ type, message });
	}, []);
	const dismiss = React.useCallback(() => {
		toast.dismiss();
	}, []);
	const submitHandler = async (event) => {
		event.preventDefault();

		const expenseData = {
			// krijojme nje objekt
			title: enteredTitle, // me vlerat e marra nga form
			amount: enteredAmount,
			date: new Date(enteredDate),
		};

		try {
			const res = await fetch(
				"http://localhost:5000/expense/createExpense",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: enteredTitle,
						amount: enteredAmount,
						date: enteredDate,
						userID: userData._id,
					}),
				}
			);
			// const data1 = await res.json();

			if (res.status === 200) {
				notify("success", "Expense added");
			} else {
				const error = new Error(res.error);
				throw error;
			}
		} catch (error) {
			console.log(error);

			notify("error", "Expense Not Added");
		}
		props.onSaveExpenseData(expenseData);
		setEnteredTitle(""); // Per te ber clear form automatikisht pasi kemi ber submit
		setEnteredAmount(""); // duhet shtuar dhe "value={enteredTitle}"
		setEnteredDate(""); // ne cdo input label
	};

	return (
		<form onSubmit={submitHandler}>
			<div className={style["new-expense-controls"]}>
				<div className={style["new-expense-control"]}>
					<label>Title</label>
					<input
						type="text"
						value={enteredTitle}
						onChange={titleChangeHandler}
						required
					/>
				</div>
				<div className={style["new-expense-control"]}>
					<label>Amount</label>
					<input
						type="number"
						value={enteredAmount}
						min="0.01"
						step="0.01"
						onChange={amountChangeHandler}
						required
					/>
				</div>
				<div className={style["new-expense-control"]}>
					<label>Date</label>
					<input
						type="date"
						value={enteredDate}
						placeholder="DD/MM/YYYY"
						title="DD/MM/YYYY"
						min="2022-01-01"
						max="2030-12-31"
						onChange={dateChangeHandler}
						required
					/>
				</div>
			</div>
			<div className={style["new-expense-actions"]}>
				<button type="submit">Add Expense</button>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default ExpenseForm;
