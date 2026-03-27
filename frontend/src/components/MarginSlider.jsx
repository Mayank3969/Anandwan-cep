import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MarginSlider = ({ onChange }) => {
  const { globalMargin, setGlobalMargin } = useContext(AppContext);

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setGlobalMargin(val);
    if (onChange) onChange(val);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-4 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Margin Adjustment</h2>
        <span className="bg-brand-orange text-white px-3 py-1 rounded-full font-bold">{globalMargin}%</span>
      </div>
      <input 
        type="range" 
        min="0" max="50" step="1"
        value={globalMargin}
        onChange={handleChange}
        className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange" 
      />
      <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
      </div>
    </div>
  );
};

export default MarginSlider;
