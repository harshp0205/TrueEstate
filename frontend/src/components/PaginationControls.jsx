import React from 'react';
import './PaginationControls.css';

function PaginationControls({ page, totalPages, hasNextPage, hasPrevPage, onPageChange }) {
  return (
    <div className="pagination-controls">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevPage}
      >
        ← Previous
      </button>

      <span className="pagination-info">
        Page {page} of {totalPages}
      </span>

      <button
        className="pagination-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
      >
        Next →
      </button>
    </div>
  );
}

export default PaginationControls;
