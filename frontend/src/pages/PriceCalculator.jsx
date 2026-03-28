import React, { useState } from 'react';

export default function PriceCalculator() {
  const [material, setMaterial] = useState(0);
  const [labor, setLabor] = useState(0);
  const [margin, setMargin] = useState(20);

  const calculateTotal = () => {
    return (parseFloat(material || 0) + parseFloat(labor || 0)).toFixed(2);
  };

  const calculateSuggestedPrice = () => {
    const cost = parseFloat(material || 0) + parseFloat(labor || 0);
    const profit = cost * (parseFloat(margin || 0) / 100);
    return (cost + profit).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="mb-12 border-b-4 border-forest pb-6 flex justify-between items-end">
        <div>
          <p className="text-burnt font-bold tracking-widest uppercase mb-2">Costing Module</p>
          <h1 className="text-5xl font-serif font-bold text-forest-dark">Price Calculator</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-white p-8 border-4 border-forest shadow-[8px_8px_0px_#1B4D3E]">
            <h2 className="text-2xl font-serif font-bold text-forest-dark mb-6">Input Costs</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-forest-dark font-bold mb-2 text-xl">Material Cost (₹)</label>
                <input 
                  type="number" 
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full bg-cream p-4 border-b-4 border-forest focus:outline-none focus:border-burnt text-2xl font-bold transition-colors"
                />
              </div>

              <div>
                <label className="block text-forest-dark font-bold mb-2 text-xl">Labor Cost (₹)</label>
                <input 
                  type="number" 
                  value={labor}
                  onChange={(e) => setLabor(e.target.value)}
                  className="w-full bg-cream p-4 border-b-4 border-forest focus:outline-none focus:border-burnt text-2xl font-bold transition-colors"
                />
              </div>

              <div className="pt-6 border-t-2 border-forest/20">
                <div className="flex justify-between mb-2">
                  <label className="text-forest-dark font-bold text-xl">Profit Margin (%)</label>
                  <span className="text-burnt font-bold text-xl">{margin}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={margin}
                  onChange={(e) => setMargin(e.target.value)}
                  className="w-full h-4 bg-cream rounded-none appearance-none cursor-pointer border-2 border-forest"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-forest-dark text-cream p-10 shadow-[12px_12px_0px_#CC5500] border-4 border-forest">
            <h2 className="text-3xl font-serif font-bold mb-8 text-burnt-light border-b-2 border-forest pb-4">Calculation Ledger</h2>
            
            <div className="space-y-6 text-xl">
              <div className="flex justify-between items-center opacity-80 font-bold">
                <span>Material Cost:</span>
                <span>₹{parseFloat(material || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center opacity-80 font-bold">
                <span>Labor Cost:</span>
                <span>₹{parseFloat(labor || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center opacity-80 font-bold border-t-2 border-forest-light pt-6">
                <span>Net Value:</span>
                <span>₹{calculateTotal()}</span>
              </div>
              
              <div className="flex justify-between items-center font-bold text-burnt-light my-4">
                <span>Margin Applied ({margin}%):</span>
                <span>+ ₹{((parseFloat(material || 0) + parseFloat(labor || 0)) * (margin / 100)).toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center pt-8 border-t-4 border-burnt">
                <span className="text-3xl font-serif font-bold text-white">Suggested Price:</span>
                <span className="text-4xl font-serif font-bold text-burnt-light">₹{calculateSuggestedPrice()}</span>
              </div>
            </div>

            <button className="w-full mt-12 bg-burnt hover:bg-burnt-dark text-white font-bold py-6 px-6 text-2xl transition-colors uppercase tracking-widest shadow-inner">
              Save Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
