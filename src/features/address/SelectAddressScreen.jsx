import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddress } from './AddressContext';

function SelectAddressScreen() {
  const navigate = useNavigate();
  const { addresses, selectedAddress, selectAddress, addAddress, removeAddress } = useAddress();
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState('');
  const [line, setLine] = useState('');
  const [error, setError] = useState('');

  function handleSelect(id) {
    selectAddress(id);
    navigate(-1);
  }

  function handleSave() {
    if (!label.trim() || !line.trim()) {
      setError('Enter a label and full address');
      return;
    }
    addAddress({ label: label.trim(), line: line.trim() });
    navigate(-1);
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-6">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">Select Delivery Address</h1>
      </div>

      <div className="px-4 mt-4">
        {addresses.map((addr) => (
          <button
            key={addr.id}
            onClick={() => handleSelect(addr.id)}
            className={`w-full text-left bg-white rounded-xl shadow-sm p-4 mb-3 flex items-start gap-3 ${
              selectedAddress?.id === addr.id ? 'border-2 border-[#8B1E3F]' : ''
            }`}
          >
            <span className="text-lg mt-0.5">📍</span>
            <div className="flex-1">
              <p className="text-[#8B1E3F] font-medium">{addr.label}</p>
              <p className="text-gray-500 text-sm mt-0.5">{addr.line}</p>
            </div>
            {addresses.length > 1 && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  removeAddress(addr.id);
                }}
                className="text-red-400 text-xs font-semibold"
              >
                Remove
              </span>
            )}
          </button>
        ))}

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full border-2 border-dashed border-[#8B1E3F] text-[#8B1E3F] font-semibold py-3 rounded-xl mt-2"
          >
            + Add New Address
          </button>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-4 mt-2">
            <label className="text-xs text-gray-500 mb-1 block">Label (e.g. Home, Work)</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Home"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none mb-3"
            />
            <label className="text-xs text-gray-500 mb-1 block">Full Address</label>
            <textarea
              value={line}
              onChange={(e) => setLine(e.target.value)}
              placeholder="House no, street, area, city, pincode"
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-300 text-gray-500 font-semibold py-2 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-[#8B1E3F] text-white font-semibold py-2 rounded-lg text-sm"
              >
                Save Address
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectAddressScreen;