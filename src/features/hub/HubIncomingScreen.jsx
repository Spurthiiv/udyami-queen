import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const initialShipments = [
  { id: 'SHP-2201', seller: 'Lakshmi Kitchen', items: 'Homemade Chapati × 40', eta: '10 mins' },
  { id: 'SHP-2202', seller: 'Kaveri Farm Store', items: 'Organic Ragi Flour × 15', eta: '25 mins' },
  { id: 'SHP-2203', seller: 'Sundari Pottery', items: 'Terracotta Diya Set × 20', eta: '40 mins' },
];

function HubIncomingScreen() {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState(initialShipments);

  function handleReceive(id) {
    setShipments((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-6">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">Incoming Shipments</h1>
      </div>

      <div className="px-4 mt-4">
        {shipments.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-10">No incoming shipments right now</p>
        )}
        {shipments.map((s) => (
          <div key={s.id} className="bg-white rounded-xl shadow-sm p-4 mb-3">
            <p className="text-[#8B1E3F] font-semibold text-sm">{s.id}</p>
            <p className="text-gray-600 text-sm">{s.seller}</p>
            <p className="text-gray-400 text-xs mb-3">{s.items}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">⏱ ETA: {s.eta}</span>
              <button
                onClick={() => handleReceive(s.id)}
                className="bg-[#8B1E3F] text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                Mark Received
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HubIncomingScreen;