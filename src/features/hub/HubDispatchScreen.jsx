import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const initialOrders = [
  { id: 'DSP-501', item: 'Homemade Chapati × 10', customer: 'Ramesh K.', rider: 'Unassigned' },
  { id: 'DSP-502', item: 'Organic Ragi Flour × 2', customer: 'Priya S.', rider: 'Unassigned' },
];

function HubDispatchScreen() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(initialOrders);

  function handleDispatch(id) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-6">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">Dispatch</h1>
      </div>

      <div className="px-4 mt-4">
        {orders.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-10">No orders ready for dispatch</p>
        )}
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-xl shadow-sm p-4 mb-3">
            <p className="text-[#8B1E3F] font-semibold text-sm">{o.id}</p>
            <p className="text-gray-600 text-sm">{o.item}</p>
            <p className="text-gray-400 text-xs mb-3">for {o.customer}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">🛵 Rider: {o.rider}</span>
              <button
                onClick={() => handleDispatch(o.id)}
                className="bg-[#8B1E3F] text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                Dispatch
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HubDispatchScreen;