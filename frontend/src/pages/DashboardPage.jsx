import React, { useState, useEffect } from 'react';
import { getDashboardSummary, getDashboardImpact } from '../api/client';
import DashboardChart from '../components/DashboardChart';

const DashboardPage = () => {
  const [summary, setSummary] = useState({ total_revenue: 0 });
  const [impact, setImpact] = useState({ total_labor_hours: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sumRes, impRes] = await Promise.all([
        getDashboardSummary(),
        getDashboardImpact()
      ]);
      setSummary(sumRes.data);
      setImpact(impRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = [
    { name: 'Jan', Revenue: 4000, Cost: 2400 },
    { name: 'Feb', Revenue: 3000, Cost: 1398 },
    { name: 'Mar', Revenue: 2000, Cost: 9800 },
    { name: 'Apr', Revenue: 2780, Cost: 3908 },
    { name: 'May', Revenue: 1890, Cost: 4800 },
    { name: 'Jun', Revenue: summary.total_revenue || 5000, Cost: 3000 }, 
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sustainability Dashboard</h1>
        <p className="text-gray-500 mt-2">Track the financial and social impact of Anandwan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-brand-green">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Total Revenue</h3>
          <p className="text-3xl font-black text-gray-800">₹{summary.total_revenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-brand-orange">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Total Cost</h3>
          <p className="text-3xl font-black text-gray-800">₹----</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Net Margin</h3>
          <p className="text-3xl font-black text-gray-800">---%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-600">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Labor Hours Supported</h3>
          <p className="text-3xl font-black text-gray-800">{impact.total_labor_hours.toLocaleString()} hrs</p>
        </div>
      </div>

      <DashboardChart data={chartData} />
    </div>
  );
};

export default DashboardPage;
