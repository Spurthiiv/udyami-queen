import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../features/cart/CartContext';

function CartIcon() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  if (location.pathname === '/' || location.pathname === '/cart') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '1rem',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 200,
        pointerEvents: 'none',
      }}
    >
      <div style={{ width: '100%', maxWidth: '448px', position: 'relative' }}>
        <button
          onClick={() => navigate('/cart')}
          style={{
            position: 'absolute',
            top: 0,
            right: '1rem',
            background: '#1e3a5f',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
            pointerEvents: 'auto',
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>🛒</span>
          {itemCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#D4A934',
                color: '#1e3a5f',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default CartIcon;