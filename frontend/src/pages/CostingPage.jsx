import React from 'react';
import CostingWizard from '../components/CostingWizard';

const CostingPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Smart Costing Wizard</h1>
        <p className="text-gray-500 mt-2 text-lg">Calculate MSP dynamically by adding materials, labor, margins, and comparing selling plans.</p>
      </div>
      <CostingWizard />
    </div>
  );
};

export default CostingPage;
