import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgTextile from '../assets/bg_textile.png';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{
        backgroundImage: `url(${bgTextile})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 bg-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-forest flex items-center justify-center rounded-md shadow">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-cream" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" fill="#F5F5DC" stroke="none"/>
              <path d="M12 4c0 0-4 4-4 8s4 8 4 8" stroke="#1B4D3E" strokeWidth="1.5"/>
              <path d="M12 4c0 0 4 4 4 8s-4 8-4 8" stroke="#1B4D3E" strokeWidth="1.5"/>
              <path d="M4 12h16" stroke="#1B4D3E" strokeWidth="1.5"/>
            </svg>
          </div>
          <span className="text-cream text-xl font-bold tracking-wide">Maharogi Seva Samiti</span>
        </div>
        <div className="flex items-center gap-8 text-cream/90 text-sm font-semibold tracking-widest uppercase">
          <a href="#" className="hover:text-burnt transition-colors">Service</a>
          <span className="w-1 h-1 rounded-full bg-cream/40" />
          <a href="#" className="hover:text-burnt transition-colors">Dignity</a>
          <span className="w-1 h-1 rounded-full bg-cream/40" />
          <a href="#" className="hover:text-burnt transition-colors">Empowerment</a>
        </div>
      </nav>

      {/* Main centered card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-md rounded-sm shadow-2xl p-10"
          style={{ backgroundColor: '#F5F2DC' }}
        >
          {/* Tag line */}
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#CC5500', letterSpacing: '0.18em' }}
          >
            The Woven Authority
          </p>

          {/* Heading */}
          <h1
            className="text-4xl font-serif font-bold mb-1"
            style={{ color: '#1B4D3E' }}
          >
            Admin Login
          </h1>
          {/* Orange underline accent */}
          <div
            className="h-1 w-20 mb-8 rounded-full"
            style={{ background: '#CC5500' }}
          />

          <form onSubmit={handleLogin} className="space-y-5">
            {/* User ID */}
            <div>
              <label
                className="block text-base font-bold mb-2"
                style={{ color: '#1B4D3E' }}
              >
                User ID
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3 border-2 rounded-sm bg-white"
                style={{ borderColor: '#c4c9b8' }}
              >
                {/* Person icon */}
                <svg className="w-5 h-5 shrink-0" style={{ color: '#888' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your unique ID"
                  className="flex-1 bg-transparent outline-none text-base font-medium placeholder:text-gray-400"
                  style={{ color: '#1B4D3E', fontSize: '1rem' }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-base font-bold mb-2"
                style={{ color: '#1B4D3E' }}
              >
                Password
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3 border-2 rounded-sm bg-white"
                style={{ borderColor: '#c4c9b8' }}
              >
                {/* Lock icon */}
                <svg className="w-5 h-5 shrink-0" style={{ color: '#888' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none text-base font-medium placeholder:text-gray-500"
                  style={{ color: '#1B4D3E', fontSize: '1rem' }}
                  required
                />
                {/* Eye icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0 outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" style={{ color: '#888' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" style={{ color: '#888' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold hover:underline"
                  style={{ color: '#CC5500' }}
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 text-white text-lg font-bold uppercase tracking-widest flex items-center justify-center gap-2 mt-2 rounded-sm transition-all hover:brightness-110 active:scale-95"
              style={{ backgroundColor: '#B84800', letterSpacing: '0.1em' }}
            >
              Admin Login
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>

          {/* Card footer */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: '#d5d0b8' }}>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
              <svg className="w-4 h-4" style={{ color: '#666' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">Secure encrypted session</span>
            </div>
            <div className="flex items-center gap-4 text-sm font-semibold" style={{ color: '#555' }}>
              <a href="#" className="hover:text-forest transition-colors">Support</a>
              <a href="#" className="hover:text-forest transition-colors">Internal Portal</a>
            </div>
          </div>
        </div>
      </div>

      {/* Page footer */}
      <div className="relative z-10 text-center py-4">
        <p className="text-cream/70 text-xs">
          © 2024 Maharogi Seva Samiti (Anandwan). Committed to Human Dignity through Self-Reliance.
        </p>
      </div>
    </div>
  );
}
