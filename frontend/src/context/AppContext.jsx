import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [globalMargin, setGlobalMargin] = useState(20);
  const [mspData, setMspData] = useState(null);

  const updateMspData = (data) => setMspData(data);

  return (
    <AppContext.Provider value={{ 
      currentProduct, setCurrentProduct, 
      globalMargin, setGlobalMargin,
      mspData, updateMspData
    }}>
      {children}
    </AppContext.Provider>
  );
};
