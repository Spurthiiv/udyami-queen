import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const stages = ['Confirmed', 'Packed', 'Out for Delivery', 'Delivered'];

function OrderTrackingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state;

  const [currentStage, setCurrentStage] = useState(0);

  const orderId = order?.orderId || 'UQ000000000';
  const placedOn = order?.placedOn || '—';
  const items = order?.items || [];

  useEffect(() => {
    if (currentStage < stages.length - 1) {
      const timer = setTimeout(() => setCurrentStage((s) => s + 1), 5000); // 5 seconds per stage
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">Order Tracking</h1>
      </div>

      <div className="px-4 mt-4">
        <p className="text-gray-500 text-xs mb-4">
          Order ID: {orderId} &nbsp;•&nbsp; Placed on {placedOn}
        </p>

        {/* Status stepper */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
          <div className="flex justify-between items-center mb-2">
            {stages.map((stage, i) => (
              <div key={stage} className="flex-1 flex flex-col items-center relative">
                {i > 0 && (
                  <div
                    className={`absolute top-3 right-1/2 w-full h-0.5 -z-10 ${
                      i <= currentStage ? 'bg-[#8B1E3F]' : 'bg-gray-200'
                    }`}
                  />
                )}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                    i <= currentStage ? 'bg-[#8B1E3F]' : 'bg-gray-200'
                  }`}
                >
                  {i <= currentStage ? '✓' : ''}
                </div>
                <p className={`text-[10px] mt-2 text-center ${i <= currentStage ? 'text-[#8B1E3F] font-medium' : 'text-gray-400'}`}>
                  {stage}
                </p>
              </div>
            ))}
          </div>
          {currentStage < stages.length - 1 ? (
            <p className="text-xs text-gray-400 text-center mt-3">
              Your order is on the way
            </p>
          ) : (
            <p className="text-xs text-green-600 text-center mt-3">
              Delivered — enjoy your order!
            </p>
          )}
        </div>

        {/* Delivery executive */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F0D9B5] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[#8B1E3F] font-medium text-sm">Anitha R.</p>
            <p className="text-gray-400 text-xs">Delivery Executive</p>
          </div>
          <span className="text-xs text-gray-500">★ 4.9</span>
        </div>

        {/* Delivery address */}
<div className="bg-white rounded-xl shadow-sm p-4 mb-4">
  <p className="text-[#8B1E3F] font-medium text-sm mb-1">
    Delivery Address {order?.address?.label ? `— ${order.address.label}` : ''}
  </p>
  <p className="text-gray-500 text-xs">
    {order?.address?.line || 'No address on file for this order'}
  </p>
</div>

        {/* Order items */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[#8B1E3F] font-medium text-sm">Order Items</p>
            <button
              onClick={() => navigate('/order-detail', { state: order })}
              className="text-xs text-[#8B1E3F] underline"
            >
              View Details
            </button>
          </div>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-xs">No item details available.</p>
          )}
        </div>

        {currentStage === stages.length - 1 && (
          <button
            onClick={() => navigate('/order-detail', { state: order })}
            className="w-full bg-[#8B1E3F] text-white font-semibold py-3 rounded-xl mt-2"
          >
            Rate Your Order
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderTrackingScreen;