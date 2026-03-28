import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Box, Activity } from 'lucide-react';

export default function Dashboard() {
  const cards = [
    { title: "Cost & Margin", icon: <Calculator className="w-12 h-12 mb-6 text-burnt" />, link: "/calculator", desc: "Calculate handcrafted item pricing." },
    { title: "Inventory", icon: <Box className="w-12 h-12 mb-6 text-burnt" />, link: "/inventory", desc: "Check raw material stock levels." },
    { title: "Activity", icon: <Activity className="w-12 h-12 mb-6 text-burnt" />, link: "/activity", desc: "View sales and workshop output." },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <header className="mb-16 border-b-4 border-forest pb-6">
        <h1 className="text-5xl font-serif font-bold text-forest-dark">Welcome to the Archive</h1>
        <p className="text-xl text-forest mt-4 font-semibold">Select a module to begin your work session.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <Link 
            key={idx} 
            to={card.link}
            className="bg-white p-10 border-4 border-forest hover:border-burnt hover:-translate-y-2 transition-all shadow-[8px_8px_0px_#1B4D3E] cursor-pointer group flex flex-col"
          >
            {card.icon}
            <h2 className="text-3xl font-bold text-forest-dark group-hover:text-burnt transition-colors">{card.title}</h2>
            <p className="text-lg text-forest mt-4 font-medium flex-1">{card.desc}</p>
            <div className="mt-8 text-burnt font-bold uppercase tracking-wider flex items-center gap-2">
              Open Module &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
