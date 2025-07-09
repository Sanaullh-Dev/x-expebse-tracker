import "./cardStyle.css";

const BalanceCard = ({ type, balance, onAddClick }) => {
  return (
    <div className="cardBox">
      <h4 style={{ color: "white" }}>
        {type === "expense" ? "Expense" : "Wallet Balance"}:{" "}
        <span style={{ color: type === "expense" ? "orange" : "green" }}>
          ${balance}
        </span>
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
