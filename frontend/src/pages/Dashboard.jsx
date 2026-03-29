import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Box, Leaf, Zap, User, MoveRight, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const transactions = [
    { batch: "#MSS-2024-001", material: "Organic Khadi Cotton", impact: "HIGH POSITIVE", value: "₹45,200", impactColor: "bg-[#bbf7d0] text-[#166534]" },
    { batch: "#MSS-2024-002", material: "Recycled Silk Yarn", impact: "HIGH POSITIVE", value: "₹12,850", impactColor: "bg-[#bbf7d0] text-[#166534]" },
    { batch: "#MSS-2024-003", material: "Hemp Fiber Batch", impact: "NEUTRAL", value: "₹8,400", impactColor: "bg-[#fed7aa] text-[#c2410c]" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 text-[#1a3e35] relative">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <p className="text-[#c2410c] text-sm font-black uppercase tracking-[0.15em] mb-2">
            Dashboard Overview
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-black text-[#1a3e35]">
            Maharogi Seva Samiti
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 rounded-full bg-[#f1f1e6] flex items-center justify-center hover:bg-[#e4e4d5] transition">
            <Zap className="w-6 h-6 text-[#1a3e35]" fill="currentColor" />
          </button>
          <button className="w-12 h-12 rounded-full bg-[#f1f1e6] flex items-center justify-center hover:bg-[#e4e4d5] transition">
            <Leaf className="w-6 h-6 text-[#1a3e35]" fill="currentColor" />
          </button>
          <button className="w-12 h-12 rounded-md overflow-hidden bg-gray-300 ml-2">
            {/* Mock profile image avatar */}
            <div className="w-full h-full bg-[#9ca3af] flex justify-center items-end">
              <User fill="white" className="w-10 h-10 text-white translate-y-2" />
            </div>
          </button>
        </div>
      </div>

      {/* Top Grid: Calculator and Materials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        
        {/* Price Calculator Left Card (Takes 2 columns) */}
        <div className="md:col-span-2 relative bg-[#2a5a4a] rounded-lg p-10 overflow-hidden group shadow-sm transition hover:shadow-md">
          {/* Subtle noise/texture overlay simulation */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-[#B84800] rounded-md flex items-center justify-center mb-6 shadow-sm">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-4xl font-serif font-black text-white mb-4">
              Price Calculator
            </h2>
            <p className="text-white text-xl font-bold max-w-lg mb-8 leading-relaxed">
              Calculate a Price based on current material rates and labor costs.
            </p>
            
            <Link to="/calculator" className="inline-flex items-center gap-2 text-[#c2410c] bg-white px-6 py-3 rounded hover:bg-gray-100 font-black text-lg uppercase tracking-wider transition-colors shadow-sm">
              Access Calculator <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* View Materials Right Card (Takes 1 column) - Wrapped in Link */}
        <Link 
          to="/inventory"
          className="block md:col-span-1 bg-[#fbfaf0] border-2 border-[#e5e4d5] rounded-lg p-10 shadow-sm flex flex-col justify-between hover:border-[#B84800] hover:shadow-md transition-all group relative"
        >
          <div className="mb-4">
            <div className="w-16 h-16 bg-[#1a3e35] group-hover:bg-[#B84800] transition-colors rounded-md flex flex-col items-center justify-center mb-6 shadow-sm">
              <Box className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-serif font-black text-[#1a3e35] mb-4 leading-tight">
              View Materials
            </h2>
            <p className="text-[#1a3e35] text-lg font-bold mb-8 leading-relaxed">
              Click here to track inventory for all raw fibers and finished goods.
            </p>
          </div>
          
          <div>
            <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden mb-3">
              <div className="bg-[#1a3e35] w-3/4 h-full rounded-full"></div>
            </div>
            <p className="text-sm font-black text-[#c2410c] uppercase tracking-wider mb-6">
              Stock Capacity: 75%
            </p>

            <div className="inline-flex items-center gap-2 bg-[#1a3e35] text-white px-6 py-3 rounded hover:bg-[#204a3f] font-black text-lg uppercase tracking-wider transition-colors shadow-sm">
              View Inventory <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>
        </Link>
      </div>

      {/* Analytics Row */}
      <div className="bg-white rounded-lg p-12 mb-12 shadow-sm flex flex-col md:flex-row items-center justify-between border-2 border-gray-200">
        <div className="max-w-xl">
          <div className="flex items-center gap-4 mb-6">
            {/* Pie chart mini icon */}
            <div className="w-12 h-12 rounded-full bg-[#fde68a] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#B84800]" stroke="currentColor" strokeWidth="3">
                 <path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-black text-[#1a3e35] uppercase tracking-wide">
              Sustainability Impact
            </h2>
          </div>
          <p className="text-[#1a3e35] text-xl font-bold leading-relaxed">
            View Sales & Labor metrics aligned with our environmental and social governance goals.
          </p>
        </div>
        
        {/* Mock Chart Graphic */}
        <div className="flex items-end gap-3 h-32 mt-8 md:mt-0">
          <div className="w-6 h-16 bg-[#d1d5db] rounded-t-md" />
          <div className="w-6 h-20 bg-[#9ca3af] rounded-t-md" />
          <div className="w-6 h-12 bg-[#6b7280] rounded-t-md" />
          <div className="w-6 h-24 bg-[#2a5a4a] rounded-t-md" />
          <div className="w-6 h-32 bg-[#B84800] rounded-t-md" />
        </div>
      </div>

      {/* Transactions Table */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-serif font-black text-[#1a3e35] tracking-wide">
            Recent Transactions
          </h2>
          <Link to="/activity" className="inline-flex items-center gap-2 bg-[#B84800] text-white px-6 py-3 rounded-md hover:bg-[#a64000] font-black text-sm uppercase tracking-wider transition-colors shadow-sm">
            View All Records <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.5} />
          </Link>
        </div>

        <div className="bg-[#f4f3e6] rounded-lg overflow-hidden border-2 border-[#d5d4c8] shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2a5a4a] text-white text-sm uppercase tracking-widest">
                <th className="py-6 px-8 font-black w-1/4">Batch ID</th>
                <th className="py-6 px-8 font-black w-1/3">Material</th>
                <th className="py-6 px-8 font-black w-1/4">Impact</th>
                <th className="py-6 px-8 font-black text-right w-1/6">Value</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {transactions.map((t, idx) => (
                <tr key={idx} className="border-b-2 border-[#e5e4d5] hover:bg-[#eeecdb] transition-colors">
                  <td className="py-6 px-8 font-bold text-gray-700">{t.batch}</td>
                  <td className="py-6 px-8 font-black text-[#1a3e35]">{t.material}</td>
                  <td className="py-6 px-8">
                    <span className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full ${t.impactColor}`}>
                      {t.impact}
                    </span>
                  </td>
                  <td className="py-6 px-8 font-black text-[#1a3e35] text-right">{t.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
