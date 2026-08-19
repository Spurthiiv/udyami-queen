import { useNavigate, useLocation } from 'react-router-dom';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: 'Home', path: '/home', icon: '🏠' },
    { label: 'Categories', path: '/categories', icon: '▦' },
    { label: 'Orders', path: '/orders', icon: '🧾' },
    { label: 'Wishlist', path: '/wishlist', icon: '♡' },
    { label: 'Profile', path: '/profile', icon: '👤' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '448px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          background: '#ffffff',
          borderTop: '1px solid #e5e5e5',
          padding: '0.5rem 0',
        }}
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                color: isActive ? '#8B1E3F' : '#999',
                fontWeight: isActive ? 'bold' : 'normal',
                fontSize: '0.65rem',
                gap: '2px',
              }}
            >
              <span style={{ fontSize: '1.15rem' }}>{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNav;