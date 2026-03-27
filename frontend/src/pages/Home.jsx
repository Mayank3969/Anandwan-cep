import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Package, BarChart3 } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-gray-50 text-center">
      <h1 className="text-5xl font-black text-brand-green mb-6 tracking-tight">Anandwan Costing Engine</h1>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl">
        A deterministic sustainability platform balancing fair labor, smart margins, and environmental impact.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <Link to="/costing" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-brand-green hover:shadow-md transition group">
          <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-brand-green transition">
            <Calculator className="w-8 h-8 text-brand-green group-hover:text-white transition" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Smart Costing Wizard</h2>
          <p className="text-gray-500">Calculate real-time MSP based on raw materials, labor, and dynamic overhead margins.</p>
        </Link>
        
        <Link to="/inventory" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-brand-green hover:shadow-md transition group">
          <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-600 transition">
            <Package className="w-8 h-8 text-blue-600 group-hover:text-white transition" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Digital Inventory</h2>
          <p className="text-gray-500">Searchable catalog of products, categories, and historical Minimum Selling Prices.</p>
        </Link>
        
        <Link to="/dashboard" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-brand-orange hover:shadow-md transition group">
          <div className="h-16 w-16 bg-orange-50 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-brand-orange transition">
            <BarChart3 className="w-8 h-8 text-brand-orange group-hover:text-white transition" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Sustainability Dashboard</h2>
          <p className="text-gray-500">Visualize revenue vs. cost trends and track total labor hours supported by sales.</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
