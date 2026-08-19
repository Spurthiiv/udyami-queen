import { useNavigate } from 'react-router-dom';

const bottomNavItems = [
  { key: 'home', label: 'Home', icon: '🏠', path: '/seller/dashboard' },
  { key: 'products', label: 'Products', icon: '🛍️', path: '/seller/products' },
  { key: 'orders', label: 'Orders', icon: '📦', path: '/seller/orders' },
  { key: 'earnings', label: 'Earnings', icon: '💰', path: '/seller/earnings' },
  { key: 'profile', label: 'Profile', icon: '👤', path: '/seller/profile' },
];

const menuItems = [
  { label: 'Shop Details', icon: '🏪' },
  { label: 'FSSAI & Documents', icon: '📄' },
  { label: 'Bank Account', icon: '🏦' },
  { label: 'Order History', icon: '📦' },
  { label: 'Ratings & Reviews', icon: '⭐' },
  { label: 'Help & Support', icon: '❓' },
];

function SellerProfileScreen() {
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
            <p className="text-[#8B1E3F] font-bold">Savitha Foods</p>
            <p className="text-gray-500 text-sm">Queen Seller • Rajajinagar</p>
            <p className="text-gray-400 text-xs mt-1">★ 4.8 rating • 256 orders</p>
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

export default SellerProfileScreen;