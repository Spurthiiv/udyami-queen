import { useNavigate } from 'react-router-dom';

const bottomNavItems = [
  { key: 'tasks', label: 'Tasks', icon: '🧾', path: '/rider/tasks' },
  { key: 'earnings', label: 'Earnings', icon: '💰', path: '/rider/earnings' },
  { key: 'wallet', label: 'Wallet', icon: '👛', path: '/rider/wallet' },
  { key: 'profile', label: 'Profile', icon: '👤', path: '/rider/profile' },
];

const menuItems = [
  { label: 'Vehicle Details', icon: '🛵' },
  { label: 'Documents (KYC)', icon: '📄' },
  { label: 'Delivery History', icon: '📦' },
  { label: 'Ratings & Feedback', icon: '⭐' },
  { label: 'Help & Support', icon: '❓' },
];

function RiderProfileScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4">
        <h1 className="text-white font-semibold">Profile</h1>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm p-5 mb-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#F0D9B5] flex-shrink-0" />
          <div>
            <p className="text-[#8B1E3F] font-bold">Anitha R.</p>
            <p className="text-gray-500 text-sm">Delivery Partner</p>
            <p className="text-gray-400 text-xs mt-1">★ 4.9 rating • 312 deliveries</p>
          </div>
        </div>

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

export default RiderProfileScreen;