import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

function OtpScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isKnownIdentity } = useAuth();
  const inputsRef = useRef([]);

  const { identity, method = 'phone', from = '/home' } = location.state || {};
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  if (!identity) {
    navigate('/login');
    return null;
  }

  function handleChange(index, value) {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 3) inputsRef.current[index + 1]?.focus();
  }

  function handleVerify() {
    const code = otp.join('');
    if (code.length !== 4) {
      setError('Enter the 4-digit OTP');
      return;
    }
    // Mock verification — any 4-digit code works
    const isNew = !isKnownIdentity(identity);
    if (isNew) {
      navigate('/register', { state: { identity, method, from } });
    } else {
      login({ identity, method, name: '' });
      navigate(from, { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] flex flex-col">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-8 text-center">
        <h1 className="text-white text-xl font-bold">Verify OTP</h1>
        <p className="text-white/80 text-sm mt-1">
          Code sent to {method === 'phone' ? `+91 ${identity}` : identity}
        </p>
      </div>

      <div className="px-4 mt-8">
        <div className="flex justify-center gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-12 h-14 text-center text-lg font-semibold border border-gray-300 rounded-lg outline-none focus:border-[#8B1E3F]"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-xs text-center mt-3">{error}</p>}

        <button
          onClick={handleVerify}
          className="w-full bg-[#8B1E3F] text-white font-semibold py-3 rounded-lg mt-6 text-sm"
        >
          Verify & Continue
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Didn't get a code? <span className="text-[#8B1E3F] font-semibold">Resend</span>
        </p>
      </div>
    </div>
  );
}

export default OtpScreen;