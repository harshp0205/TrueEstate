import React from 'react';
import './TransactionsTable.css';

function TransactionsTable({ items = [] }) {
  // Format date as DD MMM YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Format number with thousand separators
  const formatNumber = (num) => {
    if (num === undefined || num === null) return '-';
    return num.toLocaleString('en-IN');
  };

  if (items.length === 0) {
    return (
      <div className="no-transactions">
        <p>📊 No transactions found</p>
        <p className="sub-text">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.transactionId || item._id?.slice(-7) || '-'}</td>
              <td>{formatDate(item.date)}</td>
              <td>{item.customerId || '-'}</td>
              <td>{item.customerName || '-'}</td>
              <td>
                {item.phoneNumber || '-'}
                {item.phoneNumber && (
                  <button className="copy-btn" title="Copy">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M5 5V3.5C5 2.67157 5.67157 2 6.5 2H12.5C13.3284 2 14 2.67157 14 3.5V9.5C14 10.3284 13.3284 11 12.5 11H11M3.5 5H9.5C10.3284 5 11 5.67157 11 6.5V12.5C11 13.3284 10.3284 14 9.5 14H3.5C2.67157 14 2 13.3284 2 12.5V6.5C2 5.67157 2.67157 5 3.5 5Z" stroke="#6B7280" strokeWidth="1.5"/>
                    </svg>
                  </button>
                )}
              </td>
              <td>{item.gender || '-'}</td>
              <td>{item.age || '-'}</td>
              <td>{item.productCategory || '-'}</td>
              <td>{formatNumber(item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
