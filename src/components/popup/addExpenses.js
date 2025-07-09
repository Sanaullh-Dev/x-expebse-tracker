import { useEffect } from "react";
import { addExpense, getWalletBalance } from "../../until/data.service";
import "./popupStyle.css";
import { enqueueSnackbar } from "notistack";

export const AddExpensePopup = ({
  setShowPopup,
  newExpenseAdded,
  updateExpense,
  editTransaction,
  setEditTransaction,
}) => {
  useEffect(() => {
    if (editTransaction) {
      // Pre-fill the form with the details of the expense being edited
      const form = document.querySelector("form");
      form.elements[0].value = editTransaction.title;
      form.elements[1].value = editTransaction.price;
      form.elements[2].value = editTransaction.category;
      form.elements[3].value = editTransaction.date;
    }
  }, [editTransaction]);

  // Function to handle adding expense
  const handleAddExpense = (e) => {
    e.preventDefault();    
    const balance = getWalletBalance();
    const title = e.target.elements[0].value;
    const price = Number(e.target.elements[1].value);
    const category = e.target.elements[2].value;
    const date = e.target.elements[3].value;

    if (title && price && category && date) {
      if (!editTransaction?.id) {
        const id = Math.random().toString(36).substr(2, 9);
        const newExpense = { id, title, price, category, date };
        if (balance <= price) {
          enqueueSnackbar(
            "You don't have enough balance to add this expense!",
            { variant: "error" }
          );
          return;
        }
        addExpense(newExpense);
        newExpenseAdded();
        setShowPopup(false);
      } else {
        if (balance + editTransaction.price < price) {
          enqueueSnackbar(
            "You don't have enough balance to update this expense!",
            { variant: "error" }
          );
          return;
        }
        updateExpense(editTransaction.id, { title, price, category, date });
        setEditTransaction(null);
        setShowPopup(false);
      }
    }
  };

  return (
    <div className="popupContent">
      <h2 className="title">{editTransaction ? "Edit" : "Add"} Expenses</h2>
      <form onSubmit={handleAddExpense}>
        <div className="inputGroup">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="inputField"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="inputField"
            required
          />
        </div>
        <div className="inputGroup">
          <select name="category" className="inputField" style={{ width: "80%" }} required>
            <option disabled selected value="">
              Select Category
            </option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
          </select>
          <input
            type="date"
            name="date"
            className="inputField"
            placeholder="dd/mm/yyyy"
            style={{ width: "0%" }}
            required
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btnAddBalance btnAddExpense">
            {editTransaction ? "Update" : "Add"} Expense
          </button>
          <button
            type="button"
            onClick={() => setShowPopup(false)}
            className="btnCancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
