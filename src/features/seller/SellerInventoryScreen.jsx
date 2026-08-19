import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../../data/products';

const bottomNavItems = [
  { key: 'home', label: 'Home', icon: '🏠', path: '/seller/dashboard' },
  { key: 'products', label: 'Products', icon: '🛍️', path: '/seller/products' },
  { key: 'orders', label: 'Orders', icon: '📦', path: '/seller/orders' },
  { key: 'earnings', label: 'Earnings', icon: '💰', path: '/seller/earnings' },
  { key: 'profile', label: 'Profile', icon: '👤', path: '/seller/profile' },
];

const mySellerProductIds = [1, 2, 3, 4];

// Mock stock counts — no real inventory tracking exists yet.
const initialStock = { 1: 24, 2: 3, 3: 0, 4: 18 };

function SellerInventoryScreen() {
  const navigate = useNavigate();
  const [stock, setStock] = useState(initialStock);

  function adjustStock(id, delta) {
    setStock((prev) => ({ ...prev, [id]: Math.max(0, prev[id] + delta) }));
  }

  function stockLabel(count) {
    if (count === 0) return { text: 'Out of Stock', color: 'text-red-500' };
    if (count <= 5) return { text: 'Low Stock', color: 'text-amber-600' };
    return { text: 'In Stock', color: 'text-green-600' };
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4">
        <h1 className="text-white font-semibold">Inventory</h1>
      </div>

      <div className="px-4 mt-4">
        {mySellerProductIds.map((id) => {
          const product = products[id];
          const count = stock[id];
          const label = stockLabel(count);
          return (
            <div key={id} className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3 mb-3">
              <div className={`w-14 h-14 rounded-lg ${product.color} flex-shrink-0`} />
              <div className="flex-1">
                <p className="text-[#8B1E3F] font-medium text-sm">{product.name}</p>
                <p className={`text-xs font-medium ${label.color}`}>{label.text}</p>
              </div>
              <div className="flex items-center gap-2 bg-[#FDF6F0] rounded-lg px-2 py-1">
                <button onClick={() => adjustStock(id, -1)} className="text-[#8B1E3F] font-bold">−</button>
                <span className="text-[#8B1E3F] text-sm w-6 text-center">{count}</span>
                <button onClick={() => adjustStock(id, 1)} className="text-[#8B1E3F] font-bold">+</button>
              </div>
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

export default SellerInventoryScreen;