import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import heroIllustration from '../../assets/hero-illustration.png';

function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF6F0] flex flex-col items-center px-6 pt-10 pb-8">
      {/* Logo */}
      <div className="flex flex-col items-center mt-2">
        <img src={logo} alt="Udyami Queens" className="w-20 h-20 object-contain" />
        <h1 className="text-[#8B1E3F] font-bold text-xl mt-2 tracking-wide">UDYAMI</h1>
        <p className="text-[#C9962C] text-xs tracking-[0.3em] -mt-1 font-semibold">QUEENS</p>
      </div>

      {/* Illustration */}
      <div className="w-full flex justify-center mt-6 mb-4">
        <img src={heroIllustration} alt="Women entrepreneurs" className="w-56 h-56 object-contain" />
      </div>

      {/* Text */}
      <div className="text-center mt-2">
        <h2 className="text-[#8B1E3F] font-bold text-2xl leading-tight">Welcome to</h2>
        <h2 className="text-[#8B1E3F] font-bold text-2xl mb-3 leading-tight">Udyami Queens</h2>
        <p className="text-gray-500 text-sm px-4">
          Discover homemade & local products by women entrepreneurs near you.
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full mt-auto pt-10 flex flex-col gap-3">
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-[#8B1E3F] text-white font-semibold py-3 rounded-full text-sm"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate('/login')}
          className="w-full border border-[#8B1E3F] text-[#8B1E3F] font-semibold py-3 rounded-full text-sm"
        >
          Login / Sign In
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 mt-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E3F]"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
      </div>
    </div>
  );
}

export default SplashScreen;