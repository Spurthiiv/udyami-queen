import { useNavigate } from 'react-router-dom';

const bottomNavItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊', path: '/hub/dashboard' },
  { key: 'inventory', label: 'Inventory', icon: '🗂️', path: '/hub/inventory' },
  { key: 'orders', label: 'Orders', icon: '📦', path: '/hub/orders' },
  { key: 'reports', label: 'Reports', icon: '📈', path: '/hub/reports' },
  { key: 'more', label: 'More', icon: '⋯', path: '/hub/more' },
];

const menuItems = [
  { label: 'Staff Management', icon: '👥' },
  { label: 'Hub Settings', icon: '⚙️' },
  { label: 'Seller Directory', icon: '🏪' },
  { label: 'Rider Directory', icon: '🛵' },
  { label: 'Help & Support', icon: '❓' },
];

function HubMoreScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4">
        <h1 className="text-white font-semibold">More</h1>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
                i !== menuItems.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-gray-700 text-sm flex-1">{item.label}</span>
              <span className="text-gray-300">›</span>
            </button>
          ))}
        </div>

        <button className="w-full bg-white border-2 border-red-400 text-red-500 font-semibold py-3 rounded-xl">
          Log Out
        </button>
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

export default HubMoreScreen;