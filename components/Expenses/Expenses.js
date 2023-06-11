import React, { useContext, useEffect, useState } from "react";
import style from "../Expenses/Expenses.module.css";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import withAuth from "../../withAuth";
import UserContext from "../../context/UserContext";
import MonthlyExpensesFilter from "./MonthlyExpensesFilter";

function Expenses(props) {
	const [filteredYear, setFilteredYear] = useState(
		new Date().getFullYear().toString()
	);
	const [filteredMonth, setFilteredMonth] = useState(
		new Date().getMonth().toString()
	);

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

	const filterChangeHandlerMonth = (selectedMonth) => {
		setFilteredMonth(selectedMonth);
	};

	const filteredExpensesChart = expenses?.filter((expense) => {
		const expenseDate = new Date(expense.date);
		return expenseDate.getFullYear().toString() === filteredYear;
	});

	const filteredExpenses = expenses?.filter((expense) => {
		const expenseDate = new Date(expense.date);
		const filter =
			expenseDate.getFullYear().toString() === filteredYear &&
			expenseDate.getMonth().toString() === filteredMonth;
		return filter;
	});

	return (
		<div>
			<div className={style.expenses}>
				<ExpensesChart expenses={filteredExpensesChart}></ExpensesChart>
				<MonthlyExpensesFilter
					selected={filteredMonth}
					onChangeFilter={filterChangeHandlerMonth}
				/>
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
