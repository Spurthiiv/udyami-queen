import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function OrderDetailScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state;

  const items = order?.items || [];
  const orderId = order?.orderId || 'UQ000000000';
  const placedOn = order?.placedOn || '—';
  const itemTotal = order?.itemTotal ?? 0;
  const deliveryCharge = order?.deliveryCharge ?? 0;
  const platformFee = order?.platformFee ?? 0;
  const grandTotal = order?.grandTotal ?? 0;

  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">Order Details</h1>
      </div>

      <div className="px-4 mt-4">
        <p className="text-gray-500 text-xs mb-4">
          Order ID: {orderId} &nbsp;•&nbsp; Placed on {placedOn}
        </p>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <p className="text-[#8B1E3F] font-semibold mb-2">Delivered</p>
          {items.length === 0 && (
            <p className="text-gray-400 text-sm">No items found for this order.</p>
          )}
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{item.name} × {item.qty}</span>
              <span className="text-gray-600">₹{item.price * item.qty}</span>
            </div>
          ))}

          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Item Total</span>
              <span>₹{itemTotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Delivery Charges</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t border-gray-100">
              <span className="text-[#8B1E3F]">Total Paid</span>
              <span className="text-[#8B1E3F]">₹{grandTotal}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-[#8B1E3F] font-semibold mb-3">Rate your experience</p>
          {!submitted ? (
            <>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${star <= rating ? 'text-[#D4A934]' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSubmitted(true)}
                disabled={rating === 0}
                className="w-full bg-[#8B1E3F] text-white font-semibold py-3 rounded-xl disabled:opacity-40"
              >
                Submit Rating
              </button>
            </>
          ) : (
            <p className="text-green-600 text-sm">Thanks for your feedback! 🙏</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailScreen;