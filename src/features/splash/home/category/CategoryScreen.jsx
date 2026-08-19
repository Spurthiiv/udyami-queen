import { useParams, useNavigate } from 'react-router-dom';
import { products, stockLabels } from '../../../../data/products';
import { getProductImage } from '../../../../utils/productImages';

function CategoryScreen() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const categoryProducts = Object.values(products).filter(
    (p) => p.category === categoryName
  );

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <div className="bg-[#0F2A4A] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold capitalize">{categoryName.replace(/-/g, ' ')}</h1>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-3">
        {categoryProducts.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-10">No products in this category yet</p>
        )}
        {categoryProducts.map((p) => {
          const stockInfo = stockLabels[p.stock] || stockLabels.in_stock;
          return (
            <button
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3 text-left"
            >
              {getProductImage(p.id) ? (
  <img src={getProductImage(p.id)} alt={p.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
) : (
  <div className={`w-14 h-14 rounded-lg ${p.color} flex-shrink-0`} />
)}
              <div className="flex-1">
                <p className="text-[#0F2A4A] font-medium">{p.name}</p>
                <p className="text-gray-400 text-xs">{p.seller} • {p.ward}</p>
                <p className="text-gray-400 text-xs">★ {p.rating} • <span className={stockInfo.color}>{stockInfo.text}</span></p>
              </div>
              <p className="text-[#D4A934] font-semibold">₹{p.price}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryScreen;