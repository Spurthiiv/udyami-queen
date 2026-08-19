import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

function RegisterScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, rememberIdentity } = useAuth();

  const { identity, method = 'phone', from = '/home' } = location.state || {};
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!identity) {
    navigate('/login');
    return null;
  }

  function handleCreateAccount() {
    if (name.trim().length < 2) {
      setError('Enter your name');
      return;
    }
    rememberIdentity(identity);
    login({ identity, method, name: name.trim() });
    navigate(from, { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] flex flex-col">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-8 text-center">
        <h1 className="text-white text-xl font-bold">Create your account</h1>
        <p className="text-white/80 text-sm mt-1">Just one more step</p>
      </div>

      <div className="px-4 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ramesh Kumar"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
          />
          <p className="text-xs text-gray-400 mt-3">
            {method === 'phone' ? `Phone: +91 ${identity}` : `Email: ${identity}`}
          </p>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <button
            onClick={handleCreateAccount}
            className="w-full bg-[#8B1E3F] text-white font-semibold py-3 rounded-lg mt-4 text-sm"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;