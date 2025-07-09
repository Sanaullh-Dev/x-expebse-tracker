const keys = {
  walletBalance: "walletBalance",
  expensesEntry: "expenses",
  userPreferences: "userPreferences",
};

export const getWalletBalance = () => {
  let totalBalance =  localStorage.getItem(keys.walletBalance) ?? "0";
  if(totalBalance === "0") {
    localStorage.setItem(keys.walletBalance, "5000");
    totalBalance = "5000";
  }
  const totalExpenses = getExpensesTotal();
  return (parseFloat(totalBalance) - parseFloat(totalExpenses)).toFixed(2);
};

export const addBalance = (amount) => {
  const currentBalance = parseFloat(localStorage.getItem(keys.walletBalance) ?? 0);
  const newBalance = currentBalance + parseFloat(amount);
  localStorage.setItem(keys.walletBalance, newBalance.toString());
  return newBalance;
};

export const addExpense = (expense) => {
  const expenses = JSON.parse(localStorage.getItem(keys.expensesEntry)) || [];
  expenses.push(expense);
  localStorage.setItem(keys.expensesEntry, JSON.stringify(expenses));
};

export const getExpenses = () => {
  const expenses = JSON.parse(localStorage.getItem(keys.expensesEntry));
  return expenses ?? [];
};

export const getExpensesTotal = () => {
  const expenses = getExpenses();
  return expenses.reduce(
    (total, expense) => total + parseFloat(expense.price),
    0
  );
};


export const deleteExpense = (id) => {
  let expenses = getExpenses();
  expenses = expenses.filter((expense) => expense.id !== id);
  localStorage.setItem(keys.expensesEntry, JSON.stringify(expenses));
};


export const updateExpense = (id, updatedExpense) => {
  let expenses = getExpenses();
  expenses = expenses.map((expense) =>
    expense.id === id ? { ...expense, ...updatedExpense } : expense
  );
  localStorage.setItem(keys.expensesEntry, JSON.stringify(expenses));
};