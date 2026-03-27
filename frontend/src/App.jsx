import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import CostingPage from './pages/CostingPage';
import InventoryPage from './pages/InventoryPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex bg-gray-50 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/costing" element={<CostingPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
