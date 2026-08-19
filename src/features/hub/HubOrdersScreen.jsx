import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const bottomNavItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊', path: '/hub/dashboard' },
  { key: 'inventory', label: 'Inventory', icon: '🗂️', path: '/hub/inventory' },
  { key: 'orders', label: 'Orders', icon: '📦', path: '/hub/orders' },
  { key: 'reports', label: 'Reports', icon: '📈', path: '/hub/reports' },
  { key: 'more', label: 'More', icon: '⋯', path: '/hub/more' },
];

const initialOrders = [
  { id: 'UQ1254', item: 'Mango Pickle × 2', status: 'Preparing', amount: 320 },
  { id: 'UQ1253', item: 'Filter Coffee × 1', status: 'Shipped', amount: 250 },
  { id: 'UQ1252', item: 'Idli Batter × 3', status: 'Delivered', amount: 180 },
  { id: 'UQ1251', item: 'Fresh Curd × 2', status: 'Preparing', amount: 120 },
];

const statusStyles = {
  Preparing: 'bg-[#FDF0D5] text-[#B8860B]',
  Shipped: 'bg-[#E6EEF9] text-[#2A5D8B]',
  Delivered: 'bg-[#E4F3E6] text-[#2E7D32]',
};

const filters = ['All', 'Preparing', 'Shipped', 'Delivered'];

function HubOrdersScreen() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const filteredOrders = filter === 'All' ? initialOrders : initialOrders.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4">
        <h1 className="text-white font-semibold">Hub Orders</h1>
      </div>

      <div className="px-4 mt-4 flex gap-2 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              filter === f ? 'bg-[#8B1E3F] text-white' : 'bg-white text-[#8B1E3F] border border-[#8B1E3F]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="px-4 mt-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center mb-3">
            <div>
              <p className="text-[#8B1E3F] font-medium text-sm">{order.id}</p>
              <p className="text-gray-500 text-xs">{order.item}</p>
              <p className="text-gray-400 text-xs">₹{order.amount}</p>
            </div>
            <span className={`text-[11px] font-medium px-2 py-1 rounded-full ${statusStyles[order.status]}`}>
              {order.status}
            </span>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-between px-6 py-2">
        {bottomNavItems.map((item) => (
          <button
            key={item.key}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-0.5 text-[#8B1E3F]"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default HubOrdersScreen;