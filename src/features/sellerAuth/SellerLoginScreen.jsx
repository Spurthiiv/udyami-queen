import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSellerAuth } from './SellerAuthContext';

function SellerLoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isKnownSeller } = useSellerAuth();
  const returnTo = location.state?.from || '/seller/dashboard';

  const [method, setMethod] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handlePhoneContinue() {
    if (phone.trim().length !== 10) {
      setError('Enter a valid 10-digit phone number');
      return;
    }
    setError('');
    navigate('/seller/otp', { state: { identity: phone, method: 'phone', from: returnTo } });
  }

  function handleEmailContinue() {
    if (!email.includes('@')) {
      setError('Enter a valid email address');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    setError('');
    const isNew = !isKnownSeller(email);
    if (isNew) {
      navigate('/seller/register', { state: { identity: email, method: 'email', from: returnTo } });
    } else {
      navigate('/seller/otp', {
        state: { identity: email, method: 'email', from: returnTo, skipOtp: true },
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] flex flex-col">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-8 text-center">
        <h1 className="text-white text-xl font-bold">Queen Seller Login</h1>
        <p className="text-white/80 text-sm mt-1">Sign in to manage your shop</p>
      </div>

      <div className="px-4 mt-6 flex-1">
        <div className="flex bg-white rounded-xl p-1 mb-5 shadow-sm">
          <button
            onClick={() => { setMethod('phone'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
              method === 'phone' ? 'bg-[#8B1E3F] text-white' : 'text-gray-500'
            }`}
          >
            📱 Phone
          </button>
          <button
            onClick={() => { setMethod('email'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
              method === 'email' ? 'bg-[#8B1E3F] text-white' : 'text-gray-500'
            }`}
          >
            ✉️ Email
          </button>
        </div>

        {method === 'phone' ? (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
              <span className="text-gray-500 text-sm mr-2">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="98765 43210"
                className="flex-1 outline-none text-sm"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <button
              onClick={handlePhoneContinue}
              className="w-full bg-[#8B1E3F] text-white font-semibold py-3 rounded-lg mt-4 text-sm"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="text-xs text-gray-500 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none mb-3"
            />
            <label className="text-xs text-gray-500 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <button
              onClick={handleEmailContinue}
              className="w-full bg-[#8B1E3F] text-white font-semibold py-3 rounded-lg mt-4 text-sm"
            >
              Continue
            </button>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          New Queen Seller?{' '}
          <span
            className="text-[#8B1E3F] font-semibold cursor-pointer"
            onClick={() => navigate('/seller/register')}
          >
            Register your shop
          </span>
        </p>
      </div>
    </div>
  );
}

export default SellerLoginScreen;