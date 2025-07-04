import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 style={{ color: "white" }}>Expense Tracker</h1>
      <div
        className="container"
        style={{
          display: "flex",
          gap: "20px",
          backgroundColor: "#aeafae",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            backgroundColor: "gray",
            padding: "50px 15px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "250px",
            minWidth: "250px",
          }}
        >
          <h4 style={{ color: "white" }}>
            Wallet Balance: <span style={{ color: "greenyellow" }}>$50000</span>
          </h4>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background:
                "linear-gradient(to right,rgb(174, 175, 174),rgb(61, 158, 66))",
              color: "white",
            }}
          >
            + Add Income
          </button>
        </div>
        <div
          style={{
            backgroundColor: "gray",
            padding: "50px 15px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "250px",
            minWidth: "250px",
          }}
        >
          <h4 style={{ color: "white" }}>
            Expense : <span style={{ color: "orange" }}>$50000</span>
          </h4>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background:
                "linear-gradient(to right, rgb(232, 59, 56), rgb(172, 7, 7))",
              color: "white",
            }}
          >
            + Add Expense
          </button>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div>
          <h3>Recent Transactions</h3>
          <div
            style={{
              color: "black",
              backgroundColor: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            No transactions!
          </div>
        </div>
        <div>
          <h3>Top Expenses</h3>
          <div
            style={{
              color: "black",
              backgroundColor: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            No transactions!
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
