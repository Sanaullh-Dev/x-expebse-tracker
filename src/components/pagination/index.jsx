import "./style.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export const PaginationComponent = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  console.log("🚀 ~ totalPages:", totalPages, currentPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };
  if (totalPages === 0) {
    return null; // Don't render pagination if there are no items
  }
  if (totalPages === 1) {
    return null; // Don't render pagination if there's only one page
  }

  return (
    <div className="pagination">
      <button
        className="page-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <BsArrowLeft size={20} />
      </button>
      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="page-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <BsArrowRight size={20} />
      </button>
    </div>
  );
};
