import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Infinity } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // Assuming backend returns a token in `data.token`
      if (data.token) {
        localStorage.setItem('token', data.token);
        if (data.admin) {
          localStorage.setItem('admin', JSON.stringify(data.admin));
        }
        toast.success('Welcome back!');
        navigate('/');
      } else {
        throw new Error('No valid token received');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse delay-1000"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-stone-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-stone-800 animate-in slide-in-from-bottom-8 duration-700 fade-in">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Infinity size={36} className="text-white" strokeWidth={2.5} />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
            <p className="text-stone-400 font-medium">Log in to manage your store</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-stone-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-500 group-focus-within:text-indigo-400 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-stone-900/80 border border-stone-700/50 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-white placeholder-stone-500 outline-none transition-all"
                  placeholder="admin@spodut.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-stone-300 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-500 group-focus-within:text-indigo-400 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-stone-900/80 border border-stone-700/50 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-white placeholder-stone-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-400 hover:to-fuchsia-400 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-stone-500 relative">
            <span className="relative z-10 bg-stone-900/50 px-4">Secure Authentication</span>
            <div className="absolute left-0 top-1/2 w-full h-[1px] bg-stone-800 -z-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
