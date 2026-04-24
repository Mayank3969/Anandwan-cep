import React, { useState, useEffect } from 'react';
import { Search, Zap, Leaf, User, Eye, Plus } from 'lucide-react';
import { BatchAPI, ProductAPI } from '../services/api';

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingBatch, setIsAddingBatch] = useState(false);
  const [batchForm, setBatchForm] = useState({ productId: '', quantity: '' });
  const [submittingBatch, setSubmittingBatch] = useState(false);

  const imageForProduct = (product) => {
    const label = encodeURIComponent(product.name || product.category || 'Product');
    return `https://ui-avatars.com/api/?name=${label}&background=1a3e35&color=ffffff&size=512&rounded=false&bold=true`;
  };

  const refreshInventory = async () => {
    setLoading(true);
    try {
      const [productData, batchData] = await Promise.all([
        ProductAPI.getAll(),
        BatchAPI.getAll(),
      ]);

      const quantityByProduct = batchData.reduce((acc, batch) => {
        const key = Number(batch.product_id);
        const qty = Number(batch.quantity) || 0;
        acc[key] = (acc[key] || 0) + qty;
        return acc;
      }, {});

      const inventoryData = productData.map((product) => ({
        id: product.id,
        title: product.name,
        image: imageForProduct(product),
        description: product.description || product.category || 'No description',
        units: quantityByProduct[product.id] || 0,
      }));

      setProducts(inventoryData);
      setFilteredProducts(inventoryData);
      setError(null);
    } catch (err) {
      console.error('Error fetching inventory:', err);
      setError('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshInventory();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(
      item =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleAddBatch = async (e) => {
    e.preventDefault();
    if (!batchForm.productId || !batchForm.quantity) {
      setError('Please select a product and enter quantity');
      return;
    }

    setSubmittingBatch(true);
    try {
      await BatchAPI.create({
        product_id: Number(batchForm.productId),
        quantity: Number(batchForm.quantity),
      });
      setBatchForm({ productId: '', quantity: '' });
      setIsAddingBatch(false);
      await refreshInventory();
    } catch (err) {
      console.error('Error adding batch:', err);
      setError('Failed to add batch');
    } finally {
      setSubmittingBatch(false);
    }
  };

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
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1 text-2xl font-bold bg-transparent text-[#1a3e35] placeholder-gray-400 focus:outline-none py-4"
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md font-semibold">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-8 text-lg font-bold text-[#1a3e35]">Loading inventory...</div>
      )}

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
        {filteredProducts.map((item) => (
          <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col group border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            
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

      {!loading && filteredProducts.length === 0 && (
        <div className="pb-32 text-xl font-bold text-[#1a3e35]/80">No inventory items found.</div>
      )}

      {/* Floating Add New Batch Button */}
      {/* Position fixed at bottom right, simulating a 3D blocky effect */}
      <div className="fixed bottom-12 right-12 z-50">
        <button
          onClick={() => setIsAddingBatch(true)}
          className="bg-[#B84800] hover:bg-[#a64000] border-2 border-[#5a2400] text-white px-8 py-5 rounded-lg flex items-center justify-center gap-4 shadow-[#7a2e00] shadow-[4px_6px_0px] active:shadow-[0px_0px_0px] active:translate-y-[6px] active:translate-x-[4px] transition-all duration-100"
        >
          <Plus className="w-8 h-8" strokeWidth={3} />
          <span className="font-black text-xl tracking-wide">Add New Batch</span>
        </button>
      </div>

      {isAddingBatch && (
        <div className="fixed inset-0 z-[60] bg-black/35 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddBatch}
            className="w-full max-w-md bg-white border-2 border-[#1a3e35] rounded-xl p-6 shadow-2xl"
          >
            <h3 className="text-2xl font-black text-[#1a3e35] mb-4">Add New Batch</h3>
            <label className="block text-sm font-bold text-[#1a3e35] mb-2">Product</label>
            <select
              value={batchForm.productId}
              onChange={(e) => setBatchForm((prev) => ({ ...prev, productId: e.target.value }))}
              className="w-full border-2 border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-[#1a3e35]"
              required
            >
              <option value="">Select product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.title}
                </option>
              ))}
            </select>

            <label className="block text-sm font-bold text-[#1a3e35] mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              value={batchForm.quantity}
              onChange={(e) => setBatchForm((prev) => ({ ...prev, quantity: e.target.value }))}
              className="w-full border-2 border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:border-[#1a3e35]"
              required
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddingBatch(false)}
                className="px-4 py-2 rounded border border-gray-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingBatch}
                className="px-4 py-2 rounded bg-[#0a2e25] text-white font-semibold disabled:opacity-60"
              >
                {submittingBatch ? 'Saving...' : 'Save Batch'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
