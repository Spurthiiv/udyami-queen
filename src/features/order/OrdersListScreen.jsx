import { useNavigate } from 'react-router-dom';

const orders = [
  { id: 'ORD-1042', item: 'Traditional Mango Pickle (500g)', seller: 'Lakshmi Kitchen', status: 'Delivered', date: 'Aug 2', total: '₹280' },
  { id: 'ORD-1038', item: 'Organic Ragi Flour (2kg)', seller: 'Kaveri Farm Store', status: 'Out for Delivery', date: 'Aug 5', total: '₹190' },
  { id: 'ORD-1029', item: 'Filter Coffee Powder (250g)', seller: 'Sundari Coffee House', status: 'Delivered', date: 'Jul 28', total: '₹250' },
];

const statusColor = {
  Delivered: 'text-green-600 bg-green-50',
  'Out for Delivery': 'text-amber-600 bg-amber-50',
  Cancelled: 'text-red-500 bg-red-50',
};

function OrdersListScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-5">
        <h1 className="text-white font-semibold text-lg">My Orders</h1>
      </div>

      <div className="px-4 mt-4">
        {orders.map((o) => (
          <button
            key={o.id}
            onClick={() => navigate('/order-detail', { state: { orderId: o.id } })}
            className="w-full text-left bg-white rounded-xl shadow-sm p-4 mb-3 block"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#8B1E3F] font-semibold text-sm">{o.item}</p>
                <p className="text-gray-400 text-xs mt-0.5">{o.seller} · {o.date}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap ${statusColor[o.status]}`}>
                {o.status}
              </span>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">{o.id}</span>
              <span className="text-sm font-semibold text-[#8B1E3F]">{o.total}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default OrdersListScreen;