import { useNavigate } from 'react-router-dom';

const bottomNavItems = [
  { key: 'home', label: 'Home', icon: '🏠', path: '/seller/dashboard' },
  { key: 'products', label: 'Products', icon: '🛍️', path: '/seller/products' },
  { key: 'orders', label: 'Orders', icon: '📦', path: '/seller/orders' },
  { key: 'earnings', label: 'Earnings', icon: '💰', path: '/seller/earnings' },
  { key: 'profile', label: 'Profile', icon: '👤', path: '/seller/profile' },
];

const recentPayouts = [
  { id: 'PAY1042', date: 'Today, 2:15 PM', amount: 3560, orders: 12 },
  { id: 'PAY1039', date: 'Yesterday', amount: 2870, orders: 9 },
  { id: 'PAY1035', date: '2 days ago', amount: 4120, orders: 14 },
];

function SellerEarningsScreen() {
  const navigate = useNavigate();
  const todayEarnings = 2450;
  const weekEarnings = 16840;
  const pendingPayout = 3560;

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4">
        <h1 className="text-white font-semibold">Earnings</h1>
      </div>

      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-400 text-xs mb-1">Today's Earnings</p>
            <p className="text-[#8B1E3F] text-2xl font-bold">₹{todayEarnings.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-400 text-xs mb-1">This Week</p>
            <p className="text-[#8B1E3F] text-2xl font-bold">₹{weekEarnings.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-xs mb-1">Pending Payout</p>
            <p className="text-[#8B1E3F] font-bold text-lg">₹{pendingPayout.toLocaleString('en-IN')}</p>
          </div>
          <button className="bg-[#8B1E3F] text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
            Request Payout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-[#8B1E3F] font-semibold text-sm mb-3">Payout History</h3>
          {recentPayouts.map((p) => (
            <div key={p.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-b-0">
              <div>
                <p className="text-gray-700 text-sm">{p.id}</p>
                <p className="text-gray-400 text-xs">{p.date} • {p.orders} orders</p>
              </div>
              <p className="text-green-600 font-semibold text-sm">₹{p.amount.toLocaleString('en-IN')}</p>
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

export default SellerEarningsScreen;