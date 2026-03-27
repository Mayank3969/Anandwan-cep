import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, Calculator, Package, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const getNavLinkClass = ({ isActive }) => {
    return `flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium ${
      isActive 
        ? 'bg-white/20 text-white' 
        : 'text-green-50 hover:bg-white/10 hover:text-brand-orange'
    }`;
  };

  return (
    <nav className="bg-brand-green text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <Leaf className="h-6 w-6 text-brand-orange" />
            <span className="font-bold text-xl tracking-tight">Anandwan Engine</span>
          </NavLink>
          
          <div className="hidden md:flex space-x-1">
            <NavLink to="/" className={getNavLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/costing" className={getNavLinkClass}>
              <Calculator className="w-4 h-4" /> Costing
            </NavLink>
            <NavLink to="/inventory" className={getNavLinkClass}>
              <Package className="w-4 h-4" /> Inventory
            </NavLink>
            <NavLink to="/dashboard" className={getNavLinkClass}>
              <BarChart3 className="w-4 h-4" /> Dashboard
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
