import { useNavigate } from 'react-router-dom';

const bottomNavItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊', path: '/hub/dashboard' },
  { key: 'inventory', label: 'Inventory', icon: '🗂️', path: '/hub/inventory' },
  { key: 'orders', label: 'Orders', icon: '📦', path: '/hub/orders' },
  { key: 'reports', label: 'Reports', icon: '📈', path: '/hub/reports' },
  { key: 'more', label: 'More', icon: '⋯', path: '/hub/more' },
];

const inventory = [
  { id: 1, name: 'Mango Pickle (500g)', stock: 5, status: 'low' },
  { id: 2, name: 'Millet Cookies (200g)', stock: 0, status: 'out' },
  { id: 3, name: 'Idli Batter (1kg)', stock: 42, status: 'ok' },
  { id: 4, name: 'Filter Coffee Powder (250g)', stock: 28, status: 'ok' },
  { id: 5, name: 'Fresh Curd (500g)', stock: 12, status: 'ok' },
];

const statusStyles = {
  low: { text: 'Low Stock', style: 'bg-[#FDF0D5] text-[#B8860B]' },
  out: { text: 'Out of Stock', style: 'bg-[#FBE4E4] text-[#B3261E]' },
  ok: { text: 'In Stock', style: 'bg-[#E4F3E6] text-[#2E7D32]' },
};

function HubInventoryScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4">
        <h1 className="text-white font-semibold">Hub Inventory</h1>
      </div>

      <div className="px-4 mt-4">
        {inventory.map((item) => {
          const s = statusStyles[item.status];
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center mb-3">
              <div>
                <p className="text-[#8B1E3F] font-medium text-sm">{item.name}</p>
                <p className="text-gray-400 text-xs">{item.stock} units</p>
              </div>
              <span className={`text-[11px] font-medium px-2 py-1 rounded-full ${s.style}`}>
                {s.text}
              </span>
            </div>
          );
        })}
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

export default HubInventoryScreen;