import style from "./Card.module.css";
import classes from "../Expenses/ExpenseItem.module.css";

function Card(props) {
	return (
		<div className={style.card}>
			<div
				className={classes["expense-item"]}
				style={{ borderRadius: "12px" }}
			>
				{props.children}
			</div>
		</div>
	);
}

export default Card;
