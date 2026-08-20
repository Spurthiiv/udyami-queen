import { useNavigate } from 'react-router-dom';
import { categories } from '../../../data/products';
import logo from '../../../assets/logo.png';
import { getCategoryImage } from '../../../utils/categoryImages';
import { useWard } from '../../address/WardContext';

const tileColors = [
  '#F7D9B8', '#D6E8D2', '#E8D9C4', '#F3C9C0',
  '#F7E1B5', '#F0C89A', '#E3D2E8', '#D2E3E8',
];

function HomeScreen() {
  const navigate = useNavigate();
  const topCategories = categories.slice(0, 8);
  const { selectedWard } = useWard();

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 pt-4 pb-6 rounded-b-3xl">
        {/* Brand row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={logo} alt="Udyami Queens" className="w-7 h-7 object-contain" />
            </div>
            <span className="text-white font-bold text-sm tracking-wide">Udyami Queens</span>
          </div>
          <button className="text-white text-lg">🔔</button>
        </div>

        {/* Location row */}
        {/* Location row */}
<button onClick={() => navigate('/select-ward')} className="text-left">
  <p className="text-white/80 text-xs">Bengaluru, Karnataka</p>
  <p className="text-white font-semibold text-sm flex items-center gap-1">
    Ward {selectedWard?.wardNo}, {selectedWard?.wardName} <span className="text-xs">▾</span>
  </p>
</button>
        <div className="bg-white rounded-xl mt-4 px-3 py-3 flex items-center gap-2">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search for products, sellers..."
            className="flex-1 outline-none text-sm text-gray-600"
          />
        </div>
      </div>

      {/* Support Women banner */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-r from-[#8B1E3F] to-[#B33A5A] rounded-xl p-4 flex items-center justify-between overflow-hidden relative">
          <div className="z-10">
            <p className="text-white font-bold text-base leading-snug">
              Support Women<br />Buy Local, Build<br />Stronger India
            </p>
            <button
              onClick={() => navigate('/categories')}
              className="text-white text-xs font-semibold mt-2 underline"
            >
              Shop Now &gt;
            </button>
          </div>
          <div className="text-4xl">👩🏽‍🤝‍👩🏽</div>
        </div>
      </div>

      {/* Flash Deals */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-r from-[#C9962C] to-[#8B1E3F] rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-sm">Flat 20% off on Traditional Pickles</p>
            <p className="text-white/80 text-xs mt-1">Ends in 02:15:30</p>
          </div>
          <button
            onClick={() => navigate('/category/pickles')}
            className="bg-white text-[#8B1E3F] text-xs font-semibold px-4 py-2 rounded-lg whitespace-nowrap"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Top Categories */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[#8B1E3F] font-bold text-base">Top Categories</h2>
          <button onClick={() => navigate('/categories')} className="text-[#8B1E3F] text-xs font-semibold">
            See All
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {topCategories.map((cat, i) => (
            <button
              key={cat.slug}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="flex flex-col items-center gap-1.5"
            >
              {getCategoryImage(cat.slug) ? (
                <img
                  src={getCategoryImage(cat.slug)}
                  alt={cat.label}
                  className="w-14 h-14 rounded-full object-cover shadow-sm"
                />
              ) : (
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: tileColors[i % tileColors.length] }}
                />
              )}
              <span className="text-[10px] text-gray-600 text-center leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Near You */}
      <div className="px-4 mt-6">
        <h2 className="text-[#8B1E3F] font-bold text-base mb-3">Near You</h2>
        <div className="bg-white rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm">Nearby sellers will appear here</p>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;