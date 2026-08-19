import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const initialQueue = [
  { id: 'QC-101', item: 'Homemade Chapati (10 pcs) × 40', seller: 'Lakshmi Kitchen' },
  { id: 'QC-102', item: 'Organic Ragi Flour (2kg) × 15', seller: 'Kaveri Farm Store' },
];

function HubQcCheckScreen() {
  const navigate = useNavigate();
  const [queue, setQueue] = useState(initialQueue);

  function handleDecision(id, decision) {
    setQueue((prev) => prev.filter((q) => q.id !== id));
    // decision: 'pass' or 'fail' — no backend yet, just removes from queue for now
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-6">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">QC Check</h1>
      </div>

      <div className="px-4 mt-4">
        {queue.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-10">No items pending QC</p>
        )}
        {queue.map((q) => (
          <div key={q.id} className="bg-white rounded-xl shadow-sm p-4 mb-3">
            <p className="text-[#8B1E3F] font-semibold text-sm">{q.id}</p>
            <p className="text-gray-600 text-sm">{q.item}</p>
            <p className="text-gray-400 text-xs mb-3">from {q.seller}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDecision(q.id, 'fail')}
                className="flex-1 border border-red-400 text-red-500 text-xs font-semibold py-2 rounded-lg"
              >
                ✕ Fail
              </button>
              <button
                onClick={() => handleDecision(q.id, 'pass')}
                className="flex-1 bg-green-600 text-white text-xs font-semibold py-2 rounded-lg"
              >
                ✓ Pass
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HubQcCheckScreen;