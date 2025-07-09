import { useState } from "react";
import { addBalance } from "../../until/data.service";
import "./popupStyle.css";

export const AddBalancePopup = ({ setShowPopup, addedBalance }) => {
  const [balance, setBalance] = useState("");

  // Function to handle adding balance
  const handelAddBalance = (e) => {
    e.preventDefault();
    setShowPopup(false);
    const amount = balance;
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      addBalance(amount);
      addedBalance();
    }
  };

  return (
    <div className="popupContent">
      <h2 className="title">Add Balance </h2>
      <form>
        <input
          type="number"
          placeholder="Income Amount"
          className="inputField"
          onChange={(e) => setBalance(e.target.value)}
        />
        <button
          type="submit"
          className="btnAddBalance"
          onClick={handelAddBalance}
        >
          Add Balance
        </button>
        <button
          type="button"
          onClick={() => setShowPopup(false)}
          className="btnCancel"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
