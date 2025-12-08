import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SalesDashboard from './routes/SalesDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SalesDashboard />} />
    </Routes>
  );
}

export default App;
