import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PriceCalculator from './pages/PriceCalculator';
import Inventory from './pages/Inventory';
import ActivityTracker from './pages/ActivityTracker';

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-cream">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes (assumed functional for mock purposes) */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/calculator" element={<Layout><PriceCalculator /></Layout>} />
        <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
        <Route path="/activity" element={<Layout><ActivityTracker /></Layout>} />
        
        {/* Default redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
