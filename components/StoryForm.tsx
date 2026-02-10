
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Lock, 
  Loader2,
  ChevronDown
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Gender } from '../types';

interface Props {
  platform: any;
  onComplete: () => void;
}

const StoryForm: React.FC<Props> = ({ platform, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    mistake: '',
    reason: '',
    outcome: '',
    lessons: '',
    allowComments: true,
    useDisplayName: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      alert("দয়া করে একটি ক্যাটাগরি নির্বাচন করুন।");
      return;
    }
    
    if (platform.emergencyMode) {
      alert("Posting is temporarily disabled.");
      return;
    }

    setLoading(true);

    // AI Analysis
    const combinedContent = `Mistake: ${formData.mistake}\nReason: ${formData.reason}\nOutcome: ${formData.outcome}\nLessons: ${formData.lessons}`;
    const analysis = await geminiService.analyzeStory(combinedContent);

    const story = {
      id: Math.random().toString(36).substr(2, 9),
      userId: platform.currentUser.id,
      authorName: formData.useDisplayName ? (platform.currentUser.displayName || 'Anonymous') : 'Anonymous',
      authorGender: platform.currentUser.gender,
      category: formData.category,
      mistake: formData.mistake,
      reason: formData.reason,
      outcome: formData.outcome,
      lessons: formData.lessons,
      advice: '', 
      is18Plus: false, 
      allowComments: formData.allowComments,
      isFlagged: analysis?.isHarmful || false,
      status: (analysis?.isHarmful ? 'pending' : 'published') as any,
      createdAt: Date.now(),
      reactions: { learned: [], relatable: [] },
      aiInsights: analysis?.insights || null
    };

    platform.addStory(story);
    setLoading(false);
    
    if (analysis?.isHarmful) {
      alert("Your story has been flagged for automated review. It will be visible once an administrator reviews it.");
    }
    
    onComplete();
  };

  const labelStyle = "text-sm font-bold text-slate-700 block ml-1 mb-2";
  const textareaStyle = "w-full bg-[#f8fafc] border border-slate-100 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 shadow-sm resize-none text-sm transition-all";

  return (
    <div className="max-w-2xl mx-auto px-2">
      <div className="flex items-center space-x-4 mb-8">
        <button onClick={onComplete} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">আপনার গল্প শেয়ার করুন</h2>
          <p className="text-slate-500 text-sm">অন্যকে ভুল থেকে শিক্ষা নিতে সাহায্য করুন।</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pb-20">
        {/* Identity Toggle */}
        <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between border border-slate-100">
          <div className="flex items-center space-x-3">
            <Lock className="text-indigo-600" size={16} />
            <p className="text-xs font-bold text-slate-800">Identity Protection</p>
          </div>
          <div className="flex bg-white p-1 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, useDisplayName: false })}
              className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                !formData.useDisplayName ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Anonymous
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, useDisplayName: true })}
              className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                formData.useDisplayName ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Anonymous Name
            </button>
          </div>
        </div>

        {/* Category Selection */}
        <div className="space-y-1">
          <label className={labelStyle}>ক্যাটাগরি</label>
          <div className="relative">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-white border border-slate-100 rounded-xl p-3 pr-10 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 appearance-none shadow-sm"
            >
              <option value="" disabled>নির্বাচন করুন...</option>
              {platform.categories.map((cat: any) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Allow Comments Checkbox */}
        <div className="bg-white border border-slate-100 rounded-xl p-3 flex items-center space-x-3 shadow-sm">
          <input
            type="checkbox"
            id="allowComments"
            checked={formData.allowComments}
            onChange={(e) => setFormData({ ...formData, allowComments: e.target.checked })}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="allowComments" className="text-sm font-bold text-slate-600 cursor-pointer">
            মন্তব্য সুযোগ
          </label>
        </div>

        {/* Mistake Section */}
        <div>
          <label className={labelStyle}>আমি কী ভুল করেছিলাম?</label>
          <textarea
            required
            value={formData.mistake}
            onChange={(e) => setFormData({ ...formData, mistake: e.target.value })}
            placeholder="ভুলটি বিস্তারিত লিখুন..."
            className={`${textareaStyle} min-h-[100px]`}
          />
        </div>

        {/* Reason Section */}
        <div>
          <label className={labelStyle}>কেন এই ভুলটি হয়েছিল?</label>
          <textarea
            required
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            placeholder="কারণসমূহ..."
            className={`${textareaStyle} min-h-[100px]`}
          />
        </div>

        {/* Outcome & Lessons Section */}
        <div className="space-y-4">
          <label className={labelStyle}>ফলাফল ও প্রাপ্ত শিক্ষা</label>
          <div className="space-y-3">
            <textarea
              required
              value={formData.outcome}
              onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
              placeholder="জীবন কী প্রভাব পড়েছিল..."
              className={`${textareaStyle} min-h-[80px]`}
            />
            <textarea
              required
              value={formData.lessons}
              onChange={(e) => setFormData({ ...formData, lessons: e.target.value })}
              placeholder="আমি কী শিখেছি..."
              className={`${textareaStyle} min-h-[80px]`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-all shadow-lg active:scale-[0.98] mt-4"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> <span>Publish My Lesson</span></>}
        </button>
      </form>
    </div>
  );
};

export default StoryForm;
