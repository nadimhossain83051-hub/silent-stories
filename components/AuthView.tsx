
import React, { useState } from 'react';
import { User, Gender } from '../types';
import { ShieldCheck, UserCheck, Mail, Lock, Loader2, Ghost } from 'lucide-react';

interface Props {
  platform: any;
  onComplete: () => void;
}

const AuthView: React.FC<Props> = ({ platform, onComplete }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: Gender.PREFER_NOT_TO_SAY,
    displayName: '',
    password: ''
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation
    setTimeout(() => {
      if (isLogin) {
        const user = platform.users.find((u: any) => u.email === formData.email);
        if (user) {
          if (user.isBlocked) {
            alert("This account has been suspended due to safety violations.");
            setLoading(false);
            return;
          }
          platform.login(user);
        } else {
          // Auto-register as admin
          const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            fullName: formData.fullName || 'Admin User',
            email: formData.email,
            gender: Gender.MALE,
            isAdmin: formData.email === 'admin@hindsight.com',
            isBlocked: false,
            createdAt: Date.now(),
            displayName: 'Admin'
          };
          platform.registerUser(newUser);
          platform.login(newUser);
        }
      } else {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          fullName: formData.fullName,
          email: formData.email,
          gender: formData.gender,
          displayName: formData.displayName,
          isAdmin: formData.email === 'admin@hindsight.com',
          isBlocked: false,
          createdAt: Date.now()
        };
        platform.registerUser(newUser);
        platform.login(newUser);
      }
      setLoading(false);
      onComplete();
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-indigo-200">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">{isLogin ? 'স্বাগতম' : 'একাউন্ট খুলুন'}</h2>
        <p className="text-slate-500 mt-2">
          {isLogin ? 'আপনার প্রোফাইলে লগইন করুন।' : 'আমাদের নিরাপদ কমিউনিটিতে যোগ দিন।'}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <form onSubmit={handleAuth} className="space-y-6">
          {!isLogin && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">পুরো নাম (গোপন থাকবে)</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                    placeholder="আপনার আসল নাম লিখুন"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Anonymous Name (বেনামী নাম)</label>
                <div className="relative">
                  <Ghost className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                    placeholder="e.g. Silent Observer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">লিঙ্গ (Avatar-এর জন্য)</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value as Gender})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
                >
                  {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">ইমেইল এড্রেস</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <span>{isLogin ? 'লগইন করুন' : 'একাউন্ট খুলুন'}</span>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            {isLogin ? "একাউন্ট নেই?" : "ইতিমধ্যেই একাউন্ট আছে?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-600 font-bold hover:underline"
            >
              {isLogin ? 'সাইন আপ' : 'লগইন'}
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-xl text-[10px] text-slate-400 leading-relaxed">
          <p>
            <strong>প্রাইভেসি নোট:</strong> আপনার নাম এবং ইমেইল শুধুমাত্র ভেরিফিকেশনের জন্য। এগুলো কখনোই জনসমক্ষে প্রকাশ করা হবে না।
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
