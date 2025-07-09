import { useEffect, useState } from "react";
import "./App.css";
import { AddBalancePopup, AddExpensePopup } from "./components/popup";
import BalanceCard from "./components/card/balanceCard";
import {
  deleteExpense,
  getExpenses,
  getExpensesTotal,
  getWalletBalance,
  updateExpense,
} from "./until/data.service";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { ExpensesBarChart } from "./components/chart/expensesBarChart";
import { PieChartComponent } from "./components/chart/pieChart";
import { ModalComponent } from "./components/modal";
import { TransactionComponent } from "./components/transaction";

function App() {
  const [showIncomePopup, setShowIncomePopup] = useState(false);
  const [showExpensePopup, setShowExpensePopup] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [editTransaction, setEditTransaction] = useState(null);

  // Fetch transactions from the API or local storage
  const fetchTransactions = async () => {
    const data = await getExpenses();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
    setWalletBalance(getWalletBalance());
  }, []);

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
    deleteExpense(id);
    fetchTransactions();
    setWalletBalance(getWalletBalance());
  };

  const handleEditTransaction = (id, transaction) => {
    setEditTransaction(transaction);
    setShowExpensePopup(true);
    setShowIncomePopup(false);
    fetchTransactions();
    setWalletBalance(getWalletBalance());
  };

  return (
    <div className="App" id="App">
      <SnackbarProvider autoHideDuration={5000} />
      <h1 style={{ color: "white", fontSize: "1.5rem" }}>Expense Tracker</h1>
      <div className="container">
        <BalanceCard
          type="wallet"
          balance={walletBalance}
          onAddClick={() => {
            setShowIncomePopup(true);
            setShowExpensePopup(false);
          }}
        />
        <BalanceCard
          type="expense"
          balance={getExpensesTotal()}
          onAddClick={() => {
            if (getWalletBalance() <= 0) {
              enqueueSnackbar({
                message: "You don't have enough balance to add expenses!",
                variant: "error",
              });
              return;
            }
            setShowExpensePopup(true);
            setShowIncomePopup(false);
          }}
        />
        <PieChartComponent data={transactions} />
      </div>
      <div className="details">
        <div style={{ flex: 1 }}>
          <h2>Recent Transactions</h2>
          <TransactionComponent
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
        </div>
        <div style={{ flex: 1, marginTop: "20px" }}>
          <h2>Top Expenses</h2>
          <div>
            <ExpensesBarChart data={transactions} />
          </div>
        </div>
      </div>
      <ModalComponent isOpen={showIncomePopup} overlayClassName="overlay">
        <AddBalancePopup
          setShowPopup={setShowIncomePopup}
          addedBalance={() => {
            setWalletBalance(getWalletBalance());
            fetchTransactions();
          }}
        />
      </ModalComponent>
      <ModalComponent isOpen={showExpensePopup} overlayClassName="overlay">
        <AddExpensePopup
          setShowPopup={setShowExpensePopup}
          newExpenseAdded={() => {
            setWalletBalance(getWalletBalance());
            fetchTransactions();
            setEditTransaction(null);
          }}
          updateExpense={(id, updatedData) => {
            updateExpense(id, updatedData);
            setEditTransaction(null);
            fetchTransactions();
            setWalletBalance(getWalletBalance());
          }}
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        />
      </ModalComponent>
    </div>
  );
}

export default App;
