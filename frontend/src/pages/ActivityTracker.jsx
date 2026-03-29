import React, { useState } from 'react';
import { Download, Zap, Leaf, User, PenTool, ShoppingCart, Plus } from 'lucide-react';

export default function ActivityTracker() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  const ranges = ['Last 7 Days', 'Last 30 Days', 'Quarter', 'Full Year'];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 text-[#1a3e35] relative">
      
      {/* Top Navbar Simulation */}
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-black text-[#1a3e35] tracking-tight">
          Work & Sales Tracker
        </h2>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center hover:bg-[#e4e6d4] transition">
            <Zap className="w-5 h-5 text-[#1a3e35]" strokeWidth={3} />
          </button>
          <button className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center hover:bg-[#e4e6d4] transition mr-3">
            <Leaf className="w-5 h-5 text-[#1a3e35]" strokeWidth={3} />
          </button>
          <button className="w-10 h-10 rounded overflow-hidden bg-white border-2 border-[#1a3e35] flex justify-center items-end shadow-sm">
            <User fill="#1a3e35" className="w-8 h-8 text-[#1a3e35] translate-y-1.5" />
          </button>
        </div>
      </div>

      {/* Time Filters Row */}
      <div className="flex flex-wrap gap-6 mb-12">
        {ranges.map(range => {
          const isActive = timeRange === range;
          return (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-8 py-5 font-black text-xl rounded-md transition-colors shadow-sm
                ${isActive 
                  ? 'bg-[#a33b00] text-white border-2 border-[#a33b00]' 
                  : 'bg-white text-[#a33b00] border-2 border-[#a33b00] hover:bg-[#fff9f5]'
                }`}
            >
              {range}
            </button>
          );
        })}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        
        {/* Metric 1 */}
        <div className="bg-white rounded-lg p-10 shadow-sm border-l-[16px] border-[#0c241c] flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <PenTool className="w-6 h-6 text-gray-500" strokeWidth={2.5} />
            <h3 className="text-gray-500 font-bold text-lg tracking-[0.2em] uppercase">Total Items Made</h3>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-8xl font-black text-[#0c241c] tracking-tighter leading-none">142</span>
            <span className="bg-transparent text-green-700 font-black text-base pb-3">
              +12% vs last month
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-lg p-10 shadow-sm border-l-[16px] border-[#a33b00] flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <ShoppingCart className="w-6 h-6 text-gray-500" strokeWidth={2.5} />
            <h3 className="text-gray-500 font-bold text-lg tracking-[0.2em] uppercase">Total Items Sold</h3>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-8xl font-black text-[#a33b00] tracking-tighter leading-none">98</span>
            <span className="bg-transparent text-green-700 font-black text-base pb-3">
              +8% vs last month
            </span>
          </div>
        </div>
      </div>

      {/* Chart Placeholder Row */}
      <div className="bg-[#f2f4e6] rounded-xl p-10 pb-8 shadow-sm mb-12 relative border border-[#e4e6d4]">
        
        <div className="flex justify-between items-start mb-24">
          <div>
            <h3 className="text-2xl font-black text-black">Production vs. Sales Volume</h3>
            <p className="text-gray-600 font-medium mt-1">Monthly comparative performance index</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#c44e00] rounded-sm"></div>
              <span className="font-bold text-black text-lg">Production</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#ebc800] rounded-sm"></div>
              <span className="font-bold text-black text-lg">Sales</span>
            </div>
          </div>
        </div>

        {/* X-Axis Labels */}
        <div className="border-t-4 border-gray-300 pt-6 flex justify-around">
          <span className="text-gray-600 font-bold text-xl">Week 1</span>
          <span className="text-gray-600 font-bold text-xl">Week 2</span>
          <span className="text-gray-600 font-bold text-xl">Week 3</span>
          <span className="text-gray-600 font-bold text-xl">Week 4</span>
        </div>

        {/* Floating Add Button for Chart Data */}
        <button className="absolute bottom-1/2 translate-y-12 -right-4 w-16 h-16 bg-[#a33b00] border-2 border-[#732a00] hover:bg-[#8f3400] transition-colors rounded-lg shadow-md flex items-center justify-center">
          <Plus className="w-10 h-10 text-white" strokeWidth={3} />
        </button>
      </div>

      {/* Bottom Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Alert Card (Takes 2 cols) */}
        <div className="md:col-span-2 bg-[#0a231b] rounded-xl p-10 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-black text-white mb-4">Inventory Alert</h3>
            <p className="text-[#a4bbad] text-lg font-medium leading-relaxed max-w-lg mb-8">
              Stock for "Anandwan Handloom Saree" is falling behind sales velocity. Recommend increasing production cycles by 15%.
            </p>
          </div>
          <button className="bg-white text-black font-black text-xl py-5 px-8 rounded-md w-max hover:bg-gray-100 transition-colors shadow-sm">
            Adjust Production Schedule
          </button>
        </div>

        {/* Right Export Card (Takes 1 col) */}
        <div className="bg-[#e9eadc] rounded-xl p-10 shadow-sm border border-[#d6d8c5] flex flex-col items-center justify-center text-center">
          <Download className="w-12 h-12 text-[#a33b00] mb-6" strokeWidth={2.5} />
          <h3 className="text-2xl font-black text-black mb-4">Export Full Report</h3>
          <p className="text-gray-600 font-medium mb-8">
            Available in PDF, Excel, and CSV formats.
          </p>
          <button className="w-full bg-transparent border-4 border-[#a33b00] text-[#a33b00] font-black text-xl py-4 rounded-md hover:bg-[#a33b00] hover:text-white transition-colors duration-300">
            Download Now
          </button>
        </div>

      </div>
    </div>
  );
}
