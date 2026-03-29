import React from 'react';
import { Search, Zap, Leaf, User, Eye, Plus } from 'lucide-react';

export default function Inventory() {
  const inventoryItems = [
    { 
      title: "Carpets",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80",
      description: "Traditional hand-loomed textiles crafted with recycled cotton threads and natural dyes.",
      units: 45
    },
    { 
      title: "Bags",
      image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80",
      description: "Durable, eco-friendly carryalls designed for longevity and everyday utility.",
      units: 88
    },
    { 
      title: "Collage Art",
      image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80",
      description: "Unique artistic expressions using salvaged materials to tell community stories.",
      units: 112
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 text-[#1a3e35] relative">
      
      {/* Top Navbar Simulation */}
      <div className="flex justify-between items-center mb-16">
        <h2 className="text-2xl font-black text-[#1a3e35] tracking-tight">
          Maharogi Seva Samiti
        </h2>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center hover:bg-[#e4e6d4] transition">
            <Zap className="w-5 h-5 text-[#1a3e35]" fill="currentColor" />
          </button>
          <button className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center hover:bg-[#e4e6d4] transition mr-3">
            <Leaf className="w-5 h-5 text-[#1a3e35]" fill="currentColor" />
          </button>
          <button className="w-10 h-10 rounded overflow-hidden bg-white border border-[#1a3e35] flex justify-center items-end shadow-sm">
            <User fill="#1a3e35" className="w-8 h-8 text-[#1a3e35] translate-y-1.5" />
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="mb-10">
        <p className="text-[#c2410c] text-sm font-black uppercase tracking-[0.15em] mb-2">
          Institutional Records
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-black text-[#1a3e35]">
          Inventory Catalog
        </h1>
      </div>

      {/* Search Bar */}
      <div className="mb-12 relative w-full">
        <div className="w-full bg-white rounded-md border-4 border-[#6b7280] shadow-sm flex items-center p-2 focus-within:border-[#1a3e35] transition-colors">
          <div className="p-4 mr-2">
            <Search className="w-6 h-6 text-gray-500" strokeWidth={2.5} />
          </div>
          <input 
            type="text" 
            placeholder="Search Materials" 
            className="flex-1 text-2xl font-bold bg-transparent text-[#1a3e35] placeholder-gray-400 focus:outline-none py-4"
          />
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
        {inventoryItems.map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col group border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-[#1a3e35] text-white px-4 py-2 text-sm font-black rounded-sm shadow-sm">
                {item.units} units
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-3xl font-serif font-black text-[#1a3e35] mb-4">
                {item.title}
              </h3>
              <p className="text-[#1a3e35]/80 text-[15px] font-bold leading-relaxed mb-8 flex-1">
                {item.description}
              </p>
              
              <button className="w-full bg-[#0a2e25] text-white py-4 rounded font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#244b3f] transition-colors">
                <Eye className="w-6 h-6" strokeWidth={2.5} />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add New Batch Button */}
      {/* Position fixed at bottom right, simulating a 3D blocky effect */}
      <div className="fixed bottom-12 right-12 z-50">
        <button className="bg-[#B84800] hover:bg-[#a64000] border-2 border-[#5a2400] text-white px-8 py-5 rounded-lg flex items-center justify-center gap-4 shadow-[#7a2e00] shadow-[4px_6px_0px] active:shadow-[0px_0px_0px] active:translate-y-[6px] active:translate-x-[4px] transition-all duration-100">
          <Plus className="w-8 h-8" strokeWidth={3} />
          <span className="font-black text-xl tracking-wide">Add New Batch</span>
        </button>
      </div>

    </div>
  );
}
