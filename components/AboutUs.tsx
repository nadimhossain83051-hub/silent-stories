
import React from 'react';
import { PLATFORM_MAINTAINER } from '../constants';
import { ShieldCheck, EyeOff, BookOpen, Heart, Twitter, Facebook, Linkedin } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-16 py-8">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-slate-900">ভুল থেকেই শিক্ষা কেন প্রয়োজন?</h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          অভিজ্ঞতা সেরা শিক্ষক, তবে অন্যের অভিজ্ঞতা থেকে শিক্ষা নেওয়া হলো সবচাইতে বুদ্ধিমত্তার কাজ।
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
            <EyeOff />
          </div>
          <h3 className="font-bold text-slate-900 mb-3">সম্পূর্ণ বেনামী</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            আপনার আসল পরিচয় সবার থেকে গোপন রাখা হয়, যাতে আপনি বিচার হওয়ার ভয় ছাড়াই খোলাখুলি কথা বলতে পারেন।
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
            <ShieldCheck />
          </div>
          <h3 className="font-bold text-slate-900 mb-3">যাচাইকৃত নিরাপত্তা</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            অভ্যন্তরীণভাবে পরিচয় যাচাই করার মাধ্যমে আমরা দায়বদ্ধতা নিশ্চিত করি, আর আমাদের AI সিস্টেম ক্ষতিকারক কনটেন্ট থেকে পাঠকদের রক্ষা করে।
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-6">
            <BookOpen />
          </div>
          <h3 className="font-bold text-slate-900 mb-3">শিক্ষামূলক লক্ষ্য</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            আমরা শুধু গালগল্পের বাইরে যেতে চাই। প্রতিটি পোস্ট এমনভাবে সাজানো যাতে কমিউনিটির উন্নতির জন্য মূল শিক্ষাগুলো বেরিয়ে আসে।
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Heart className="mr-3 text-rose-500" fill="currentColor" /> আমাদের লক্ষ্য
          </h3>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            সোশ্যাল মিডিয়ায় দেখানো মানুষের 'পারফেক্ট' জীবনের বিপরীতে একটি বিকল্প হিসেবে 'ভুল থেকেই শিক্ষা' তৈরি করা হয়েছে। আমরা এমন একটি জায়গা চেয়েছি যেখানে মানুষের ভুল, ব্যর্থতা এবং সেই ব্যর্থতা থেকে অর্জিত সুন্দর শিক্ষাগুলোকে সম্মান জানানো হবে।
          </p>
          <p className="text-indigo-300 font-medium">
            শেয়ার করা প্রজ্ঞার মাধ্যমে ১,০০০+ মানুষকে জীবনের বড় ভুলগুলো এড়াতে সাহায্য করছে।
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Maintainer */}
      <div className="flex flex-col md:flex-row items-center gap-12 pt-8">
        <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 rotate-3">
          <img src={PLATFORM_MAINTAINER.image} alt={PLATFORM_MAINTAINER.name} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-4">
          <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Leadership</div>
          <h3 className="text-2xl font-bold text-slate-900">{PLATFORM_MAINTAINER.name}</h3>
          <p className="text-slate-500 leading-relaxed">{PLATFORM_MAINTAINER.bio}</p>
          <div className="flex space-x-4">
            <a href={PLATFORM_MAINTAINER.socials.twitter} className="text-slate-400 hover:text-indigo-600 transition-colors"><Twitter size={20} /></a>
            <a href={PLATFORM_MAINTAINER.socials.facebook} className="text-slate-400 hover:text-indigo-600 transition-colors"><Facebook size={20} /></a>
            <a href={PLATFORM_MAINTAINER.socials.linkedin} className="text-slate-400 hover:text-indigo-600 transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
