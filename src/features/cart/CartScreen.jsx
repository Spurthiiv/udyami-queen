import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const DELIVERY_CHARGE = 20;
const PLATFORM_FEE = 10;

export default function CartScreen() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDF6F0] flex flex-col items-center justify-center px-6 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-[#8B1E3F] text-lg font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 text-sm mb-6">Add some items to get started.</p>
        <button
          onClick={() => navigate('/home')}
          className="bg-[#8B1E3F] text-white font-semibold px-6 py-3 rounded-xl"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  const grandTotal = total + DELIVERY_CHARGE + PLATFORM_FEE;

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4">
        <h1 className="text-white font-semibold">My Cart</h1>
        <p className="text-white text-xs opacity-70">{items.length} Items</p>
      </div>

      <div className="px-4 mt-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3 mb-3"
          >
            <div className={`w-14 h-14 rounded-lg ${item.color || 'bg-gray-100'} flex-shrink-0`} />

            <div className="flex-1">
              <p className="text-[#8B1E3F] font-medium text-sm">{item.name}</p>
              <p className="text-gray-400 text-xs">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-2 bg-[#FDF6F0] rounded-lg px-2 py-1">
              <button
                onClick={() => updateQuantity(item.id, item.qty - 1)}
                className="text-[#8B1E3F] font-bold"
              >
                −
              </button>
              <span className="text-[#8B1E3F] text-sm w-4 text-center">{item.qty}</span>
              <button
                onClick={() => updateQuantity(item.id, item.qty + 1)}
                className="text-[#8B1E3F] font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 text-xs ml-1"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Price Details */}
        <div className="bg-white rounded-xl shadow-sm p-4 mt-4">
          <h3 className="text-[#8B1E3F] font-semibold text-sm mb-3">Price Details</h3>
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

        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-[#8B1E3F] text-white font-semibold py-3 rounded-xl mt-4"
        >
          Proceed to Checkout
        </button>
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-white border-2 border-[#8B1E3F] text-[#8B1E3F] font-semibold py-3 rounded-xl mt-3"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}