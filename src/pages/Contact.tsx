import React, { useState } from 'react';
import MarketingLayout from '../components/MarketingLayout';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <MarketingLayout>
      <div className="relative z-10 flex flex-col items-center pt-32 px-6 md:px-16 pb-32 w-full max-w-2xl mx-auto text-center flex-grow">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
          Get Early Access
        </h1>
        <p className="text-lg text-zinc-400 font-light leading-relaxed mb-12">
          Join the waitlist to get priority access to Mythrix's premium research workspace. Or, sign in to your existing account.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address" 
            required
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
          />
          <button 
            type="submit" 
            className="w-full bg-white text-black font-semibold rounded-xl px-5 py-4 flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            Request Access <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-16">
          <p className="text-sm text-zinc-500 mb-4">Already have an account?</p>
          <button onClick={() => navigate('/signin')} className="text-zinc-300 hover:text-white font-medium transition-colors">
            Sign In to Workspace
          </button>
        </div>
      </div>
    </MarketingLayout>
  );
}
