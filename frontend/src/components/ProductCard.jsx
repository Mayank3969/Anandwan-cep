import React from 'react';

const ProductCard = ({ product, onSelect }) => {
  return (
    <div 
      className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm hover:shadow-md hover:border-brand-green cursor-pointer transition flex flex-col justify-between h-full min-h-[160px]"
      onClick={() => onSelect && onSelect(product)}
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{product.name}</h3>
          <span className="bg-orange-50 text-brand-orange text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ml-2">
            {product.category}
          </span>
        </div>
        {product.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mt-2">{product.description}</p>
        )}
      </div>
      <div className="mt-4 pt-4 border-t flex justify-between items-center bg-white">
        <span className="text-xs text-gray-400">ID: {product.id}</span>
        <button className="text-brand-green text-sm font-bold hover:underline">Select for Costing</button>
      </div>
    </div>
  );
};

export default ProductCard;
