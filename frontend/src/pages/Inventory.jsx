import React from 'react';

export default function Inventory() {
  const materials = [
    { name: "Organic Cotton Yarn", category: "Textiles", count: 450, unit: "kg" },
    { name: "Teak Wood Blocks", category: "Woodwork", count: 120, unit: "pcs" },
    { name: "Natural Indigo Dye", category: "Dyes", count: 15, unit: "L" },
    { name: "Leather Scraps", category: "Leather", count: 85, unit: "kg" },
    { name: "Beeswax", category: "Supplies", count: 40, unit: "kg" },
    { name: "Loom Needles", category: "Hardware", count: 320, unit: "pcs" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-12 border-b-4 border-forest pb-6 flex justify-between items-end">
        <div>
          <p className="text-burnt font-bold tracking-widest uppercase mb-2">Storage Module</p>
          <h1 className="text-5xl font-serif font-bold text-forest-dark">Raw Material Inventory</h1>
        </div>
        <button className="bg-forest hover:bg-forest-light text-white font-bold py-4 px-8 text-xl uppercase tracking-widest border-2 border-forest-dark shadow-[4px_4px_0px_#1B4D3E]">
          + Add Stock
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((item, idx) => (
          <div key={idx} className="bg-white p-8 border-4 border-forest shadow-[6px_6px_0px_#1B4D3E] flex flex-col justify-between hover:bg-cream/20 transition-colors">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-burnt mb-2 block">{item.category}</span>
              <h2 className="text-2xl font-bold text-forest-dark mb-6 leading-tight h-16">{item.name}</h2>
            </div>
            
            <div className="border-t-4 border-forest pt-6 mt-4 flex items-end justify-between">
              <div>
                <span className="text-sm font-bold text-forest uppercase tracking-widest">In Stock</span>
                <div className="text-6xl font-serif font-bold text-forest-dark mt-2 leading-none">
                  {item.count}
                </div>
              </div>
              <span className="text-xl font-bold text-burnt uppercase tracking-widest pb-1">{item.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
