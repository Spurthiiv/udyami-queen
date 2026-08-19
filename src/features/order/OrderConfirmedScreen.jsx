import { useNavigate, useLocation } from 'react-router-dom';

function OrderConfirmedScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state;

  const orderId = order?.orderId || 'UQ000000000';
  const placedOn = order?.placedOn || '—';

  return (
    <div className="min-h-screen bg-[#FDF6F0] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-[#8B1E3F] text-xl font-bold mb-2">Order Placed!</h1>
      <p className="text-gray-500 text-sm mb-1">
        Your order is being prepared by your local Queen Seller.
      </p>

      <div className="bg-white rounded-xl shadow-sm px-5 py-4 my-5 w-full max-w-xs">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Order ID</span>
          <span className="text-[#8B1E3F] font-semibold">{orderId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Placed On</span>
          <span className="text-[#8B1E3F] font-semibold">{placedOn}</span>
        </div>
      </div>

      <button
        onClick={() => navigate('/tracking', { state: order })}
        className="w-full max-w-xs bg-[#8B1E3F] text-white font-semibold py-3 rounded-xl mb-3"
      >
        Track Order
      </button>
      <button
        onClick={() => navigate('/home')}
        className="w-full max-w-xs bg-white text-[#8B1E3F] font-semibold py-3 rounded-xl border-2 border-[#8B1E3F]"
      >
        Back to Home
      </button>
    </div>
  );
}

export default OrderConfirmedScreen;