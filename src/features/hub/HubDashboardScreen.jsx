import { useNavigate } from 'react-router-dom';

const todaysSummary = {
  orders: 45,
  sales: 15230,
  pending: 8,
};

const quickActions = [
  { key: 'incoming', label: 'Incoming', icon: '📥' },
  { key: 'qc-check', label: 'QC Check', icon: '✅' },
  { key: 'storage', label: 'Storage', icon: '🏬' },
  { key: 'dispatch', label: 'Dispatch', icon: '🚚' },
];

const inventoryAlerts = [
  {
    id: 'mango-pickle-500g',
    name: 'Mango Pickle (500g)',
    status: 'Low Stock (5 left)',
    statusType: 'low',
  },
  {
    id: 'millet-cookies-200g',
    name: 'Millet Cookies (200g)',
    status: 'Out of Stock',
    statusType: 'out',
  },
];

const statusStyles = {
  low: 'bg-[#FDF0D5] text-[#B8860B]',
  out: 'bg-[#FBE4E4] text-[#B3261E]',
};

const bottomNavItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊', path: '/hub/dashboard' },
  { key: 'inventory', label: 'Inventory', icon: '🗂️', path: '/hub/inventory' },
  { key: 'orders', label: 'Orders', icon: '📦', path: '/hub/orders' },
  { key: 'reports', label: 'Reports', icon: '📈', path: '/hub/reports' },
  { key: 'more', label: 'More', icon: '⋯', path: '/hub/more' },
];

function HubDashboardScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#F0D9B5] flex-shrink-0" />
        <div>
          <p className="text-white font-semibold">Queen Hub Dashboard</p>
          <p className="text-white text-xs opacity-70">Rajajinagar Hub</p>
        </div>
      </div>

      <div className="px-4 mt-4">
        {/* Today's Summary */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <p className="text-[#8B1E3F] font-semibold text-sm mb-3">Today's Summary</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-gray-400 text-xs mb-1">Orders</p>
              <p className="text-[#8B1E3F] font-bold text-lg">{todaysSummary.orders}</p>
            </div>
            <div className="text-center border-l border-r border-gray-100">
              <p className="text-gray-400 text-xs mb-1">Sales</p>
              <p className="text-[#8B1E3F] font-bold text-lg">₹{todaysSummary.sales.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs mb-1">Pending</p>
              <p className="text-[#8B1E3F] font-bold text-lg">{todaysSummary.pending}</p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {quickActions.map((action) => (
            <button
              key={action.key}
              onClick={() => navigate(`/hub/${action.key}`)}
              className="bg-white rounded-xl shadow-sm py-3 flex flex-col items-center gap-1.5"
            >
              <span className="text-xl">{action.icon}</span>
              <span className="text-[#8B1E3F] text-[11px] font-medium text-center leading-tight">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Inventory Alerts */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[#8B1E3F] font-semibold text-sm">Inventory Alerts</p>
            <button
              onClick={() => navigate('/hub/inventory')}
              className="text-xs text-[#8B1E3F] underline"
            >
              See All
            </button>
          </div>
          {inventoryAlerts.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-gray-50 last:border-b-0"
            >
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className={`text-[11px] font-medium px-2 py-1 rounded-full ${statusStyles[item.statusType]}`}>
                {item.status}
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

export default HubDashboardScreen;