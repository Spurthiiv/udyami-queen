import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { categories } from '../../data/products';

const initialForm = {
  name: '',
  category: categories[0]?.slug || '',
  price: '',
  mrp: '',
  desc: '',
  prepTime: '',
  freshness: '',
  refrigerated: 'No',
  availableDays: 'Mon-Sun',
  stock: 'in_stock',
};

function SellerAddProductScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleSave(e) {
    e.preventDefault();
    // No backend yet — this just confirms the form data is valid and complete.
    // Once a Product API / seller data store exists, POST `form` there instead.
    console.log('New product (not yet persisted):', form);
    setSaved(true);
  }

  function handleReset() {
    setForm(initialForm);
    setSaved(false);
  }

  const isValid = form.name.trim() && form.price && form.category;

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">Add Product</h1>
      </div>

      <form onSubmit={handleSave} className="px-4 mt-4">
        {saved && (
          <div className="bg-[#E4F3E6] text-[#2E7D32] text-sm rounded-xl px-4 py-3 mb-4">
            ✅ Product details captured. (Not yet saved to a live catalog — backend wiring pending.)
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <label className="block text-[#8B1E3F] text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g. Homemade Mango Pickle (250 g)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-[#8B1E3F]"
          />

          <label className="block text-[#8B1E3F] text-sm font-medium mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-[#8B1E3F]"
          >
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="block text-[#8B1E3F] text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="180"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#8B1E3F]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[#8B1E3F] text-sm font-medium mb-1">MRP (₹)</label>
              <input
                type="number"
                min="0"
                value={form.mrp}
                onChange={(e) => handleChange('mrp', e.target.value)}
                placeholder="220"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#8B1E3F]"
              />
            </div>
          </div>

          <label className="block text-[#8B1E3F] text-sm font-medium mb-1">Description</label>
          <textarea
            value={form.desc}
            onChange={(e) => handleChange('desc', e.target.value)}
            placeholder="Short description shown on the product page"
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#8B1E3F]"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <p className="text-[#8B1E3F] font-semibold text-sm mb-3">Availability Details</p>

          <label className="block text-gray-500 text-xs font-medium mb-1">Prep Time</label>
          <input
            type="text"
            value={form.prepTime}
            onChange={(e) => handleChange('prepTime', e.target.value)}
            placeholder="e.g. 4-6 hrs"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-[#8B1E3F]"
          />

          <label className="block text-gray-500 text-xs font-medium mb-1">Freshness / Shelf Life</label>
          <input
            type="text"
            value={form.freshness}
            onChange={(e) => handleChange('freshness', e.target.value)}
            placeholder="e.g. 24 hrs"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-[#8B1E3F]"
          />

          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <label className="block text-gray-500 text-xs font-medium mb-1">Refrigerated</label>
              <select
                value={form.refrigerated}
                onChange={(e) => handleChange('refrigerated', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#8B1E3F]"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-500 text-xs font-medium mb-1">Stock Status</label>
              <select
                value={form.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#8B1E3F]"
              >
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Only a few left</option>
                <option value="made_to_order">Made to Order</option>
              </select>
            </div>
          </div>

          <label className="block text-gray-500 text-xs font-medium mb-1">Available Days</label>
          <input
            type="text"
            value={form.availableDays}
            onChange={(e) => handleChange('availableDays', e.target.value)}
            placeholder="e.g. Mon-Sat"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#8B1E3F]"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-white border-2 border-[#8B1E3F] text-[#8B1E3F] font-semibold py-3 rounded-xl"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="flex-1 bg-[#8B1E3F] text-white font-semibold py-3 rounded-xl disabled:opacity-40"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default SellerAddProductScreen;