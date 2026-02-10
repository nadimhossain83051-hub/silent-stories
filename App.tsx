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
import { usePlatformState } from './hooks/usePlatformState';
import StoryFeed from './components/StoryFeed';
import StoryForm from './components/StoryForm';
import AdminDashboard from './components/AdminDashboard';
import AuthView from './components/AuthView';
import AboutUs from './components/AboutUs';

type View = 'feed' | 'post' | 'admin' | 'about' | 'auth';

const App: React.FC = () => {
  const platform = usePlatformState();
  const [currentView, setCurrentView] = useState<View>('feed');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  
  // Secret Dev Trigger for Admin Panel access
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
      alert("ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।");
      setAdminPassword('');
    }
  };

  const handleSecretTrigger = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) {
      alert('অ্যাডমিন মোড সক্রিয় হয়েছে! ফুটার থেকে অ্যাডমিন আইকনে ক্লিক করুন।');
      setLogoClicks(0);
    }
  };

  const NavItem = ({ icon: Icon, label, view, active }: any) => (
    <button
      onClick={() => navigate(view)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
        active 
          ? 'bg-indigo-600 text-white shadow-lg' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
      }`}
    >
      <Icon size={18} />
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFE]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => {
              navigate('feed');
              handleSecretTrigger();
            }}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-[0.8rem] flex items-center justify-center text-white shadow-indigo-100 shadow-xl group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              ভুল থেকেই <span className="text-indigo-600">শিক্ষা</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            {isLoggedIn && (
              <NavItem icon={PlusCircle} label="শেয়ার করুন" view="post" active={currentView === 'post'} />
            )}
            {isAdmin && (
              <NavItem icon={LayoutDashboard} label="ড্যাশবোর্ড" view="admin" active={currentView === 'admin'} />
            )}
            <NavItem icon={Info} label="সম্পর্কে" view="about" active={currentView === 'about'} />
            
            <div className="ml-4 pl-4 border-l border-slate-200 flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-black text-slate-800">
                      @{platform.currentUser.displayName || 'Anonymous'}
                    </span>
                    <button 
                      onClick={() => {
                        platform.logout();
                        setIsAdminUnlocked(false);
                      }}
                      className="text-[10px] font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest"
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
                  কমিউনিটিতে যোগ দিন
                </button>
              )}
            </div>
          </nav>

          <div className="flex items-center md:hidden">
            <button 
              className="text-slate-600 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 py-4 px-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
            {isLoggedIn && (
              <NavItem icon={PlusCircle} label="Share Story" view="post" active={currentView === 'post'} />
            )}
            {isAdmin && (
              <NavItem icon={LayoutDashboard} label="Admin" view="admin" active={currentView === 'admin'} />
            )}
            <NavItem icon={Info} label="About" view="about" active={currentView === 'about'} />
            {!isLoggedIn && (
              <button
                onClick={() => navigate('auth')}
                className="w-full bg-indigo-600 text-white px-4 py-3 rounded-xl font-black"
              >
                Join Platform
              </button>
            )}
            {isLoggedIn && (
               <button 
               onClick={() => {
                 platform.logout();
                 setIsAdminUnlocked(false);
               }}
               className="w-full text-left px-4 py-3 text-rose-500 font-black flex items-center border border-rose-100 rounded-xl bg-rose-50/30"
             >
               <LogOut size={18} className="mr-2" /> Logout
             </button>
            )}
          </div>
        )}
      </header>

      {showAdminPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl p-8 text-center border border-slate-100">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
              <LockIcon size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">সুরক্ষিত প্রবেশ</h3>
            <p className="text-sm text-slate-500 mb-8 font-semibold">অ্যাডমিন ড্যাশবোর্ডে যেতে গোপন কোড দিন।</p>
            
            <form onSubmit={handleAdminAuth} className="space-y-4">
              <input 
                type="password"
                autoFocus
                placeholder="••••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-center text-xl font-black tracking-widest focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all"
              />
              <div className="flex space-x-3 pt-2">
                <button 
                  type="button"
                  onClick={() => {
                    setShowAdminPrompt(false);
                    setAdminPassword('');
                  }}
                  className="flex-1 px-4 py-4 rounded-2xl font-black text-slate-400 hover:bg-slate-50 transition-colors uppercase text-xs"
                >
                  বন্ধ করুন
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-slate-900 text-white px-4 py-4 rounded-2xl font-black hover:bg-indigo-600 shadow-xl transition-all uppercase text-xs"
                >
                  প্রবেশ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        {currentView === 'feed' && <StoryFeed platform={platform} onNavigate={navigate} />}
        {currentView === 'post' && (
          isLoggedIn ? (
            <StoryForm platform={platform} onComplete={() => navigate('feed')} />
          ) : (
            <AuthView platform={platform} onComplete={() => navigate('post')} />
          )
        )}
        {currentView === 'admin' && isAdmin && <AdminDashboard platform={platform} />}
        {currentView === 'about' && <AboutUs />}
        {currentView === 'auth' && <AuthView platform={platform} onComplete={() => navigate('feed')} />}
      </main>

      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-8">
          <div className="flex justify-center items-center space-x-2">
            <ShieldCheck className="text-indigo-600" />
            <span className="text-lg font-black text-slate-900">ভুল থেকেই শিক্ষা</span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest max-w-md mx-auto">
            Developed with purpose by <button onClick={() => navigate('about')} className="text-indigo-600 hover:underline">Nadim H Ayan</button>
          </p>
          <div className="flex justify-center items-center space-x-6">
            <button 
              onClick={() => setShowAdminPrompt(true)}
              className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:text-indigo-600 hover:border-indigo-200 transition-all"
              aria-label="Admin Access"
            >
              ©
            </button>
          </div>
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">
            ২০২৪-২০২৫ ভুল থেকেই শিক্ষা। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;