import React from 'react';

const PriceAlert = ({ plannedPrice, msp }) => {
  if (!plannedPrice || !msp) return null;
  const isSafe = parseFloat(plannedPrice) >= parseFloat(msp);

  return (
    <div className={`p-4 rounded-lg mt-4 border font-medium flex items-center gap-2 ${isSafe ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
      {isSafe ? '✅ Safe to sell' : '⚠️ Selling at a loss!'}
    </div>
  );
};

export default PriceAlert;
