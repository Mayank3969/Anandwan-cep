import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PriceCalculator from './pages/PriceCalculator';
import Inventory from './pages/Inventory';
import ActivityTracker from './pages/ActivityTracker';
import { isAuthenticated } from './services/api';

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-[#f8f7eb]">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const authenticated = isAuthenticated();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/calculator"
          element={
            <ProtectedRoute>
              <Layout><PriceCalculator /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Layout><Inventory /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <Layout><ActivityTracker /></Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to={authenticated ? '/dashboard' : '/login'} replace />} />
        <Route path="*" element={<Navigate to={authenticated ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
