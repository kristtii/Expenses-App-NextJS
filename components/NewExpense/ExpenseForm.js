import React, { useState } from "react";
import style from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredDate, setEnteredDate] = useState(
        new Date().toISOString().slice(0, 10)
    );

    // Use state per te marr vlerat nga form
    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };
    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    };
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };

    // using only One State

    // const [userInput, setUserInput] = useState({
    //     enteredTitle: "",
    //     enteredAmount: "",
    //     enteredDate: "",
    // });

    // const titleChangeHandler = (event) => {
    //     // setUserInput({
    //     //     ...userInput,
    //     //     enteredTitle: event.target.value,
    //     // });
    //     setUserInput((prevState) => {
    //         return { ...prevState, enteredTitle: event.target.value };
    //     });
    // };
    // const amountChangeHandler = (event) => {
    //     // setUserInput({
    //     //     ...userInput,
    //     //     enteredAmount: event.target.value,
    //     // });
    //     setUserInput((prevState) => {
    //         return { ...prevState, enteredAmount: event.target.value };
    //     });
    // };
    // const dateChangeHandler = (event) => {
    //     // setUserInput({
    //     //     ...userInput,
    //     //     enteredDate: event.target.value,
    //     // });
    //     setUserInput((prevState) => {
    //         return { ...prevState, enteredDate: event.target.value };
    //     });
    // };

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            // krijojme nje objekt
            title: enteredTitle, // me vlerat e marra nga form
            amount: enteredAmount,
            date: new Date(enteredDate),
        };

        props.onSaveExpenseData(expenseData);
        setEnteredTitle(""); // Per te ber clear form automatikisht pasi kemi ber submit
        setEnteredAmount(""); // duhet shtuar dhe "value={enteredTitle}"
        setEnteredDate(""); // ne cdo input label
    };

    return (
        <form onSubmit={submitHandler}>
            <div className={style['new-expense-controls']}>
                <div className={style['new-expense-control']}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={enteredTitle}
                        onChange={titleChangeHandler}
                    />
                </div>
                <div className={style['new-expense-control']}>
                    <label>Amount</label>
                    <input
                        type="number"
                        value={enteredAmount}
                        min="0.01"
                        step="0.01"
                        onChange={amountChangeHandler}
                    />
                </div>
                <div className={style['new-expense-control']}>
                    <label>Date</label>
                    <input
                        type="date"
                        value={enteredDate}
                        placeholder="DD/MM/YYYY"
                        title="DD/MM/YYYY"
                        min="2022-01-01"
                        max="2030-12-31"
                        onChange={dateChangeHandler}
                    />
                </div>
            </div>
            <div className={style['new-expense-actions']}>
                <button type="submit">Add Expense</button>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;
