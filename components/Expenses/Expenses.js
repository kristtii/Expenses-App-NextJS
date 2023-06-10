import React, { useContext, useEffect, useState } from "react";
import style from "../Expenses/Expenses.module.css";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import withAuth from "../../withAuth";
import UserContext from "../../context/UserContext";

function Expenses(props) {
	const [filteredYear, setFilteredYear] = useState("2023");
	const { userData } = useContext(UserContext);
	const [expenses, setExpenses] = useState([]);
	const fetchExpenses = async () => {
		try {
			const res = await fetch(
				`http://localhost:5000/expense/showExpenses/${userData._id}`,
				{
					method: "GET",
				}
			);
			const data = await res.json();
			console.log(data);
			setExpenses(data);

			if (!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
		} catch (error) {
			//history.push('/signin');
		}
	};
	useEffect(() => {
		fetchExpenses();
		// eslint-disable-next-line
	}, [userData, props]);
	const filterChangeHandler = (selectedYear) => {
		setFilteredYear(selectedYear);
	};

	const filteredExpenses = expenses?.filter((expense) => {
		const expenseDate = new Date(expense.date);
		return expenseDate.getFullYear().toString() === filteredYear;
	});

	return (
		<div>
			<div className={style.expenses}>
				<ExpensesChart expenses={filteredExpenses}></ExpensesChart>
				<ExpensesFilter
					selected={filteredYear}
					onChangeFilter={filterChangeHandler}
				/>
				<ExpensesList items={filteredExpenses} />
			</div>
		</div>
	);
}

export default withAuth(Expenses);
