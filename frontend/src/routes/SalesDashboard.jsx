import React, { useState } from 'react';
import { useSalesQuery } from '../hooks/useSalesQuery';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import SummaryCards from '../components/SummaryCards';
import TransactionsTable from '../components/TransactionsTable';
import PaginationControls from '../components/PaginationControls';
import './SalesDashboard.css';

function SalesDashboard() {
  // State management - all UI state
  const [search, setSearch] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [ageRange, setAgeRange] = useState([null, null]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Filter options
  const regions = ['North', 'South', 'East', 'West'];
  const genders = ['Male', 'Female'];
  const categories = ['Clothing', 'Electronics', 'Home & Garden', 'Beauty', 'Sports', 'Books'];
  const tags = ['New Arrival', 'Best Seller', 'Limited Edition', 'On Sale'];
  const paymentMethods = ['Credit Card', 'Debit Card', 'Cash', 'Online Payment'];

  // Fetch data using the custom hook - backend handles ALL filtering, sorting, and pagination
  const { data, loading, error } = useSalesQuery({
    search,
    selectedRegions,
    selectedGenders,
    ageRange,
    selectedCategories,
    selectedTags,
    selectedPaymentMethods,
    dateRange,
    sortBy,
    sortOrder,
    page,
    pageSize,
  });

  // Handlers
  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
    setPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (newPage) => {
    setPage(newPage); // Only update page, keep filters/search/sort
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPage(1);
  };

  const clearAllFilters = () => {
    setSelectedRegions([]);
    setSelectedGenders([]);
    setAgeRange([null, null]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedPaymentMethods([]);
    setDateRange([null, null]);
    setPage(1);
  };

  const hasActiveFilters = selectedRegions.length > 0 || selectedGenders.length > 0 ||
    selectedCategories.length > 0 || selectedTags.length > 0 ||
    selectedPaymentMethods.length > 0 || ageRange[0] !== null || ageRange[1] !== null ||
    dateRange[0] !== null || dateRange[1] !== null;

  return (
    <div className="sales-dashboard">
      {/* Top Bar */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Sales Management System</h1>
        <SearchBar
          value={search}
          onChange={handleSearchChange}
          onSubmit={() => setPage(1)}
        />
      </div>

      {/* Filters Row */}
      <div className="filters-row">
        <div className="filters-left">
          <button className="reset-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 2L2 14M2 2l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <FilterDropdown
            label="Customer Region"
            options={regions}
            selected={selectedRegions}
            onChange={(values) => { setSelectedRegions(values); setPage(1); }}
          />

          <FilterDropdown
            label="Gender"
            options={genders}
            selected={selectedGenders}
            onChange={(values) => { setSelectedGenders(values); setPage(1); }}
          />

          <FilterDropdown
            label="Age Range"
            options={['18-25', '26-35', '36-45', '46-60', '60+']}
            selected={ageRange[0] && ageRange[1] ? [`${ageRange[0]}-${ageRange[1]}`] : []}
            onChange={(values) => {
              if (values.length > 0) {
                const [min, max] = values[0].split('-').map(v => v === '+' ? 100 : parseInt(v));
                setAgeRange([min, max]);
              } else {
                setAgeRange([null, null]);
              }
              setPage(1);
            }}
          />

          <FilterDropdown
            label="Product Category"
            options={categories}
            selected={selectedCategories}
            onChange={(values) => { setSelectedCategories(values); setPage(1); }}
          />

          <FilterDropdown
            label="Tags"
            options={tags}
            selected={selectedTags}
            onChange={(values) => { setSelectedTags(values); setPage(1); }}
          />

          <FilterDropdown
            label="Payment Method"
            options={paymentMethods}
            selected={selectedPaymentMethods}
            onChange={(values) => { setSelectedPaymentMethods(values); setPage(1); }}
          />

          <FilterDropdown
            label="Date"
            options={['Last 7 days', 'Last 30 days', 'Last 90 days', 'This Year']}
            selected={dateRange[0] && dateRange[1] ? ['Custom'] : []}
            onChange={(values) => {
              // This would need proper date range picker implementation
              setPage(1);
            }}
          />
        </div>

        <div className="filters-right">
          <div className="sort-dropdown-compact">
            <label>Sort by:</label>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                handleSortChange(field, order);
              }}
            >
              <option value="customerName-asc">Customer Name (A-Z)</option>
              <option value="customerName-desc">Customer Name (Z-A)</option>
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="quantity-desc">Quantity (High to Low)</option>
              <option value="quantity-asc">Quantity (Low to High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Loading State */}
        {loading && (
          <div className="loading-state">Loading transactions...</div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">Error: {error}</div>
        )}

        {/* Invalid Range Warning */}
        {!loading && !error && data?.invalidRange && (
          <div className="warning-state">
            Invalid age range, please adjust filters.
          </div>
        )}

        {/* Content: Summary Cards + Table + Pagination */}
        {!loading && !error && !data?.invalidRange && (
          <>
            {/* Summary Cards */}
            <SummaryCards data={data} />

            {/* Transactions Table */}
            <TransactionsTable items={data?.items || []} />

            {/* Pagination Controls */}
            {data?.totalPages > 1 && (
              <PaginationControls
                page={data?.page || page}
                totalPages={data?.totalPages || 1}
                hasNextPage={!!data?.hasNextPage}
                hasPrevPage={!!data?.hasPrevPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SalesDashboard;
