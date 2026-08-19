import { useNavigate } from 'react-router-dom';

const bottomNavItems = [
  { key: 'tasks', label: 'Tasks', icon: '🧾', path: '/rider/tasks' },
  { key: 'earnings', label: 'Earnings', icon: '💰', path: '/rider/earnings' },
  { key: 'wallet', label: 'Wallet', icon: '👛', path: '/rider/wallet' },
  { key: 'profile', label: 'Profile', icon: '👤', path: '/rider/profile' },
];

const recentEarnings = [
  { id: 'UQ125487960', date: 'Today, 2:15 PM', amount: 35 },
  { id: 'UQ125487955', date: 'Today, 11:40 AM', amount: 28 },
  { id: 'UQ125487950', date: 'Yesterday, 6:05 PM', amount: 42 },
  { id: 'UQ125487948', date: 'Yesterday, 1:20 PM', amount: 30 },
];

function RiderEarningsScreen() {
  const navigate = useNavigate();

  const todayTotal = recentEarnings
    .filter((e) => e.date.startsWith('Today'))
    .reduce((sum, e) => sum + e.amount, 0);

  const weekTotal = recentEarnings.reduce((sum, e) => sum + e.amount, 0) + 2130;

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4">
        <h1 className="text-white font-semibold">Earnings</h1>
      </div>

      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-400 text-xs mb-1">Today's Earnings</p>
            <p className="text-[#8B1E3F] text-2xl font-bold">₹{todayTotal}</p>
            <p className="text-gray-400 text-xs mt-1">{recentEarnings.filter((e) => e.date.startsWith('Today')).length} deliveries</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-400 text-xs mb-1">This Week</p>
            <p className="text-[#8B1E3F] text-2xl font-bold">₹{weekTotal}</p>
            <p className="text-gray-400 text-xs mt-1">45 deliveries</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-[#8B1E3F] font-semibold text-sm mb-3">Recent Deliveries</h3>
          {recentEarnings.map((e) => (
            <div key={e.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-b-0">
              <div>
                <p className="text-gray-700 text-sm">{e.id}</p>
                <p className="text-gray-400 text-xs">{e.date}</p>
              </div>
              <p className="text-green-600 font-semibold text-sm">+₹{e.amount}</p>
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

export default RiderEarningsScreen;