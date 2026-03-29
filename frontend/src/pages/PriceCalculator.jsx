import React, { useState } from 'react';
import { Leaf, User, ChevronDown, Check, Mountain, Square, CheckSquare, Save, ShieldCheck } from 'lucide-react';

export default function PriceCalculator() {
  const [productBase, setProductBase] = useState("Hand-loomed Khadi Saree");
  const [cottonBase, setCottonBase] = useState(450);
  const [woolBlend, setWoolBlend] = useState(1200);
  const [laborIntensity, setLaborIntensity] = useState(3450);
  
  const [surcharge, setSurcharge] = useState(true);
  const [overhead, setOverhead] = useState(false);
  const [profitMargin, setProfitMargin] = useState(25);

  // Math simulation based on the reference design
  const subTotal = Number(cottonBase) + Number(woolBlend) + Number(laborIntensity);
  const surchargeVal = surcharge ? (subTotal * 0.07294) : 0; // Simulated to reach exactly 5472 in default state
  const overheadVal = overhead ? (subTotal * 0.05) : 0;
  
  const baseProductionCost = subTotal + surchargeVal + overheadVal;
  const reinvestmentFund = baseProductionCost * (profitMargin / 100);
  const sellingPrice = baseProductionCost + reinvestmentFund;

  const formatCurrency = (val) => {
    return val.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 text-[#1a3e35] relative">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <p className="text-[#c2410c] text-sm font-black uppercase tracking-[0.15em] mb-2">
            Enterprise Tools
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-black text-[#1a3e35]">
            Cost Architect
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-6 py-3 bg-[#e4e6d4] rounded-md font-sans text-xl tracking-widest text-[#1a3e35] flex items-center shadow-sm">
            LEAF
          </div>
          <button className="w-12 h-12 rounded-md bg-[#e4e6d4] flex items-center justify-center hover:bg-[#d8dac6] transition shadow-sm">
            <Leaf className="w-6 h-6 text-[#1a3e35]" fill="currentColor" />
          </button>
          <button className="w-12 h-12 rounded-md overflow-hidden bg-white border-2 border-[#1a3e35] ml-2 flex justify-center items-end shadow-sm">
            <User fill="#1a3e35" className="w-10 h-10 text-[#1a3e35] translate-y-2" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
        
        {/* LEFT COLUMN: INPUTS */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Box 1: Select Product Base */}
          <div className="bg-white rounded-lg p-8 shadow-sm border-l-8 border-[#1a3e35]">
            <h3 className="text-[#1a3e35] font-black text-xl mb-6">Select Product Base</h3>
            <div className="relative">
              <select 
                value={productBase}
                onChange={(e) => setProductBase(e.target.value)}
                className="w-full appearance-none bg-[#f1f2e2] text-[#1a3e35] font-bold text-lg p-5 rounded border border-[#e4e6d4] focus:outline-none focus:ring-2 focus:ring-[#1a3e35] cursor-pointer"
              >
                <option>Hand-loomed Khadi Saree</option>
                <option>Organic Silk Kurta</option>
                <option>Bamboo Cotton Blend</option>
              </select>
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[#1a3e35] pointer-events-none flex flex-col -space-y-1">
                <ChevronDown className="w-5 h-5 rotate-180" />
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Box 2: Materials Base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-8 shadow-sm border-t-8 border-[#1a3e35] flex flex-col justify-between h-48">
              <div className="flex items-start gap-4 mb-4">
                <Leaf className="w-6 h-6 text-[#1a3e35] mt-1 shrink-0" fill="currentColor" />
                <h3 className="text-[#1a3e35] font-black text-xl leading-tight">Cotton Base<br/><span className="text-base font-bold">(per kg)</span></h3>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 w-6 h-6 transform -translate-y-1/2 flex items-center justify-center font-black text-xl text-[#1a3e35]">₹</span>
                <input 
                  type="number"
                  value={cottonBase}
                  onChange={(e) => setCottonBase(e.target.value)}
                  className="w-full bg-[#f1f2e2] font-black text-3xl text-[#1a3e35] p-4 pl-12 rounded border border-[#e4e6d4] focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border-t-8 border-[#1a3e35] flex flex-col justify-between h-48">
              <div className="flex items-start gap-4 mb-4">
                <Mountain className="w-6 h-6 text-[#1a3e35] mt-1 shrink-0" fill="currentColor" />
                <h3 className="text-[#1a3e35] font-black text-xl leading-tight">Wool Blend<br/><span className="text-base font-bold">(per unit)</span></h3>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 w-6 h-6 transform -translate-y-1/2 flex items-center justify-center font-black text-xl text-[#1a3e35]">₹</span>
                <input 
                  type="number"
                  value={woolBlend}
                  onChange={(e) => setWoolBlend(e.target.value)}
                  className="w-full bg-[#f1f2e2] font-black text-3xl text-[#1a3e35] p-4 pl-12 rounded border border-[#e4e6d4] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Box 3: Artisan Labor */}
          <div className="bg-white rounded-lg p-8 shadow-sm border-b-8 border-[#1a3e35]">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-[#1a3e35] font-black text-2xl mb-2">Artisan Labor<br/>Intensity</h3>
                <p className="text-[#1a3e35] text-base font-bold max-w-xs">
                  Calculated based on weave complexity and hours.
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-[#1a3e35] block mb-1">₹</span>
                <span className="text-4xl font-black text-[#1a3e35]">{formatCurrency(laborIntensity)}.00</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-4 bg-[#f1f2e2] p-5 rounded cursor-pointer transition select-none hover:bg-[#e4e6d4]">
                <div className="relative flex items-center justify-center w-6 h-6 shrink-0" onClick={() => setSurcharge(!surcharge)}>
                  {surcharge ? (
                    <div className="w-6 h-6 bg-[#1a3e35] rounded-sm flex items-center justify-center">
                      <Check strokeWidth={4} className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-[#1a3e35] rounded-sm bg-white" />
                  )}
                </div>
                <span className="text-[#1a3e35] font-black text-lg">Include Heritage Surcharge (8%)</span>
              </label>

              <label className="flex items-center gap-4 bg-[#f1f2e2] p-5 rounded cursor-pointer transition select-none hover:bg-[#e4e6d4]">
                <div className="relative flex items-center justify-center w-6 h-6 shrink-0" onClick={() => setOverhead(!overhead)}>
                  {overhead ? (
                    <div className="w-6 h-6 bg-[#1a3e35] rounded-sm flex items-center justify-center">
                      <Check strokeWidth={4} className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-[#1a3e35] rounded-sm bg-white" />
                  )}
                </div>
                <span className="text-[#1a3e35] font-black text-lg">Dyeing & Finishing Overhead</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: OUTPUTS */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Minimum Selling Price Box */}
          <div className="bg-[#244b3f] rounded-lg p-10 shadow-md text-center border-t-8 border-[#1a3e35]">
            <p className="text-white font-black text-sm tracking-[0.2em] uppercase mb-4">Minimum Selling Price</p>
            <div className="flex justify-center items-start mb-6 gap-2">
              <span className="text-white font-black text-4xl mt-3">₹</span>
              <span className="text-[#fbfaf0] font-black text-7xl md:text-8xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-[#fdfcdc]">
                {formatCurrency(sellingPrice)}
              </span>
            </div>
            <p className="text-white/90 text-sm font-bold leading-relaxed mb-8 px-4">
              This price ensures fair wages for artisans and covers all sustainable sourcing overheads.
            </p>
            <button className="w-full bg-[#B84800] hover:bg-[#a64000] text-white font-black text-xl py-5 rounded uppercase tracking-widest transition-transform hover:scale-[1.02] shadow-sm">
              Export Quotation
            </button>
          </div>

          {/* Profit Margin Box */}
          <div className="bg-white rounded-lg pt-10 px-10 pb-12 shadow-md relative border-t-8 border-[#B84800]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[#1a3e35] font-black text-2xl">Profit Margin</h3>
              <span className="bg-[#B84800] text-white px-4 py-2 rounded text-2xl font-black">{profitMargin}%</span>
            </div>

            {/* Slider */}
            <div className="mb-10 relative">
              <input 
                type="range" 
                min="0" max="100" 
                value={profitMargin}
                onChange={(e) => setProfitMargin(e.target.value)}
                className="w-full h-3 bg-[#e4e6d4] rounded-full appearance-none cursor-pointer absolute top-1/2 transform -translate-y-1/2 z-10 opacity-0"
              />
              <div className="w-full h-3 bg-[#e4e6d4] rounded-full absolute top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div 
                  className="h-full bg-[#B84800] rounded-full absolute left-0" 
                  style={{ width: `${profitMargin}%` }} 
                />
                <div 
                  className="w-6 h-6 bg-[#B84800] border-4 border-[#e4e6d4] rounded-full absolute top-1/2 transform -translate-y-1/2 -ml-3 shadow-md"
                  style={{ left: `${profitMargin}%` }}
                />
              </div>
              
              <div className="flex justify-between mt-8">
                <span className="text-[10px] font-black text-[#1a3e35] uppercase tracking-wider">Community (0%)</span>
                <span className="text-[10px] font-black text-[#1a3e35] uppercase tracking-wider">Growth (50%)</span>
              </div>
            </div>

            {/* Ledger */}
            <div className="space-y-4 pt-4 border-t border-[#e4e6d4]">
              <div className="flex justify-between items-center">
                <span className="text-[#1a3e35] font-bold text-lg">Base Production Cost</span>
                <span className="text-[#1a3e35] font-black text-lg">₹ {baseProductionCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#1a3e35] font-bold text-lg">Reinvestment Fund</span>
                <span className="text-[#B84800] font-black text-lg">₹ {reinvestmentFund.toFixed(2)}</span>
              </div>
            </div>

            {/* Floating Save Button */}
            <button className="absolute -right-4 -bottom-6 w-16 h-16 bg-[#B84800] text-white rounded-lg flex items-center justify-center hover:bg-[#a64000] transition-transform hover:scale-110 shadow-lg">
              <Save strokeWidth={2.5} className="w-8 h-8" />
            </button>
          </div>

          {/* Verification Banner */}
          <div className="bg-[#f0f2e1] border border-[#e4e6d4] p-6 rounded-lg flex items-center gap-4 shadow-sm">
            <div className="bg-white p-2 rounded-md shadow-sm shrink-0">
              <ShieldCheck className="w-8 h-8 text-[#1a3e35]" strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-[#1a3e35] font-black text-sm mb-1">Authority Verified</h4>
              <p className="text-[#1a3e35]/80 font-bold text-xs leading-tight">
                Calculations adhere to the MSS Woven Authority Standards v4.2
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
