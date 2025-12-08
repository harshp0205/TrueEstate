import React from 'react';
import './SortDropdown.css';

function SortDropdown({ sortBy, sortOrder, onChange }) {
  const handleSortByChange = (newSortBy) => {
    // Set default order based on sortBy
    const defaultOrder = newSortBy === 'date' ? 'desc' : 'asc';
    onChange({ sortBy: newSortBy, sortOrder: sortOrder || defaultOrder });
  };

  const handleSortOrderChange = (newSortOrder) => {
    onChange({ sortBy, sortOrder: newSortOrder });
  };

  return (
    <div className="sort-dropdown">
      <div className="sort-field">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => handleSortByChange(e.target.value)}>
          <option value="date">Date</option>
          <option value="quantity">Quantity</option>
          <option value="customerName">Customer Name</option>
        </select>
      </div>

      <div className="sort-field">
        <label>Order:</label>
        <select value={sortOrder} onChange={(e) => handleSortOrderChange(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default SortDropdown;
