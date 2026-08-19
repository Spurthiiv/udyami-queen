import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../cart/CartContext';
import { products, stockLabels } from '../../data/products';
import { getProductDetails } from '../../data/productDetails';
import { useWishlist } from '../wishlist/WishlistContext';
import { getProductImage } from '../../utils/productImages';

const DETAIL_FIELDS = [
  ['processingType', 'Processing Type'],
  ['biologicalSource', 'Biological Source'],
  ['sugarProfile', 'Sugar Profile'],
  ['proteinPer100g', 'Protein Per 100 g'],
  ['totalCarbsPer100g', 'Total Carbohydrates Per 100 g'],
  ['totalSugarPer100g', 'Total Sugar Per 100 g'],
  ['addedSugarsPer100g', 'Added Sugars Per 100 g'],
  ['totalFatPer100g', 'Total Fat Per 100 g'],
  ['saturatedFatPer100g', 'Saturated Fat Per 100 g'],
  ['unsaturatedFatPer100g', 'Unsaturated Fat Per 100 g'],
  ['transFatPer100g', 'Trans Fat Per 100 g'],
  ['cholesterolPer100g', 'Cholesterol Per 100 g'],
  ['sodiumPer100g', 'Sodium Per 100 g'],
  ['calciumPer100g', 'Calcium Per 100 g'],
  ['caloriesPer100g', 'Calories per 100g'],
  ['totalFat', 'Total Fat'],
  ['sodium', 'Sodium'],
  ['calories', 'Calories'],
  ['serveSize', 'Serve Size'],
  ['keyFeatures', 'Key Features'],
  ['unit', 'Unit'],
  ['fssaiLicense', 'FSSAI License'],
  ['shelfLife', 'Shelf Life'],
  ['disclaimer', 'Disclaimer'],
  ['customerCareEmail', 'Customer Care Details'],
  ['countryOfOrigin', 'Country of Origin'],
  ['manufacturerAddress', "Manufacturer's Name and Address"],
  ['returnPolicy', 'Return Policy'],
  ['seller', 'Seller'],
  ['sellerFssai', 'Seller FSSAI'],
];

// Mock weight variants — swap with real per-product variant data later.
// Multipliers scale the base price/mrp for now.
const SIZE_VARIANTS = [
  { label: '250g', multiplier: 0.6 },
  { label: '500g', multiplier: 1 },
  { label: '1kg', multiplier: 1.85 },
];

function ProductDetailScreen() {
  const { productId } = useParams();
  const navigate = useNavigate();
 const { addToCart } = useCart();
const { isWishlisted, toggleWishlist } = useWishlist();
const [qty, setQty] = useState(1);
const [showDetails, setShowDetails] = useState(false);
const [selectedSize, setSelectedSize] = useState(1); // index into SIZE_VARIANTS, default 500g

  const product = products[productId] || products[1];
    const productImage = getProductImage(product.id);
  const stockInfo = stockLabels[product.stock] || stockLabels.in_stock;

  const variant = SIZE_VARIANTS[selectedSize];
  const scaledPrice = Math.round(product.price * variant.multiplier);
  const scaledMrp = product.mrp ? Math.round(product.mrp * variant.multiplier) : null;
  const discount = scaledMrp
    ? Math.round(((scaledMrp - scaledPrice) / scaledMrp) * 100)
    : 0;

  const details = getProductDetails(product);
  const manufacturerLine = details.manufacturerName
    ? `${details.manufacturerName}, ${details.manufacturerAddress || ''}`.trim()
    : details.manufacturerAddress;

  function handleAddToCart() {
    addToCart({ ...product, price: scaledPrice, mrp: scaledMrp, sizeLabel: variant.label }, qty);
    navigate('/cart');
  }

  function handleBuyNow() {
    addToCart({ ...product, price: scaledPrice, mrp: scaledMrp, sizeLabel: variant.label }, qty);
    navigate('/checkout');
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">Product Details</h1>
      </div>

      {/* Image with icon overlay */}
      {/* Image with icon overlay */}
<div className={`relative w-full h-56 ${productImage ? '' : product.color} flex items-center justify-center text-gray-500 text-sm overflow-hidden`}>
  {productImage ? (
    <img src={productImage} alt={product.name} className="w-full h-full object-cover" />
  ) : (
    product.name
  )}
  <div className="absolute top-3 right-3 flex gap-2">
          <button
  onClick={() => toggleWishlist(product)}
  className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-base"
>
  {isWishlisted(product.id) ? '❤️' : '🤍'}
</button>
          <button className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-base">
            🔗
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-base"
          >
            🛒
          </button>
        </div>
      </div>

      <div className="px-4 mt-4">
        <h2 className="text-[#8B1E3F] text-lg font-bold">{product.name}</h2>
        <p className="text-gray-400 text-sm mb-2">
          by {product.seller} • ★ {product.rating} ({product.orders})
        </p>

        {/* Price with MRP strikethrough */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#8B1E3F] text-2xl font-bold">₹{scaledPrice}</span>
          {scaledMrp && scaledMrp > scaledPrice && (
            <>
              <span className="text-gray-400 line-through text-sm">₹{scaledMrp}</span>
              <span className="text-green-600 text-xs font-semibold">{discount}% OFF</span>
            </>
          )}
        </div>

        {/* Size variant chips */}
        <div className="flex gap-2 mb-4">
          {SIZE_VARIANTS.map((v, i) => (
            <button
              key={v.label}
              onClick={() => setSelectedSize(i)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${
                selectedSize === i
                  ? 'bg-[#8B1E3F] text-white border-[#8B1E3F]'
                  : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          <span className="text-[10px] bg-white border border-[#8B1E3F] text-[#8B1E3F] px-2 py-1 rounded-full">
            🏠 Homemade
          </span>
          {product.refrigerated === 'No' && (
            <span className="text-[10px] bg-white border border-gray-300 text-gray-600 px-2 py-1 rounded-full">
              🚫 No Preservatives
            </span>
          )}
          {product.verified && (
            <span className="text-[10px] bg-[#8B1E3F] text-white px-2 py-1 rounded-full">
              Verified Queen Seller
            </span>
          )}
        </div>

        {/* About Product */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-[#8B1E3F] font-semibold text-sm mb-2">About Product</h3>
          <p className="text-gray-600 text-sm mb-3">{product.desc}</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <p>🕒 Prep time: {product.prepTime}</p>
            <p>📦 Freshness: {product.freshness}</p>
            <p>🧊 Refrigerated: {product.refrigerated}</p>
            <p>📅 Available: {product.availableDays}</p>
          </div>
        </div>

        {/* Detailed Product Details (collapsible) */}
        <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
          <button
            onClick={() => setShowDetails((s) => !s)}
            className="w-full flex items-center justify-between p-4"
          >
            <h3 className="text-[#8B1E3F] font-semibold text-sm">Product Details</h3>
            <span className="text-[#8B1E3F] text-xs">{showDetails ? '▲ Hide' : '▼ View'}</span>
          </button>

          {showDetails && (
            <div className="px-4 pb-4 border-t border-gray-100 pt-2">
              {DETAIL_FIELDS.map(([key, label]) => {
                const value = key === 'manufacturerAddress' ? manufacturerLine : details[key];
                if (!value) return null;
                const isCustomerCare = key === 'customerCareEmail';
                return (
                  <div key={key} className="py-2 border-b border-gray-50 last:border-b-0">
                    <p className="text-gray-400 text-xs mb-0.5">{label}</p>
                    <p className="text-gray-700 text-sm">
                      {isCustomerCare ? `Email: ${value}` : value}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Availability */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <p className={`font-medium mb-1 ${stockInfo.color}`}>{stockInfo.text}</p>
          <p className="text-sm text-gray-500">{product.deliveryEstimate}</p>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[#8B1E3F] font-medium">Quantity</span>
          <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-1 shadow-sm">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-[#8B1E3F] font-bold text-lg">−</button>
            <span className="text-[#8B1E3F]">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="text-[#8B1E3F] font-bold text-lg">+</button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pb-24">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-white border-2 border-[#8B1E3F] text-[#8B1E3F] font-semibold py-3 rounded-xl"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#8B1E3F] text-white font-semibold py-3 rounded-xl"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailScreen;