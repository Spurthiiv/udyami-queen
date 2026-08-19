import { useNavigate } from 'react-router-dom';
import { useWishlist } from './WishlistContext';

function WishlistScreen() {
  const navigate = useNavigate();
  const { items, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-5">
        <h1 className="text-white font-semibold text-lg">Wishlist</h1>
      </div>

      <div className="px-4 mt-4">
        {items.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-10">Your wishlist is empty</p>
        )}
        {items.map((i) => (
          <div key={i.id} className="bg-white rounded-xl shadow-sm p-4 mb-3 flex gap-3">
            <div className={`w-16 h-16 rounded-lg flex-shrink-0 ${i.color || 'bg-[#FBE0C7]'}`} />
            <div className="flex-1">
              <p
                onClick={() => navigate(`/product/${i.id}`)}
                className="text-[#8B1E3F] font-semibold text-sm cursor-pointer"
              >
                {i.name}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{i.seller}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-semibold text-gray-700">₹{i.price}</span>
                <button
                  onClick={() => removeFromWishlist(i.id)}
                  className="text-xs text-red-400 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistScreen;