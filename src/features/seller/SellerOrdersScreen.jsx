import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const initialOrders = [
  { id: 'UQ125487965', item: 'Homemade Mango Pickle (250 g) × 2', ward: 'Rajajinagar Ward 15', amount: 360, status: 'new', distance: '1.2 km away' },
  { id: 'UQ125487964', item: 'Filter Coffee Powder (250 g) × 1', ward: 'Malleshwaram Ward 9', amount: 250, status: 'new', distance: '2.3 km away' },
  { id: 'UQ125487960', item: 'Idli Batter (1 kg) × 3', ward: 'Rajajinagar Ward 15', amount: 270, status: 'ongoing', distance: '0.8 km away' },
  { id: 'UQ125487954', item: 'Fresh Curd (500 g) × 2', ward: 'BTM Layout Ward 5', amount: 120, status: 'completed', distance: '' },
];

const tabs = [
  { key: 'new', label: 'New' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' },
];

const statusStyles = {
  new: 'text-[#8B1E3F]',
  ongoing: 'text-amber-600',
  completed: 'text-green-600',
};

function SellerOrdersScreen() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState('new');

  function handleAccept(id) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'ongoing' } : o))
    );
  }

  function handleReject(id) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  const filteredOrders = orders.filter((o) => o.status === activeTab);
  const newCount = orders.filter((o) => o.status === 'new').length;
  const ongoingCount = orders.filter((o) => o.status === 'ongoing').length;

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">My Orders</h1>
      </div>

      <div className="px-4 mt-4 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab.key
                ? 'bg-[#8B1E3F] text-white'
                : 'bg-white text-[#8B1E3F] border border-[#8B1E3F]'
            }`}
          >
            {tab.label}
            {tab.key === 'new' && newCount > 0 && ` (${newCount})`}
            {tab.key === 'ongoing' && ongoingCount > 0 && ` (${ongoingCount})`}
          </button>
        ))}
      </div>

      <div className="px-4 mt-4">
        {filteredOrders.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-10">No {activeTab} orders</p>
        )}

        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm p-4 mb-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-[#8B1E3F] font-semibold text-sm">{order.id}</p>
                <p className="text-gray-500 text-xs">{order.item}</p>
              </div>
              <span className={`text-xs font-semibold capitalize ${statusStyles[order.status]}`}>
                {order.status}
              </span>
            </div>

            <p className="text-gray-400 text-xs mb-1">📍 {order.ward}</p>
            {order.distance && <p className="text-gray-400 text-xs mb-3">{order.distance}</p>}

            <div className="flex justify-between items-center mt-2">
              <span className="text-[#8B1E3F] font-bold">₹{order.amount}</span>

              {order.status === 'new' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReject(order.id)}
                    className="text-xs border border-gray-300 text-gray-500 px-3 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAccept(order.id)}
                    className="text-xs bg-[#8B1E3F] text-white px-4 py-2 rounded-lg"
                  >
                    Accept
                  </button>
                </div>
              )}

              {order.status === 'ongoing' && (
                <button
                  onClick={() =>
                    setOrders((prev) =>
                      prev.map((o) =>
                        o.id === order.id ? { ...o, status: 'completed' } : o
                      )
                    )
                  }
                  className="text-xs bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Mark Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerOrdersScreen;