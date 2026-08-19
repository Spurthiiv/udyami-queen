import { createContext, useContext, useState, useEffect } from 'react';

const AddressContext = createContext(null);
const STORAGE_KEY = 'customer_addresses';

const defaultAddresses = [
  {
    id: 'addr-1',
    label: 'Home',
    line: '123, 4th Cross, Jayanagar, Bengaluru — 560041',
  },
];

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [selectedId, setSelectedId] = useState('addr-1');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAddresses(parsed.addresses || defaultAddresses);
        setSelectedId(parsed.selectedId || 'addr-1');
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ addresses, selectedId }));
  }, [addresses, selectedId]);

  function addAddress(address) {
    const id = `addr-${Date.now()}`;
    const newAddr = { id, ...address };
    setAddresses((prev) => [...prev, newAddr]);
    setSelectedId(id);
    return id;
  }

  function selectAddress(id) {
    setSelectedId(id);
  }

  function removeAddress(id) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedId === id) {
      setSelectedId((prev) => {
        const remaining = addresses.filter((a) => a.id !== id);
        return remaining[0]?.id || null;
      });
    }
  }

  const selectedAddress = addresses.find((a) => a.id === selectedId) || addresses[0] || null;

  return (
    <AddressContext.Provider
      value={{ addresses, selectedAddress, selectAddress, addAddress, removeAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}