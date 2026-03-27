import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import { calculateMSP, saveCosting } from '../api/client';
import MarginSlider from './MarginSlider';
import PriceAlert from './PriceAlert';

const CostingWizard = () => {
  const { currentProduct, globalMargin, mspData, updateMspData } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    raw_material_cost: 0,
    wastage_percent: 5,
    labor_hours: 0,
    labor_rate_per_hour: 100,
    overhead_cost: 0,
    planned_price: 0
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const computeMsp = useCallback(async (marginOverride) => {
    try {
      const margin = marginOverride !== undefined ? marginOverride : globalMargin;
      const response = await calculateMSP({
        ...formData,
        margin_percent: margin
      });
      updateMspData(response.data);
    } catch (err) {
      console.error("Failed to calculate MSP", err);
    }
  }, [formData, globalMargin, updateMspData]);

  // Debounce the calculate MSP call when form data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step > 1) computeMsp();
    }, 500);
    return () => clearTimeout(timer);
  }, [formData, step, computeMsp]);

  const handleSave = async () => {
    if (!currentProduct) return alert("Select a product first.");
    setIsSaving(true);
    try {
      await saveCosting({
        product_id: currentProduct.id,
        ...formData,
        margin_percent: globalMargin
      });
      alert("Costing saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
          <div className="flex mb-6 space-x-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-2 flex-1 rounded ${s <= step ? 'bg-brand-green' : 'bg-gray-200'}`} />
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {step === 1 && "Step 1: Product Selection"}
            {step === 2 && "Step 2: Raw Materials"}
            {step === 3 && "Step 3: Labor"}
            {step === 4 && "Step 4: Overheads"}
          </h2>

          <div className="space-y-4">
            {step === 1 && (
              <div>
                <p className="text-gray-600 mb-4">Please select a product from the inventory page or create one to associate this costing with.</p>
                {currentProduct ? (
                  <div className="p-4 bg-green-50 text-brand-green rounded-lg border border-green-200">
                    <span className="font-bold">Selected:</span> {currentProduct.name}
                  </div>
                ) : (
                  <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
                    No product selected. Continuing will calculate a draft MSP without saving.
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Raw Material Cost (₹)</label>
                  <input type="number" name="raw_material_cost" value={formData.raw_material_cost} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Wastage (%)</label>
                  <input type="number" name="wastage_percent" value={formData.wastage_percent} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green p-2 border" />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Labor Hours</label>
                  <input type="number" name="labor_hours" value={formData.labor_hours} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Labor Rate per Hour (₹)</label>
                  <input type="number" name="labor_rate_per_hour" value={formData.labor_rate_per_hour} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green p-2 border" />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Overhead Cost (₹) (Transport, Packaging, etc.)</label>
                  <input type="number" name="overhead_cost" value={formData.overhead_cost} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green p-2 border" />
                </div>
                <div className="pt-4 border-t mt-4">
                  <label className="block text-sm font-medium text-gray-700">Planned Sale Price (₹) - For Warning System</label>
                  <input type="number" name="planned_price" value={formData.planned_price} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange p-2 border" />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button 
              disabled={step === 1} 
              onClick={() => setStep(s => s - 1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
            >
              Back
            </button>
            {step < 4 ? (
              <button 
                onClick={() => setStep(s => s + 1)}
                className="px-4 py-2 bg-brand-green text-white rounded-md hover:bg-green-700 transition shadow-sm"
              >
                Next
              </button>
            ) : (
              <button 
                onClick={handleSave}
                disabled={isSaving || !currentProduct}
                className="px-4 py-2 bg-brand-orange text-white rounded-md hover:bg-orange-600 transition shadow-sm disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Costing"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100 flex flex-col justify-center items-center h-48 mb-4">
          <h3 className="text-gray-500 font-medium uppercase tracking-wider text-sm mb-2">Calculated MSP</h3>
          <p className="text-5xl font-black text-brand-green">
            ₹{mspData ? mspData.msp.toFixed(2) : "0.00"}
          </p>
          {mspData && (
            <div className="mt-4 flex gap-4 text-sm text-gray-600">
              <span>Total Cost: ₹{mspData.total_cost.toFixed(2)}</span>
              <span className="text-brand-orange font-bold">Profit: ₹{mspData.profit_amount.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        <MarginSlider onChange={(m) => computeMsp(m)} />
        
        {formData.planned_price > 0 && mspData && (
          <PriceAlert plannedPrice={formData.planned_price} msp={mspData.msp} />
        )}
      </div>
    </div>
  );
};

export default CostingWizard;
