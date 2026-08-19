import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const todaysOverview = {
  orders: 12,
  sales: 3560,
  earnings: 2450,
};

const recentOrders = [
  { id: 'UQ1254', amount: 320, status: 'Preparing' },
  { id: 'UQ1253', amount: 250, status: 'Shipped' },
  { id: 'UQ1252', amount: 180, status: 'Delivered' },
];

const quickActions = [
  { key: 'add-product', label: 'Add Product', icon: '➕' },
  { key: 'orders', label: 'Orders', icon: '📦' },
  { key: 'inventory', label: 'Inventory', icon: '🗂️' },
  { key: 'reports', label: 'Reports', icon: '📊' },
];

const statusStyles = {
  Preparing: 'bg-[#FDF0D5] text-[#B8860B]',
  Shipped: 'bg-[#E6EEF9] text-[#2A5D8B]',
  Delivered: 'bg-[#E4F3E6] text-[#2E7D32]',
};

const bottomNavItems = [
  { key: 'home', label: 'Home', icon: '🏠', path: '/seller/dashboard' },
  { key: 'products', label: 'Products', icon: '🛍️', path: '/seller/products' },
  { key: 'orders', label: 'Orders', icon: '📦', path: '/seller/orders' },
  { key: 'earnings', label: 'Earnings', icon: '💰', path: '/seller/earnings' },
  { key: 'profile', label: 'Profile', icon: '👤', path: '/seller/profile' },
];

function SellerDashboardScreen() {
  const navigate = useNavigate();
  const [online, setOnline] = useState(true);

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F0D9B5] flex-shrink-0" />
          <div>
            <p className="text-white font-semibold">Hello, Savitha 👋</p>
            <p className="text-white text-xs opacity-70">Queen Seller</p>
          </div>
        </div>
        <button
          onClick={() => setOnline((o) => !o)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
            online ? 'bg-white text-[#8B1E3F]' : 'bg-white/20 text-white'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${online ? 'bg-green-500' : 'bg-gray-400'}`} />
          {online ? 'Online' : 'Offline'}
        </button>
      </div>

      <div className="px-4 mt-4">
        {/* Today's Overview */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <p className="text-[#8B1E3F] font-semibold text-sm mb-3">Today's Overview</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-gray-400 text-xs mb-1">Orders</p>
              <p className="text-[#8B1E3F] font-bold text-lg">{todaysOverview.orders}</p>
            </div>
            <div className="text-center border-l border-r border-gray-100">
              <p className="text-gray-400 text-xs mb-1">Sales</p>
              <p className="text-[#8B1E3F] font-bold text-lg">₹{todaysOverview.sales.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs mb-1">Earnings</p>
              <p className="text-[#8B1E3F] font-bold text-lg">₹{todaysOverview.earnings.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {quickActions.map((action) => (
            <button
              key={action.key}
              onClick={() => navigate(`/seller/${action.key}`)}
              className="bg-white rounded-xl shadow-sm py-3 flex flex-col items-center gap-1.5"
            >
              <span className="text-xl">{action.icon}</span>
              <span className="text-[#8B1E3F] text-[11px] font-medium text-center leading-tight">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[#8B1E3F] font-semibold text-sm">Recent Orders</p>
            <button
              onClick={() => navigate('/seller/orders')}
              className="text-xs text-[#8B1E3F] underline"
            >
              See All
            </button>
          </div>
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center py-2 border-b border-gray-50 last:border-b-0"
            >
              <span className="text-sm text-gray-600">Order ID: {order.id}</span>
              <span className="text-sm text-gray-600">₹{order.amount}</span>
              <span className={`text-[11px] font-medium px-2 py-1 rounded-full ${statusStyles[order.status]}`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
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

export default SellerDashboardScreen;