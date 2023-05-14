import React, { useState } from "react";
import style from "../Expenses/Expenses.module.css";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";

function Expenses(props) {
    const [filteredYear, setFilteredYear] = useState("2023");

    const filterChangeHandler = (selectedYear) => {
        setFilteredYear(selectedYear);
    };

    const filteredExpenses = props.items.filter((expense) => {
        return expense.date.getFullYear().toString() === filteredYear;
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

export default Expenses;
