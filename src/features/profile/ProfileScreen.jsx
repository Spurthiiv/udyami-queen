import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useAddress } from '../address/AddressContext';

function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { addresses } = useAddress();

  const pastOrders = [
    { id: 101, date: '02 Aug 2026', total: 270, status: 'Delivered' },
  ];

  function handleLogout() {
    logout();
    navigate('/', { replace: true });
  }

  const displayName = user?.name || 'Guest';
  const contactLine =5164946566
    user?.method === 'phone' ? `+91 ${user.identity}` : user?.identity || '';

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 pt-6 pb-8 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-[#8B1E3F] flex-shrink-0">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">{displayName}</h2>
          {contactLine && <p className="text-white/80 text-sm mt-0.5">{contactLine}</p>}
        </div>
      </div>

      <div className="px-4 mt-4">
        {/* Saved Addresses */}
        <section className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-[#8B1E3F] font-semibold text-sm">Saved Addresses</h3>
            <button
              onClick={() => navigate('/select-address')}
              className="text-[#8B1E3F] text-xs font-semibold"
            >
              Manage
            </button>
          </div>
          {addresses.length === 0 && (
            <p className="text-gray-400 text-sm">No saved addresses yet</p>
          )}
          {addresses.map((addr) => (
            <div key={addr.id} className="bg-white rounded-xl shadow-sm p-4 mb-2">
              <p className="text-[#8B1E3F] font-medium text-sm">{addr.label}</p>
              <p className="text-gray-500 text-xs mt-0.5">{addr.line}</p>
            </div>
          ))}
          <button
            onClick={() => navigate('/select-address')}
            className="text-[#8B1E3F] font-semibold text-sm mt-1"
          >
            + Add New Address
          </button>
        </section>

        {/* Order History */}
        <section className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-[#8B1E3F] font-semibold text-sm">Order History</h3>
            <button onClick={() => navigate('/orders')} className="text-[#8B1E3F] text-xs font-semibold">
              See All
            </button>
          </div>
          {pastOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => navigate('/order-detail')}
              className="w-full bg-white rounded-xl shadow-sm p-4 mb-2 flex justify-between items-center text-left"
            >
              <div>
                <p className="text-[#8B1E3F] font-medium text-sm">Order #{order.id}</p>
                <p className="text-gray-400 text-xs mt-0.5">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-[#8B1E3F] font-semibold text-sm">₹{order.total}</p>
                <p className="text-green-600 text-xs mt-0.5">{order.status}</p>
              </div>
            </button>
          ))}
        </section>

        {/* Menu items */}
        <div className="flex flex-col gap-2 mb-6">
          <button
            onClick={() => navigate('/wishlist')}
            className="w-full text-left bg-white rounded-xl shadow-sm px-4 py-3 text-[#8B1E3F] font-medium text-sm"
          >
            ♡ My Wishlist
          </button>
          <button
            onClick={() => navigate('/support')}
            className="w-full text-left bg-white rounded-xl shadow-sm px-4 py-3 text-[#8B1E3F] font-medium text-sm"
          >
            🛟 Help & Support
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full border-2 border-red-400 text-red-500 font-semibold py-3 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileScreen;