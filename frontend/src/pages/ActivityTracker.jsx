import React, { useState } from 'react';

export default function ActivityTracker() {
  const [timeRange, setTimeRange] = useState('7D');

  const ranges = ['7D', '30D', 'Year'];

  const activityData = {
    '7D': { sales: "₹45,200", items: 142, newOrders: 18 },
    '30D': { sales: "₹182,500", items: 610, newOrders: 82 },
    'Year': { sales: "₹2,450,000", items: 7850, newOrders: 940 }
  };

  const data = activityData[timeRange];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-12 border-b-4 border-forest pb-6 flex justify-between items-end flex-wrap gap-6">
        <div>
          <p className="text-burnt font-bold tracking-widest uppercase mb-2">Metrics Module</p>
          <h1 className="text-5xl font-serif font-bold text-forest-dark">Activity Tracker</h1>
        </div>

        <div className="flex border-4 border-forest bg-white">
          {ranges.map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-8 py-4 font-bold text-xl uppercase tracking-widest transition-colors ${
                timeRange === range 
                  ? 'bg-burnt text-white' 
                  : 'bg-transparent text-forest hover:bg-cream'
              } ${range !== 'Year' ? 'border-r-4 border-forest' : ''}`}
            >
              {range}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-forest-dark text-white p-10 border-4 border-forest shadow-[8px_8px_0px_#CC5500]">
          <h3 className="text-xl font-bold text-burnt-light uppercase tracking-widest mb-6">Total Sales Volume</h3>
          <div className="text-6xl font-serif font-bold text-white mb-4">{data.sales}</div>
          <p className="text-lg font-bold text-cream/70">Generated in the last {timeRange}</p>
        </div>

        <div className="bg-white p-10 border-4 border-forest shadow-[8px_8px_0px_#1B4D3E]">
          <h3 className="text-xl font-bold text-forest uppercase tracking-widest mb-6">Items Produced</h3>
          <div className="text-6xl font-serif font-bold text-forest-dark mb-4">{data.items}</div>
          <p className="text-lg font-bold text-forest/70">Completed by artisans</p>
        </div>

        <div className="bg-white p-10 border-4 border-forest shadow-[8px_8px_0px_#1B4D3E]">
          <h3 className="text-xl font-bold text-forest uppercase tracking-widest mb-6">New Orders</h3>
          <div className="text-6xl font-serif font-bold text-forest-dark mb-4">{data.newOrders}</div>
          <p className="text-lg font-bold text-forest/70">Awaiting processing</p>
        </div>
      </div>

      <div className="bg-white border-4 border-forest p-10 shadow-[8px_8px_0px_#1B4D3E]">
        <h3 className="text-3xl font-serif font-bold text-forest-dark mb-8">Recent Ledger Entries</h3>
        <div className="space-y-6">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex justify-between items-center border-b-2 border-forest/20 pb-6 text-xl">
              <div>
                <span className="font-bold text-forest-dark block">Order #{String(8432 - i).padStart(5, '0')}</span>
                <span className="text-forest text-base font-semibold">Handwoven Cotton Saree</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-burnt block">₹4,200</span>
                <span className="text-forest text-base font-semibold">Completed Today</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
