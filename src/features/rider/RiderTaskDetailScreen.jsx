import { useNavigate, useParams } from 'react-router-dom';

// Mock lookup — in a real app this would come from the same tasksData source or an API.
const taskDetails = {
  UQ125487960: {
    id: 'UQ125487960',
    type: 'Drop Order',
    customerName: 'Priya Sharma',
    address: 'Margosa Road, Malleshwaram, Bengaluru - 560003',
    phone: '+91 98765 43210',
    items: [
      { name: 'Idli Batter (1 kg)', qty: 3, price: 90 },
    ],
    amount: 270,
    paymentMethod: 'UPI (Paid)',
    pickupPoint: 'Queen Hub, Rajajinagar',
  },
};

function RiderTaskDetailScreen() {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const task = taskDetails[taskId] || {
    id: taskId,
    type: 'Drop Order',
    customerName: 'Customer',
    address: 'Address not available',
    phone: '—',
    items: [],
    amount: 0,
    paymentMethod: '—',
    pickupPoint: '—',
  };

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">{task.type} — {task.id}</h1>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-[#8B1E3F] font-semibold text-sm mb-2">Customer</h3>
          <p className="text-gray-700 text-sm">{task.customerName}</p>
          <p className="text-gray-500 text-sm">{task.address}</p>
          <p className="text-gray-500 text-sm">📞 {task.phone}</p>
        </div>

        {task.type === 'Drop Order' && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="text-[#8B1E3F] font-semibold text-sm mb-2">Pickup From</h3>
            <p className="text-gray-700 text-sm">{task.pickupPoint}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-[#8B1E3F] font-semibold text-sm mb-2">Order Items</h3>
          {task.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-[#8B1E3F] mt-2 pt-2 border-t border-gray-100">
            <span>Total</span>
            <span>₹{task.amount}</span>
          </div>
          <p className="text-gray-400 text-xs mt-2">{task.paymentMethod}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.open(`tel:${task.phone}`)}
            className="flex-1 bg-white border-2 border-[#8B1E3F] text-[#8B1E3F] font-semibold py-3 rounded-xl"
          >
            📞 Call Customer
          </button>
          <button
            onClick={() => navigate('/rider/tasks')}
            className="flex-1 bg-[#8B1E3F] text-white font-semibold py-3 rounded-xl"
          >
            Mark Delivered
          </button>
        </div>
      </div>
    </div>
  );
}

export default RiderTaskDetailScreen;