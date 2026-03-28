import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calculator, Box, Activity, LogOut } from 'lucide-react';

export default function Sidebar() {
  const links = [
    { to: "/dashboard", icon: <Home className="w-6 h-6" />, label: "Dashboard" },
    { to: "/calculator", icon: <Calculator className="w-6 h-6" />, label: "Price Calculator" },
    { to: "/inventory", icon: <Box className="w-6 h-6" />, label: "Inventory" },
    { to: "/activity", icon: <Activity className="w-6 h-6" />, label: "Activity Tracker" },
  ];

  return (
    <div className="w-72 bg-forest-dark text-cream h-full flex flex-col border-r-4 border-forest-light">
      <div className="p-8 pb-4">
        <h1 className="text-3xl font-bold font-serif tracking-wide text-burnt-light">M.S.S.</h1>
        <p className="text-cream/80 text-sm mt-2 font-bold uppercase tracking-wider">Archive System</p>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 rounded-none font-bold text-lg transition-all border-l-4 ${
                isActive 
                  ? 'bg-forest border-burnt text-cream' 
                  : 'border-transparent text-cream/70 hover:bg-forest/50 hover:text-cream'
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t-2 border-forest-light">
        <NavLink to="/login" className="flex items-center gap-4 px-6 py-4 text-cream/70 hover:text-burnt font-bold w-full transition-colors">
          <LogOut className="w-6 h-6" />
          Sign Out
        </NavLink>
      </div>
    </div>
  );
}
