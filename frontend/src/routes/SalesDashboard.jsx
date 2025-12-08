import React, { useState } from 'react';
import { useSalesQuery } from '../hooks/useSalesQuery';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import SortDropdown from '../components/SortDropdown';
import TransactionsTable from '../components/TransactionsTable';
import PaginationControls from '../components/PaginationControls';

function SalesDashboard() {
  // State management
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    selectedRegions: [],
    selectedGenders: [],
    ageRange: { min: null, max: null },
    selectedCategories: [],
    selectedTags: [],
    selectedPaymentMethods: [],
    dateRange: { from: '', to: '' },
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Fetch data using the custom hook
  const { data, loading, error } = useSalesQuery({
    search,
    selectedRegions: filters.selectedRegions,
    selectedGenders: filters.selectedGenders,
    ageRange: filters.ageRange,
    selectedCategories: filters.selectedCategories,
    selectedTags: filters.selectedTags,
    selectedPaymentMethods: filters.selectedPaymentMethods,
    dateRange: filters.dateRange,
    sortBy,
    sortOrder,
    page,
    pageSize,
  });

  // Handlers
  const handleSortChange = ({ sortBy: newSortBy, sortOrder: newSortOrder }) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPage(1); // Reset to first page when sorting changes
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
    setPage(1); // Reset to first page when search changes
  };

  return (
    <div className="dashboard-container">
      {/* Left side - Filter Panel */}
      <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Right side - Main Content */}
      <div className="main-content">
        <h2>Sales Dashboard</h2>

        {/* Search Bar */}
        <SearchBar value={search} onChange={handleSearchChange} />

        {/* Sort Dropdown */}
        <SortDropdown sortBy={sortBy} sortOrder={sortOrder} onChange={handleSortChange} />

        {/* Loading/Error States */}
        {loading && <p>Loading transactions...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {/* Results Summary */}
        {!loading && !error && (
          <div style={{ marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
            Showing {data.items.length} of {data.totalItems} transactions
          </div>
        )}

        {/* Transactions Table */}
        {!loading && !error && <TransactionsTable items={data.items} />}

        {/* Pagination Controls */}
        {!loading && !error && data.totalPages > 0 && (
          <PaginationControls
            page={data.page}
            totalPages={data.totalPages}
            hasNextPage={data.hasNextPage}
            hasPrevPage={data.hasPrevPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default SalesDashboard;
