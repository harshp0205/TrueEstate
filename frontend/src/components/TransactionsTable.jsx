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
            <th>Date</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Customer Region</th>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Price per Unit</th>
            <th>Discount %</th>
            <th>Final Amount</th>
            <th>Payment Method</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{formatDate(item.date)}</td>
              <td>{item.customerName || '-'}</td>
              <td>{item.phoneNumber || '-'}</td>
              <td>{item.gender || '-'}</td>
              <td>{item.age || '-'}</td>
              <td>{item.customerRegion || '-'}</td>
              <td>{item.productName || '-'}</td>
              <td>{item.productCategory || '-'}</td>
              <td>{formatNumber(item.quantity)}</td>
              <td>₹{formatNumber(item.pricePerUnit)}</td>
              <td>{item.discountPercentage || 0}%</td>
              <td className="amount">₹{formatNumber(item.finalAmount)}</td>
              <td>{item.paymentMethod || '-'}</td>
              <td>
                <span className={`status-badge status-${item.orderStatus?.toLowerCase()}`}>
                  {item.orderStatus || '-'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
