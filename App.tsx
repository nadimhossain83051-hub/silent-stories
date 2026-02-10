
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

  const isAdmin = (platform.currentUser?.isAdmin) || isAdminUnlocked;
  const isLoggedIn = !!platform.currentUser;

  const navigate = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
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

  const NavItem = ({ icon: Icon, label, view, active }: any) => (
    <button
      onClick={() => navigate(view)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate('feed')}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight block">
              ভুল থেকেই শিক্ষা
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2">
            {isLoggedIn && (
              <NavItem icon={PlusCircle} label="Share Story" view="post" active={currentView === 'post'} />
            )}
            {isAdmin && (
              <NavItem icon={LayoutDashboard} label="Admin" view="admin" active={currentView === 'admin'} />
            )}
            <NavItem icon={Info} label="About" view="about" active={currentView === 'about'} />
            
            <div className="ml-4 pl-4 border-l border-slate-200 flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-slate-800">
                      {platform.currentUser.displayName || 'Anonymous'}
                    </span>
                    <button 
                      onClick={() => {
                        platform.logout();
                        setIsAdminUnlocked(false);
                      }}
                      className="text-xs text-slate-400 hover:text-red-500 flex items-center"
                    >
                      <LogOut size={12} className="mr-1" /> Logout
                    </button>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                    <UserIcon size={16} className="text-slate-400" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate('auth')}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Join Platform
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              className="text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 py-4 px-4 space-y-2">
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
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium"
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
               className="w-full text-left px-4 py-2 text-red-500 font-medium flex items-center"
             >
               <LogOut size={18} className="mr-2" /> Logout
             </button>
            )}
          </div>
        )}
      </header>

      {/* Admin Login Modal */}
      {showAdminPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-6">
                <LockIcon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">সুরক্ষিত প্রবেশ</h3>
              <p className="text-sm text-slate-500 mb-6">পরবর্তী ধাপে যেতে গোপন পাসকোড প্রদান করুন।</p>
              
              <form onSubmit={handleAdminAuth} className="space-y-4">
                <input 
                  type="password"
                  autoFocus
                  placeholder="পাসওয়ার্ড"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                />
                <div className="flex space-x-3">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAdminPrompt(false);
                      setAdminPassword('');
                    }}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    বন্ধ করুন
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                  >
                    যাচাই করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
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

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheck className="text-indigo-600" />
              <span className="text-lg font-bold text-slate-900">ভুল থেকেই শিক্ষা</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              স্বচ্ছতার মাধ্যমে মানুষের ব্যক্তিগত ও সামাজিক উন্নয়নে প্রতিশ্রুতিবদ্ধ একটি কমিউনিটি। আপনার ভুলগুলো বেনামে শেয়ার করুন এবং অন্যদের সঠিক পথ খুঁজে পেতে সাহায্য করুন।
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('feed')} className="text-slate-500 hover:text-indigo-600">Home</button></li>
              <li><button onClick={() => navigate('post')} className="text-slate-500 hover:text-indigo-600">Share Your Experience</button></li>
              <li><button onClick={() => navigate('about')} className="text-slate-500 hover:text-indigo-600">Platform Transparency</button></li>
              <li><button onClick={() => navigate('about')} className="text-slate-500 hover:text-indigo-600">Safety & Ethics</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-indigo-600 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-indigo-600 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              <button 
                onClick={() => setShowAdminPrompt(true)}
                className="hover:text-indigo-400 transition-colors focus:outline-none"
                aria-label="Admin Login"
              >
                ©
              </button>
              {new Date().getFullYear()} ভুল থেকেই শিক্ষা। All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
