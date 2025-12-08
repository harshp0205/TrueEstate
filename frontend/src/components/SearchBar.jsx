import React from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange, onSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search by customer name or phone number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <span className="search-icon">🔍</span>
    </div>
  );
}

export default SearchBar;
