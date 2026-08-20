import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { loginHeroImage } from '../../utils/heroImage';
import logo from '../../assets/logo.png';

/* ICONS */

function PhoneIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.08 5.18A2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LockIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function UserIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

function EyeIcon({ hidden = false, className = '' }) {
  if (hidden) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <path d="M3 3l18 18" />
        <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
        <path d="M9.88 4.24A10.94 10.94 0 0 1 12 4c5 0 8.27 4 9.5 6a17.7 17.7 0 0 1-3.12 3.73" />
        <path d="M6.61 6.61A17.7 17.7 0 0 0 2.5 10c1.23 2 4.5 6 9.5 6a10.94 10.94 0 0 0 2.12-.24" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
      <path d="M12 3l7 3v5c0 4.7-3 8.4-7 10-4-1.6-7-5.3-7-10V6l7-3z" />
      <path d="M8.5 12l2.2 2.2 4.8-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WomenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
      <circle cx="12" cy="7" r="3.2" />
      <path d="M6 20a6 6 0 0 1 12 0" strokeLinecap="round" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
      <path d="M20.8 8.7c0 5.2-8.8 10.3-8.8 10.3S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6z" />
    </svg>
  );
}

/* LOGIN SCREEN */

function LoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isKnownIdentity } = useAuth();
  const returnTo = location.state?.from || '/home';

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function handlePasswordLogin() {
    if (phone.trim().length !== 10) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }
    if (password.trim().length < 4) {
      setError('Enter your password');
      return;
    }
    setError('');
    const isNew = !isKnownIdentity(phone);
    if (isNew) {
      navigate('/register', { state: { identity: phone, method: 'phone', from: returnTo } });
      return;
    }
    login({ identity: phone, method: 'phone', name: '' });
    navigate(returnTo, { replace: true });
  }

  function handleOtpInstead() {
    if (phone.trim().length !== 10) {
      setError('Enter a valid 10-digit mobile number to continue with OTP');
      return;
    }
    setError('');
    navigate('/otp', { state: { identity: phone, method: 'phone', from: returnTo } });
  }

  function handleCreateAccount() {
    navigate('/register', { state: { identity: phone, method: 'phone', from: returnTo } });
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FFF8F5]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFFDFC] via-[#FFF7F4] to-[#FDECEF]">
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 pt-8">
          <img src={logo} alt="Udyami Queens" className="h-12 w-12 object-contain" />
          <div className="leading-none">
            <div className="text-lg font-bold text-[#8B1E3F]">Udyami</div>
            <div className="mt-0.5 text-lg font-bold text-[#8B1E3F]">Queens</div>
          </div>
        </div>

        {/* Welcome */}
        <div className="px-6 pt-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm text-[#6b6b68]">Welcome to</span>
            <span className="h-px w-10 bg-[#C9962C]/70" />
            <span className="text-sm text-[#C9962C]">♛</span>
          </div>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-[#8B1E3F]">
            Udyami<br />Queens
          </h1>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#6b6b68]">
            Discover homemade & local products by women entrepreneurs near you.
          </p>
        </div>

        {/* Hero image */}
        <div className="relative mt-6 h-56 w-full overflow-hidden">
          {loginHeroImage ? (
            <img
              src={loginHeroImage}
              alt="Women entrepreneurs of Udyami Queens"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#F9DED7] to-[#F7CBD9]" />
          )}
        </div>
      </section>

      {/* LOGIN CARD */}
      <section className="relative z-10 -mt-8 px-4 pb-8">
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-[#F0E4E6] bg-white shadow-[0_20px_50px_-15px_rgba(139,30,63,0.25)]">
          <div className="px-6 pt-9">
            <div className="mb-7 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-[#8B1E3F]">Login / Sign In</h2>
              <p className="mt-1.5 text-sm text-[#9a9a97]">Welcome back! Please login to continue</p>
            </div>

            {/* Mobile number */}
            <div className="mb-4">
              <label className="mb-1.5 flex items-center text-[13px] font-medium text-[#4a4a47]">
                <PhoneIcon className="mr-1.5 h-4 w-4" />
                Mobile Number
              </label>
              <div className="flex items-center rounded-xl border border-gray-200 px-3.5 py-3 transition-colors focus-within:border-[#8B1E3F]">
                <PhoneIcon className="mr-2.5 h-4.5 w-4.5 flex-shrink-0 text-gray-400" />
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ''));
                    if (error) setError('');
                  }}
                  placeholder="Enter your mobile number"
                  className="w-full bg-transparent text-sm text-[#33343D] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-2">
              <div className="mb-1.5 flex items-center justify-between">
                <label className="flex items-center text-[13px] font-medium text-[#4a4a47]">
                  <UserIcon className="mr-1.5 h-4 w-4" />
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs font-semibold text-[#8B1E3F] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="flex items-center rounded-xl border border-gray-200 px-3.5 py-3 transition-colors focus-within:border-[#8B1E3F]">
                <LockIcon className="mr-2.5 h-4.5 w-4.5 flex-shrink-0 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm text-[#33343D] outline-none placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="ml-2 flex h-7 w-7 flex-shrink-0 items-center justify-center text-gray-400"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon hidden={showPassword} className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-2 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2">
                <span className="text-sm text-red-500">!</span>
                <p className="text-xs text-red-500">{error}</p>
              </div>
            )}

            <button
              type="button"
              onClick={handlePasswordLogin}
              className="mt-4 h-13 w-full rounded-full bg-[#8B1E3F] py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#731832]"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleOtpInstead}
              className="mx-auto mt-3.5 block text-xs font-semibold text-[#8B1E3F] hover:underline"
            >
              Login with OTP instead
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Social */}
            <div className="mb-7 flex justify-center gap-4">
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-gray-300"
                aria-label="Continue with Google"
              >
                <span className="text-lg font-bold text-[#4285F4]">G</span>
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-gray-300"
                aria-label="Continue with Facebook"
              >
                <span className="text-xl font-bold text-[#1877F2]">f</span>
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-gray-300"
                aria-label="Continue with Email"
              >
                <span className="text-lg text-gray-600">✉</span>
              </button>
            </div>
          </div>

          {/* Create account */}
          <div className="flex flex-col items-center justify-center gap-3 border-t border-gray-100 px-6 py-6 text-[13px]">
            <span className="text-gray-500">New to Udyami Queens?</span>
            <button
              type="button"
              onClick={handleCreateAccount}
              className="rounded-full border border-[#8B1E3F] bg-white px-4 py-1.5 font-semibold text-[#8B1E3F] transition-colors hover:bg-[#8B1E3F] hover:text-white"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="px-4 pb-10">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-4 rounded-2xl bg-[#FCEAEA] px-4 py-6">
          <div className="flex items-center justify-center gap-2.5 text-[#8B1E3F]">
            <ShieldIcon />
            <div className="flex flex-col leading-tight">
              <strong className="text-xs font-semibold">Trusted</strong>
              <span className="text-xs">& Safe</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-[#8B1E3F]">
            <WomenIcon />
            <div className="flex flex-col leading-tight">
              <strong className="text-xs font-semibold">Support Women</strong>
              <span className="text-xs">Entrepreneurs</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-[#8B1E3F]">
            <LocationIcon />
            <div className="flex flex-col leading-tight">
              <strong className="text-xs font-semibold">Local to</strong>
              <span className="text-xs">Your Area</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-[#8B1E3F]">
            <HeartIcon />
            <div className="flex flex-col leading-tight">
              <strong className="text-xs font-semibold">Empowering</strong>
              <span className="text-xs">Communities</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginScreen;