import { useNavigate } from 'react-router-dom';

const bottomNavItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊', path: '/hub/dashboard' },
  { key: 'inventory', label: 'Inventory', icon: '🗂️', path: '/hub/inventory' },
  { key: 'orders', label: 'Orders', icon: '📦', path: '/hub/orders' },
  { key: 'reports', label: 'Reports', icon: '📈', path: '/hub/reports' },
  { key: 'more', label: 'More', icon: '⋯', path: '/hub/more' },
];

const topSellers = [
  { name: 'Lakshmi Kitchen', orders: 68, revenue: 12240 },
  { name: 'Anitha Foods', orders: 52, revenue: 9360 },
  { name: 'Kaveri Farm Store', orders: 41, revenue: 6560 },
];

function HubReportsScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4">
        <h1 className="text-white font-semibold">Hub Reports</h1>
      </div>

      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-400 text-xs mb-1">This Month Orders</p>
            <p className="text-[#8B1E3F] text-2xl font-bold">1,240</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-400 text-xs mb-1">This Month Revenue</p>
            <p className="text-[#8B1E3F] text-2xl font-bold">₹2.1L</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-400 text-xs mb-1">Active Sellers</p>
            <p className="text-[#8B1E3F] text-2xl font-bold">34</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-400 text-xs mb-1">On-Time Delivery</p>
            <p className="text-[#8B1E3F] text-2xl font-bold">96%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-[#8B1E3F] font-semibold text-sm mb-3">Top Sellers This Hub</h3>
          {topSellers.map((s, i) => (
            <div key={s.name} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-b-0">
              <div>
                <p className="text-gray-700 text-sm">{i + 1}. {s.name}</p>
                <p className="text-gray-400 text-xs">{s.orders} orders</p>
              </div>
              <p className="text-[#8B1E3F] font-semibold text-sm">₹{s.revenue.toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>
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

export default HubReportsScreen;