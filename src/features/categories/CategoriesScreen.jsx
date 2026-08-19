import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { categories, products } from '../../data/products';
import { getCategoryImage } from '../../utils/categoryImages';

const categoryColors = {
  'coffee-tea-health-drinks': 'bg-orange-100',
  'cold-pressed-oils': 'bg-yellow-100',
  'festival-specials': 'bg-green-100',
  'fresh-batters': 'bg-amber-100',
  'fresh-dairy': 'bg-red-100',
  'fresh-homemade-foods': 'bg-yellow-50',
  'healthy-foods': 'bg-blue-100',
  'healthy-snacks': 'bg-orange-50',
  'herbal-personal-care': 'bg-emerald-100',
  'honey-natural-sweeteners': 'bg-purple-100',
  'millet-products': 'bg-pink-100',
  'pickles': 'bg-teal-100',
  'ready-to-cook': 'bg-lime-100',
  'spice-chutney-powders': 'bg-cyan-100',
  'traditional-foods': 'bg-rose-100',
  'papads-vadams': 'bg-amber-50',
  'bakery-cookies': 'bg-yellow-100',
  'handmade-crafts-decor': 'bg-orange-100',
};

const categoryDescriptions = {
  'coffee-tea-health-drinks': 'Filter coffee, herbal teas and health drinks',
  'cold-pressed-oils': 'Traditionally extracted, chemical-free oils',
  'festival-specials': 'Sweets and snacks for every occasion',
  'fresh-batters': 'Idli, dosa and rotti batters made fresh daily',
  'fresh-dairy': 'Farm-fresh paneer, curd, butter and more',
  'fresh-homemade-foods': 'Chutneys and everyday homemade favorites',
  'healthy-foods': 'Sprouts, salads and fresh-cut essentials',
  'healthy-snacks': 'Wholesome snacking, guilt-free',
  'herbal-personal-care': 'Natural soaps, oils and skincare',
  'honey-natural-sweeteners': 'Pure honey and traditional jaggery',
  'millet-products': 'Healthy & natural millet based foods',
  'pickles': 'Traditional taste made with love',
  'ready-to-cook': 'Homestyle gravies and pastes, ready in minutes',
  'spice-chutney-powders': 'Aromatic powders ground the traditional way',
  'traditional-foods': 'Regional delicacies from home kitchens',
  'papads-vadams': 'Sun-dried papads and vadams, homestyle',
  'bakery-cookies': 'Freshly baked cookies and cakes',
  'handmade-crafts-decor': 'Handcrafted décor and jewelry, made with love',
};

function CategoriesScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const productList = Object.values(products);

  function countForCategory(slug) {
    return productList.filter((p) => p.category === slug).length;
  }

  const filteredCategories = categories.filter((cat) =>
    cat.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-6">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">Categories</h1>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl px-3 py-2.5 flex items-center gap-2 shadow-sm mb-4">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="flex-1 outline-none text-sm text-gray-600"
          />
        </div>

        <div className="flex flex-col gap-3">
          {filteredCategories.length === 0 && (
            <p className="text-gray-400 text-sm text-center mt-10">No categories match your search</p>
          )}
          {filteredCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3 text-left"
            >
              {getCategoryImage(cat.slug) ? (
                <img
                  src={getCategoryImage(cat.slug)}
                  alt={cat.label}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className={`w-16 h-16 rounded-lg flex-shrink-0 ${categoryColors[cat.slug] || 'bg-gray-100'}`} />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[#8B1E3F] font-semibold text-sm leading-tight">{cat.label}</p>
                <p className="text-gray-400 text-xs mt-1 leading-snug">
                  {categoryDescriptions[cat.slug] || 'Explore this category'}
                </p>
                <p className="text-[#8B1E3F] text-xs font-semibold mt-1">
                  {countForCategory(cat.slug)}+ Products
                </p>
              </div>
              <span className="text-gray-300 text-lg flex-shrink-0">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesScreen;