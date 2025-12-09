import React, { useState, useRef, useEffect } from 'react';
import './FilterDropdown.css';

function FilterDropdown({ label, options, selected, onChange, isMulti = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (value) => {
    if (isMulti) {
      const newSelected = selected.includes(value)
        ? selected.filter(item => item !== value)
        : [...selected, value];
      onChange(newSelected);
    } else {
      // Single select mode
      if (selected.includes(value)) {
        onChange([]); // Deselect if already selected
      } else {
        onChange([value]); // Select only this one
      }
      setIsOpen(false);
    }
  };

  const displayText = selected.length > 0
    ? `${label} (${selected.length})`
    : label;

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className={`filter-dropdown-button ${selected.length > 0 ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayText}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
        >
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="filter-dropdown-menu">
          {options.map((option) => (
            <label key={option} className="filter-option">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => handleToggle(option)}
              />
              <span className="checkbox-custom"></span>
              <span className="option-label">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
