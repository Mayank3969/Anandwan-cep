import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="bg-white p-12 w-full max-w-md border-4 border-forest shadow-[12px_12px_0px_#1B4D3E]">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-forest-dark">MSS</h1>
          <p className="text-forest mt-2 font-bold uppercase tracking-widest text-sm">Archival System</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-forest-dark font-bold mb-2 text-lg">Staff ID</label>
            <input 
              type="text" 
              className="w-full bg-cream p-4 border-b-4 border-forest focus:outline-none focus:border-burnt text-xl font-bold transition-colors"
              placeholder="Enter ID"
              required
            />
          </div>
          <div>
            <label className="block text-forest-dark font-bold mb-2 text-lg">Passcode</label>
            <input 
              type="password" 
              className="w-full bg-cream p-4 border-b-4 border-forest focus:outline-none focus:border-burnt text-xl font-bold transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-burnt hover:bg-burnt-dark text-white font-bold text-xl py-5 px-6 mt-8 transition-colors uppercase tracking-widest"
          >
            Access System
          </button>
        </form>
      </div>
    </div>
  );
}
