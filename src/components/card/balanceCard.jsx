import "./cardStyle.css";

const BalanceCard = ({ type, balance, onAddClick }) => {
  return (
    <div className="cardBox">
      <h4 style={{ color: "white" }}>
        {type === "expense" ? "Expense" : "Wallet Balance"}: ${balance}
      </h4>
      <button
        type="button"
        className={`btnIncome ${type === "expense" ? "btnExpense" : ""}`}
        onClick={onAddClick}
      >
        + Add {type === "expense" ? "Expense" : "Income"}
      </button>
    </div>
  );
};

export default BalanceCard;
