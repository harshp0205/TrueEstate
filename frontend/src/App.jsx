import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SalesDashboard from './routes/SalesDashboard';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Retail Sales Management</h1>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<SalesDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
