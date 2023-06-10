import React, { useState } from "react";
import Expenses from "../../components/Expenses/Expenses";
import NewExpense from "../../components/NewExpense/NewExpense";

const dummyExpenses = [];

function App() {
	const [expenses, setExpenses] = useState(dummyExpenses);

	const addExpenseHandler = (expense) => {
		setExpenses((prevExpenses) => {
			return [expense, ...prevExpenses];
		});
	};

	return (
		<div>
			<NewExpense onAddExpsense={addExpenseHandler} />
			<Expenses items={expenses}></Expenses>
		</div>
	);
}

export default App;
