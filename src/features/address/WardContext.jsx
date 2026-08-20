import { createContext, useContext, useState, useEffect } from 'react';

const WardContext = createContext(null);
const STORAGE_KEY = 'customer_selected_ward';

const defaultWard = { wardNo: 63, wardName: 'Rajajinagara', constituency: '165 - Rajajinagar' };

export function WardProvider({ children }) {
  const [selectedWard, setSelectedWard] = useState(defaultWard);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSelectedWard(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  function selectWard(ward) {
    setSelectedWard(ward);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ward));
  }

  return (
    <WardContext.Provider value={{ selectedWard, selectWard }}>
      {children}
    </WardContext.Provider>
  );
}

export function useWard() {
  return useContext(WardContext);
}