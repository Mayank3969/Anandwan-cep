import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calculator, Box, BarChart2, LogOut, HelpCircle, ChevronLeft, ChevronRight, Leaf } from 'lucide-react';

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);

  const links = [
    { to: "/dashboard", icon: <Home className="w-7 h-7" strokeWidth={2.5} />, label: "Home" },
    { to: "/calculator", icon: <Calculator className="w-7 h-7" strokeWidth={2.5} />, label: "Price Calculator" },
    { to: "/inventory", icon: <Box className="w-7 h-7" strokeWidth={2.5} />, label: "Inventory" },
    { to: "/activity", icon: <BarChart2 className="w-7 h-7" strokeWidth={2.5} />, label: "Work & Sales Tracker" },
  ];

  const bottomLinks = [
    { to: "/support", icon: <HelpCircle className="w-7 h-7" strokeWidth={2.5} />, label: "Support" },
    { to: "/login", icon: <LogOut className="w-7 h-7" strokeWidth={2.5} />, label: "Logout", isLogout: true },
  ];

  return (
    <div 
      className={`bg-[#1a3e35] text-white h-full flex flex-col transition-all duration-300 relative ${isMinimized ? 'w-24' : 'w-72'}`}
    >
      {/* Header */}
      <div className={`pt-8 pb-8 flex items-center gap-4 h-28 overflow-hidden whitespace-nowrap transition-all duration-300 ${isMinimized ? 'px-0' : 'px-8 mx-0'}`}>
        <div className={`flex justify-center transition-all duration-300 shrink-0 ${isMinimized ? 'w-24' : ''}`}>
          <div className="bg-white text-[#1a3e35] rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm p-2">
            <Leaf className="w-6 h-6" fill="currentColor" />
          </div>
        </div>
        <div className={`flex flex-col transition-opacity duration-300 ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-2xl font-bold font-serif leading-tight">MSS</h1>
          <p className="text-[11px] text-gray-300 font-bold uppercase tracking-widest letter-spacing-1">Woven Authority</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 mt-6 overflow-hidden">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center py-4 mx-4 rounded-md font-bold text-base transition-colors duration-200 overflow-hidden whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#B84800] text-white' 
                      : 'text-gray-300 hover:bg-[#15322a] hover:text-white'
                  }`
                }
                title={isMinimized ? link.label : ""}
              >
                <div className="w-16 shrink-0 flex justify-center">{link.icon}</div>
                <span className={`transition-opacity duration-300 ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="mb-6 space-y-4 overflow-hidden">
        <div className="border-b border-[#245244] pb-4">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-full flex items-center py-4 rounded-none font-bold text-base transition-colors duration-200 text-gray-300 hover:bg-[#15322a] hover:text-white overflow-hidden whitespace-nowrap"
            title={isMinimized ? "Maximize Sidebar" : "Minimize Sidebar"}
          >
            <div className="w-24 shrink-0 flex justify-center">
              {isMinimized ? <ChevronRight className="w-7 h-7" strokeWidth={3} /> : <ChevronLeft className="w-7 h-7" strokeWidth={3} />}
            </div>
            <span className={`transition-opacity duration-300 ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>Collapse Menu</span>
          </button>
        </div>

        <ul className="space-y-2">
          {bottomLinks.map((link) => {
            if (isMinimized && link.isLogout) return null;
            
            return (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => {
                    const baseStyle = "flex items-center py-4 mx-4 rounded-md font-bold text-base transition-colors duration-200 overflow-hidden whitespace-nowrap";
                    
                    if (link.isLogout) {
                      return `${baseStyle} text-red-500 hover:bg-red-950/50 hover:text-red-400`;
                    }
                    
                    return `${baseStyle} ${isActive ? 'bg-[#B84800] text-white' : 'text-gray-300 hover:bg-[#15322a] hover:text-white'}`;
                  }}
                  title={isMinimized ? link.label : ""}
                >
                  <div className="w-16 shrink-0 flex justify-center">{link.icon}</div>
                  <span className={`transition-opacity duration-300 ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>{link.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
