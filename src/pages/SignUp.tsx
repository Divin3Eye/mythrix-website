import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = 'https://app.mythrixai.xyz';
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden antialiased">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/[0.08] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="text-xl font-bold tracking-tighter text-white">Mythrix</span>
        </div>

        <h1 className="text-3xl font-medium tracking-tight text-white text-center mb-2">Create your account</h1>
        <p className="text-sm text-zinc-400 text-center mb-8">Start your deep reasoning workspace</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={6}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
            minLength={6}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-xl px-5 py-4 flex items-center justify-center hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-zinc-500 text-center mt-6">
          Already have an account?{' '}
          <button onClick={() => navigate('/signin')} className="text-zinc-300 hover:text-white font-medium transition-colors">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
