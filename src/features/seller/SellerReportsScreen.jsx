import { useNavigate } from 'react-router-dom';

const bottomNavItems = [
  { key: 'home', label: 'Home', icon: '🏠', path: '/seller/dashboard' },
  { key: 'products', label: 'Products', icon: '🛍️', path: '/seller/products' },
  { key: 'orders', label: 'Orders', icon: '📦', path: '/seller/orders' },
  { key: 'earnings', label: 'Earnings', icon: '💰', path: '/seller/earnings' },
  { key: 'profile', label: 'Profile', icon: '👤', path: '/seller/profile' },
];

const topProducts = [
  { name: 'Homemade Mango Pickle (250 g)', orders: 42, revenue: 7560 },
  { name: 'Garlic Pickle (250 g)', orders: 28, revenue: 5320 },
  { name: 'Gongura Pickle (250 g)', orders: 19, revenue: 3800 },
];

function SellerReportsScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4">
        <h1 className="text-white font-semibold">Reports</h1>
      </div>

      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-400 text-xs mb-1">This Month Orders</p>
            <p className="text-[#8B1E3F] text-2xl font-bold">89</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-400 text-xs mb-1">This Month Revenue</p>
            <p className="text-[#8B1E3F] text-2xl font-bold">₹16,680</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-400 text-xs mb-1">Avg. Order Value</p>
            <p className="text-[#8B1E3F] text-2xl font-bold">₹187</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-400 text-xs mb-1">Repeat Customers</p>
            <p className="text-[#8B1E3F] text-2xl font-bold">34%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-[#8B1E3F] font-semibold text-sm mb-3">Top Selling Products</h3>
          {topProducts.map((p, i) => (
            <div key={p.name} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-b-0">
              <div>
                <p className="text-gray-700 text-sm">{i + 1}. {p.name}</p>
                <p className="text-gray-400 text-xs">{p.orders} orders</p>
              </div>
              <p className="text-[#8B1E3F] font-semibold text-sm">₹{p.revenue.toLocaleString('en-IN')}</p>
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

export default SellerReportsScreen;