import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PlusCircle, 
  LayoutDashboard, 
  LogOut, 
  User as UserIcon,
  Info,
  Menu,
  X,
  Lock as LockIcon
} from 'lucide-react';
import { usePlatformState } from './hooks/usePlatformState.ts';
import StoryFeed from './components/StoryFeed.tsx';
import StoryForm from './components/StoryForm.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import AuthView from './components/AuthView.tsx';
import AboutUs from './components/AboutUs.tsx';

type View = 'feed' | 'post' | 'admin' | 'about' | 'auth';

const App: React.FC = () => {
  const platform = usePlatformState();
  const [currentView, setCurrentView] = useState<View>('feed');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const isAdmin = (platform.currentUser?.isAdmin) || isAdminUnlocked;
  const isLoggedIn = !!platform.currentUser;

  const navigate = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === '@nAdIm78789800@') {
      setIsAdminUnlocked(true);
      setShowAdminPrompt(false);
      setAdminPassword('');
      navigate('admin');
    } else {
      alert("ভুল পাসওয়ার্ড। দয়া করে সঠিক কোড দিন।");
      setAdminPassword('');
    }
  };

  const handleSecretTrigger = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) {
      alert('অ্যাডমিন মোড সক্রিয় হয়েছে! এখন নিচের Copyright আইকনে ক্লিক করে প্রবেশ করতে পারেন।');
      setLogoClicks(0);
    }
  };

  const NavItem = ({ icon: Icon, label, view, active }: any) => (
    <button
      onClick={() => navigate(view)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
        active 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
      }`}
    >
      <Icon size={18} />
      <span className="font-bold text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfe]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => { navigate('feed'); handleSecretTrigger(); }}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              ভুল থেকেই <span className="text-indigo-600">শিক্ষা</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            {isLoggedIn && <NavItem icon={PlusCircle} label="শেয়ার করুন" view="post" active={currentView === 'post'} />}
            {isAdmin && <NavItem icon={LayoutDashboard} label="ড্যাশবোর্ড" view="admin" active={currentView === 'admin'} />}
            <NavItem icon={Info} label="সম্পর্কে" view="about" active={currentView === 'about'} />
            
            <div className="ml-4 pl-4 border-l border-slate-200 flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-800">@{platform.currentUser.displayName || 'Anonymous'}</p>
                    <button 
                      onClick={() => { platform.logout(); setIsAdminUnlocked(false); }} 
                      className="text-[10px] text-rose-500 font-bold uppercase hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                    <UserIcon size={18} />
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => navigate('auth')} 
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-sm hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100 active:scale-95"
                >
                  যোগ দিন
                </button>
              )}
            </div>
          </nav>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 py-4 px-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
            {isLoggedIn && <NavItem icon={PlusCircle} label="Share Story" view="post" active={currentView === 'post'} />}
            {isAdmin && <NavItem icon={LayoutDashboard} label="Admin Dashboard" view="admin" active={currentView === 'admin'} />}
            <NavItem icon={Info} label="About" view="about" active={currentView === 'about'} />
            {!isLoggedIn && (
              <button onClick={() => navigate('auth')} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">Join Community</button>
            )}
            {isLoggedIn && (
              <button onClick={() => { platform.logout(); setIsAdminUnlocked(false); }} className="w-full text-rose-500 font-bold py-3 border border-rose-100 rounded-xl bg-rose-50/30">Logout</button>
            )}
          </div>
        )}
      </header>

      {showAdminPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm p-8 text-center shadow-2xl border border-slate-100">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
              <LockIcon size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">সুরক্ষিত প্রবেশ</h3>
            <p className="text-xs text-slate-500 font-bold mb-8 uppercase tracking-widest">Administrator Only</p>
            <form onSubmit={handleAdminAuth} className="space-y-4">
              <input 
                type="password" 
                autoFocus 
                placeholder="গোপন কোড লিখুন" 
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center text-xl font-black tracking-widest focus:ring-4 focus:ring-indigo-600/10 focus:outline-none transition-all"
              />
              <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">প্রবেশ করুন</button>
              <button type="button" onClick={() => setShowAdminPrompt(false)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600">বন্ধ করুন</button>
            </form>
          </div>
        </div>
      )}

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        {currentView === 'feed' && <StoryFeed platform={platform} onNavigate={navigate} />}
        {currentView === 'post' && (isLoggedIn ? <StoryForm platform={platform} onComplete={() => navigate('feed')} /> : <AuthView platform={platform} onComplete={() => navigate('post')} />)}
        {currentView === 'admin' && isAdmin && <AdminDashboard platform={platform} />}
        {currentView === 'about' && <AboutUs />}
        {currentView === 'auth' && <AuthView platform={platform} onComplete={() => navigate('feed')} />}
      </main>

      <footer className="bg-white border-t border-slate-100 py-16 text-center">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <button 
            onClick={() => setShowAdminPrompt(true)} 
            className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 mx-auto hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-90"
          >
            ©
          </button>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">ভুল থেকেই শিক্ষা ২০২৪-২০২৫</p>
          <div className="flex justify-center space-x-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <button onClick={() => navigate('about')} className="hover:text-indigo-600 transition-colors">Privacy Policy</button>
            <button onClick={() => navigate('about')} className="hover:text-indigo-600 transition-colors">Safety Guidelines</button>
            <button onClick={() => navigate('about')} className="hover:text-indigo-600 transition-colors">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;