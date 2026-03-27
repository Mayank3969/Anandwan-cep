import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, Calculator, Package, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const getNavLinkClass = ({ isActive }) => {
    return `flex items-center gap-4 px-3 py-3 rounded-lg transition-all font-medium whitespace-nowrap overflow-hidden ${
      isActive 
        ? 'bg-white/10 text-[#ef6c00] shadow-sm' 
        : 'text-green-50 hover:bg-white/10 hover:text-[#ef6c00]'
    }`;
  };

  return (
    <aside 
      className={`bg-[#2e7d32] text-white shadow-xl transition-all duration-300 ease-in-out flex flex-col h-screen sticky top-0 z-50 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 mb-4 mt-2">
        <NavLink to="/" className={`flex items-center gap-3 overflow-hidden ${collapsed ? 'justify-center w-full' : ''}`}>
          <Leaf className="h-8 w-8 text-[#ef6c00] flex-shrink-0" />
          {!collapsed && <span className="font-bold text-xl tracking-tight leading-none text-white transition-opacity duration-300">Anandwan Engine</span>}
        </NavLink>
      </div>
      
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-white text-[#2e7d32] rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors z-50"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className="flex-1 px-3 space-y-2 overflow-y-auto">
        <NavLink to="/" className={getNavLinkClass} end title="Home">
          <div className="flex justify-center w-8"><Leaf className="w-5 h-5 flex-shrink-0" /></div>
          {!collapsed && <span>Home</span>}
        </NavLink>
        <NavLink to="/costing" className={getNavLinkClass} title="Costing Wizard">
          <div className="flex justify-center w-8"><Calculator className="w-5 h-5 flex-shrink-0" /></div>
          {!collapsed && <span>Costing Wizard</span>}
        </NavLink>
        <NavLink to="/inventory" className={getNavLinkClass} title="Inventory">
          <div className="flex justify-center w-8"><Package className="w-5 h-5 flex-shrink-0" /></div>
          {!collapsed && <span>Inventory</span>}
        </NavLink>
        <NavLink to="/dashboard" className={getNavLinkClass} title="Dashboard">
          <div className="flex justify-center w-8"><BarChart3 className="w-5 h-5 flex-shrink-0" /></div>
          {!collapsed && <span>Dashboard</span>}
        </NavLink>
      </div>

      <div className={`p-4 text-xs text-white/50 transition-opacity duration-300 ${collapsed ? 'opacity-0 hidden' : 'opacity-100 text-center'}`}>
        &copy; 2026 Anandwan
      </div>
    </aside>
  );
};

export default Sidebar;
