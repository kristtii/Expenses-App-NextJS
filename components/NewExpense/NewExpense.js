import React, { useState } from "react";
import style from "./NewExpense.module.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
    const [isEdititng, setIsEditing] = useState(false);

    const saveExpsenseDataHandler = (enteredExpenseDate) => {
        const expenseData = {
            ...enteredExpenseDate,
            id: Math.random().toString(), //percaktojm ID me math func
        };
        props.onAddExpsense(expenseData);
        setIsEditing(false);
    };

    const startEditingHandler = () => {
        setIsEditing(true);
    };

    const cancelHandler = (event) => {
        setIsEditing(false);
    };

    return (
        //"onSaveExpenseData={saveExpsenseDataHandler}" Perdoret per te komunikuar mes komponenteve lart
        <div className={style['new-expense']}>
            {!isEdititng && (
                <button onClick={startEditingHandler}> Add New Expense</button>
            )}
            {isEdititng && (
                <ExpenseForm
                    onSaveExpenseData={saveExpsenseDataHandler}
                    onCancel={cancelHandler}
                />
            )}
        </div>
    );
};

export default NewExpense;
