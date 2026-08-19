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

// Mock: this seller's products — using a small slice of the real catalog
// since there's no per-seller ownership data yet.
const mySellerProductIds = [1, 2, 3, 4];

function SellerProductsScreen() {
  const navigate = useNavigate();
  const [items, setItems] = useState(
    mySellerProductIds.map((id) => ({ ...products[id], active: true }))
  );

  function toggleActive(id) {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center justify-between">
        <h1 className="text-white font-semibold">My Products</h1>
        <button
          onClick={() => navigate('/seller/add-product')}
          className="bg-white text-[#8B1E3F] text-xs font-semibold px-3 py-2 rounded-lg"
        >
          + Add
        </button>
      </div>

      <div className="px-4 mt-4">
        {items.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3 mb-3">
            <div className={`w-14 h-14 rounded-lg ${product.color} flex-shrink-0`} />
            <div className="flex-1">
              <p className="text-[#8B1E3F] font-medium text-sm">{product.name}</p>
              <p className="text-gray-400 text-xs">₹{product.price} • {product.categoryLabel}</p>
            </div>
            <button
              onClick={() => toggleActive(product.id)}
              className={`text-[11px] font-medium px-3 py-1.5 rounded-full ${
                product.active
                  ? 'bg-[#E4F3E6] text-[#2E7D32]'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {product.active ? 'Active' : 'Paused'}
            </button>
          </div>
        ))}
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

export default SellerProductsScreen;