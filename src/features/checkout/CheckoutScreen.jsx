import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../cart/CartContext';
import { useAddress } from '../address/AddressContext';

const DELIVERY_CHARGE = 20;
const PLATFORM_FEE = 10;

function CheckoutScreen() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { selectedAddress } = useAddress();
  const [payment, setPayment] = useState('upi');

  const paymentOptions = [
    { id: 'upi', label: 'UPI' },
    { id: 'wallet', label: 'Wallet' },
    { id: 'cod', label: 'Cash on Delivery' },
  ];

  const grandTotal = total + DELIVERY_CHARGE + PLATFORM_FEE;

  function handlePlaceOrder() {
    const orderSnapshot = {
      orderId: `UQ${Math.floor(100000000 + Math.random() * 900000000)}`,
      placedOn: new Date().toLocaleString('en-IN', {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
      }),
      items,
      itemTotal: total,
      deliveryCharge: DELIVERY_CHARGE,
      platformFee: PLATFORM_FEE,
      grandTotal,
      address: selectedAddress,
    };

    clearCart();
    navigate('/order-confirmed', { state: orderSnapshot });
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">Checkout</h1>
      </div>

      <div className="px-4 mt-4">
        <h2 className="text-[#8B1E3F] font-semibold mb-2">Delivery Address</h2>
        <button
          onClick={() => navigate('/select-address')}
          className="w-full text-left bg-white rounded-xl shadow-sm p-4 mb-4 flex items-start gap-3"
        >
          <span className="text-lg mt-0.5">📍</span>
          <div className="flex-1">
            {selectedAddress ? (
              <>
                <p className="text-[#8B1E3F] font-medium">{selectedAddress.label}</p>
                <p className="text-gray-500 text-sm">{selectedAddress.line}</p>
              </>
            ) : (
              <p className="text-gray-400 text-sm">Add a delivery address</p>
            )}
          </div>
          <span className="text-[#8B1E3F] text-xs font-semibold whitespace-nowrap">Change</span>
        </button>

        <h2 className="text-[#8B1E3F] font-semibold mb-2">Payment Method</h2>
        <div className="flex flex-col gap-2 mb-4">
          {paymentOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setPayment(opt.id)}
              className={`text-left px-4 py-3 rounded-xl shadow-sm ${
                payment === opt.id ? 'bg-[#8B1E3F] text-white' : 'bg-white text-[#8B1E3F]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <h2 className="text-[#8B1E3F] font-semibold mb-2">Order Summary</h2>
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{item.name} × {item.qty}</span>
              <span className="text-gray-600">₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        <h2 className="text-[#8B1E3F] font-semibold mb-2">Price Details</h2>
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Item Total</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Delivery Charges</span>
            <span>₹{DELIVERY_CHARGE}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-3 pb-3 border-b border-gray-100">
            <span>Platform Fee</span>
            <span>₹{PLATFORM_FEE}</span>
          </div>
          <div className="flex justify-between font-bold text-[#8B1E3F]">
            <span>Total Amount</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        <button onClick={handlePlaceOrder} className="w-full bg-[#8B1E3F] text-white font-semibold py-3 rounded-xl">
          Place Order — ₹{grandTotal}
        </button>
      </div>
    </div>
  );
}

export default CheckoutScreen;