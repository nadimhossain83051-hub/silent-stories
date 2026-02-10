import React, { useState } from 'react';
import { Search, AlertCircle, Lock, UserPlus, LogIn } from 'lucide-react';
import { Story, Category } from '../types.ts';
import StoryCard from './StoryCard.tsx';

interface Props {
  platform: any;
  onNavigate: (view: any) => void;
}

const StoryFeed: React.FC<Props> = ({ platform, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const isLoggedIn = !!platform.currentUser;

  const filteredStories = platform.stories.filter((story: Story) => {
    const matchesCategory = activeCategory === 'All' || story.category === activeCategory;
    const matchesSearch = 
      story.mistake.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.lessons.toLowerCase().includes(searchTerm.toLowerCase());
    const isPublic = story.status === 'published';
    return matchesCategory && matchesSearch && isPublic;
  });

  return (
    <div className="space-y-8">
      {/* Blue Hero Section */}
      {!isLoggedIn && (
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center gap-10">
          <div className="max-w-2xl relative z-10 flex-grow space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">ভুল থেকেই শিক্ষা।</h2>
            <p className="text-indigo-100 text-lg leading-relaxed">
              আপনার জীবনের কঠিন অভিজ্ঞতাগুলো শেয়ার করুন সম্পূর্ণ বেনামে। অন্যের ভুল থেকে শিক্ষা নিন এবং নিজের গল্পে অন্যকে অনুপ্রাণিত করুন।
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 inline-block text-left w-full md:w-auto">
               <div className="flex items-center space-x-4 mb-2">
                 <div className="bg-white p-2 rounded-xl text-indigo-700">
                   <Lock size={24} />
                 </div>
                 <h3 className="text-xl font-bold">গল্পগুলো পড়তে লগইন করুন</h3>
               </div>
               <p className="text-sm text-indigo-100">সব স্টোরি পড়তে এবং নিজের গল্প শেয়ার করতে আজই যোগ দিন।</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => onNavigate('auth')}
                className="bg-white text-indigo-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl flex items-center justify-center space-x-2 transform hover:-translate-y-1"
              >
                <UserPlus size={22} />
                <span>একাউন্ট খুলুন</span>
              </button>
              <button 
                onClick={() => onNavigate('auth')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
              >
                <LogIn size={22} />
                <span>লগইন করুন</span>
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block relative z-10 opacity-20">
            <Lock size={200} />
          </div>

          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute left-20 -top-10 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl"></div>
        </div>
      )}

      {/* Main Feed Logic */}
      {isLoggedIn && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="relative group max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Search lessons or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-slate-800 text-lg placeholder-slate-400 shadow-sm focus:outline-none focus:border-indigo-600 transition-all"
            />
          </div>

          {platform.emergencyMode && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center space-x-3 text-amber-800">
              <AlertCircle className="flex-shrink-0" />
              <p className="text-sm font-medium">
                Platform is currently in read-only mode for safety maintenance. New posts are temporarily paused.
              </p>
            </div>
          )}

          <div className="relative">
            <div className="flex overflow-x-auto whitespace-nowrap gap-3 pb-4 no-scrollbar scroll-smooth">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex-shrink-0 ${
                  activeCategory === 'All' 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600'
                }`}
              >
                All Topics
              </button>
              {platform.categories.map((cat: Category) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex-shrink-0 ${
                    activeCategory === cat.name
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#f8fafc] to-transparent pointer-events-none md:hidden"></div>
          </div>

          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredStories.map((story: Story) => (
                <StoryCard key={story.id} story={story} platform={platform} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-3xl border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-slate-200" size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No stories found</h3>
              <p className="text-slate-500">Try searching for other keywords.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryFeed;