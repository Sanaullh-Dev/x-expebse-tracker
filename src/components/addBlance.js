function AddBalancePopup() {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
      }}
    >
      <h2>Add Balance</h2>
      <form>
        <input type="number" placeholder="Enter amount" />
        <button type="submit">Add</button>
        <button type="button" onClick={() => console.log("Cancel")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddBalancePopup