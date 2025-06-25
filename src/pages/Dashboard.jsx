import TransactionSummary from "../features/TransactionSummary";
import TransactionList from "../features/TransactionList/TransactionList";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ transactions, onDeleteTransaction, onEditTransaction }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    return transactions.slice(startIndex, endIndex);
  }, [transactions, currentPage, transactionsPerPage]);

  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddTransaction = () => {
    navigate("/add");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <p>Overview of your finances</p>

      <div style={{ marginBottom: "24px" }}>
        <button 
          onClick={handleAddTransaction}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.2s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
        >
          + Add New Transaction
        </button>
      </div>

      {transactions.length > 0 ? (
        <>
          <TransactionSummary transactions={transactions} />
          
          <div style={{ marginTop: "30px" }}>
            <h3>Recent Transactions</h3>
            <TransactionList
              transactions={paginatedTransactions}
              onDeleteTransaction={onDeleteTransaction}
              onEditTransaction={onEditTransaction}
            />
          </div>

          {totalPages > 1 && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              marginTop: "32px",
              marginBottom: "24px"
            }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  backgroundColor: currentPage === 1 ? "#f5f5f5" : "#fff",
                  color: currentPage === 1 ? "#999" : "#333",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  transition: "all 0.2s"
                }}
              >
                Previous
              </button>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          backgroundColor: page === currentPage ? "#4CAF50" : "#fff",
                          color: page === currentPage ? "#fff" : "#333",
                          cursor: "pointer",
                          fontWeight: page === currentPage ? "600" : "400",
                          transition: "all 0.2s"
                        }}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return <span key={page} style={{ color: "#999" }}>...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  backgroundColor: currentPage === totalPages ? "#f5f5f5" : "#fff",
                  color: currentPage === totalPages ? "#999" : "#333",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  transition: "all 0.2s"
                }}
              >
                Next
              </button>
            </div>
          )}

          <div style={{
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
            marginBottom: "24px"
          }}>
            {transactions.length === paginatedTransactions.length 
              ? `Showing all ${transactions.length} transactions`
              : `Showing ${((currentPage - 1) * transactionsPerPage) + 1}-${Math.min(currentPage * transactionsPerPage, transactions.length)} of ${transactions.length} transactions`
            }
          </div>
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            marginTop: "20px",
            borderRadius: "10px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <h3>Welcome to your Finance Tracker!</h3>
          <p style={{ marginBottom: "20px", fontSize: "18px" }}>
            You haven't added any transactions yet.
          </p>
          <p>Click "Add Transaction" above to get started!</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;