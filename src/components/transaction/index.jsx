import "./style.css";
import { useEffect, useState } from "react";
import { GrEdit } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PiPizzaLight } from "react-icons/pi";
import { CiRollingSuitcase } from "react-icons/ci";
import { SlPresent } from "react-icons/sl";
import { PaginationComponent } from "../pagination";

export const TransactionComponent = ({ transactions, onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionList, setTransactionList] = useState([]);
  const itemsPerPage = 3;
  const totalItems = transactions.length;

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setTransactionList(transactions.slice(startIndex, endIndex));
  }, [currentPage, transactions]);

  const getIcon = (category) => {
    switch (category) {
      case "food":
        return <PiPizzaLight size={24} color="black" />;
      case "travel":
        return <CiRollingSuitcase size={24} color="black" />;
      case "entertainment":
        return <SlPresent size={24} color="black" />;
      default:
        return <SlPresent size={24} color="black" />;
    }
  };

  //convert into MMMM dd, yyyy format
  const getDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="transactionList">
      {transactionList.length > 0 ? (
        transactionList.map((transaction) => (
          <div className="transactionCard" key={transaction.id}>
            <div className="transactionIcon">
              {getIcon(transaction.category)}
            </div>
            <div style={{ marginLeft: "15px", flex: 1 }}>
              <p style={{ color: "black", margin: "0px" }}>
                {transaction.title}
              </p>
              <p style={{ color: "gray", margin: "0px" }}>
                {getDate(transaction.date)}
              </p>
            </div>
            <div className="transactionActions">
              <p className="transactionAmount">₹{transaction.price}</p>
              <div className="tranBtnContainer">
                <button
                  className="tranDeleteBtn"
                  onClick={() => onDelete(transaction.id)}
                >
                  <IoIosCloseCircleOutline
                    color="white"
                    size={36}
                    style={{ padding: "0px", margin: "0px" }}
                  />
                </button>
                <button
                  className="tranEditBtn"
                  onClick={() => onEdit(transaction.id, transaction)}
                >
                  <GrEdit
                    color="white"
                    size={26}
                    style={{ padding: "5px 5px", margin: "0px" }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="content">No transactions!</div>
      )}
      <PaginationComponent
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
