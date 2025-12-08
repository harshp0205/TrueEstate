import React, { useEffect } from 'react';
import { useSalesQuery } from '../hooks/useSalesQuery';

function SalesDashboard() {
  // Test the hook with some initial values
  const { data, loading, error } = useSalesQuery({
    page: 1,
    pageSize: 10,
    sortBy: 'date',
    sortOrder: 'desc',
  });

  // Log data for testing
  useEffect(() => {
    if (data && data.items) {
      console.log('Sales data loaded:', data);
      console.log('Number of items:', data.items.length);
      console.log('Total items:', data.totalItems);
    }
  }, [data]);

  return (
    <div className="dashboard-container">
      <div className="filter-panel">
        <h2>Filters</h2>
        <p>Filter panel will go here</p>
      </div>
      <div className="main-content">
        <h2>Sales Dashboard</h2>
        
        {loading && <p>Loading sales data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {!loading && !error && (
          <div>
            <p>Total Records: {data.totalItems}</p>
            <p>Current Page: {data.page} of {data.totalPages}</p>
            <p>Records on this page: {data.items.length}</p>
            
            {data.items.length > 0 && (
              <div>
                <h3>Sample Record:</h3>
                <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                  {JSON.stringify(data.items[0], null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SalesDashboard;
