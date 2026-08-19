import { useNavigate } from 'react-router-dom';

const bottomNavItems = [
  { key: 'tasks', label: 'Tasks', icon: '🧾', path: '/rider/tasks' },
  { key: 'earnings', label: 'Earnings', icon: '💰', path: '/rider/earnings' },
  { key: 'wallet', label: 'Wallet', icon: '👛', path: '/rider/wallet' },
  { key: 'profile', label: 'Profile', icon: '👤', path: '/rider/profile' },
];

const transactions = [
  { id: 1, type: 'credit', label: 'Delivery earning — UQ125487960', amount: 35, date: 'Today, 2:20 PM' },
  { id: 2, type: 'credit', label: 'Delivery earning — UQ125487955', amount: 28, date: 'Today, 11:45 AM' },
  { id: 3, type: 'debit', label: 'Withdrawal to bank', amount: 1500, date: 'Yesterday, 9:00 AM' },
  { id: 4, type: 'credit', label: 'Delivery earning — UQ125487950', amount: 42, date: 'Yesterday, 6:10 PM' },
];

function RiderWalletScreen() {
  const navigate = useNavigate();
  const balance = 785;

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4">
        <h1 className="text-white font-semibold">Wallet</h1>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm p-5 mb-4 text-center">
          <p className="text-gray-400 text-xs mb-1">Available Balance</p>
          <p className="text-[#8B1E3F] text-3xl font-bold mb-4">₹{balance}</p>
          <button className="bg-[#8B1E3F] text-white font-semibold px-6 py-2.5 rounded-xl text-sm">
            Withdraw to Bank
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-[#8B1E3F] font-semibold text-sm mb-3">Transaction History</h3>
          {transactions.map((t) => (
            <div key={t.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-b-0">
              <div>
                <p className="text-gray-700 text-sm">{t.label}</p>
                <p className="text-gray-400 text-xs">{t.date}</p>
              </div>
              <p className={`font-semibold text-sm ${t.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                {t.type === 'credit' ? '+' : '−'}₹{t.amount}
              </p>
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

export default RiderWalletScreen;