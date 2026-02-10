import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  MessageSquare, 
  ThumbsUp,
  Users,
  EyeOff
} from 'lucide-react';
import { Story, Gender } from '../types';
import { GENDER_AVATARS } from '../constants';

interface Props {
  story: Story;
  platform: any;
}

const StoryCard: React.FC<Props> = ({ story, platform }) => {
  const [showFull, setShowFull] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const genderIcon = GENDER_AVATARS[story.authorGender] || GENDER_AVATARS[Gender.OTHER];
  const userReactedLearned = platform.currentUser && story.reactions.learned.includes(platform.currentUser.id);
  const userReactedRelatable = platform.currentUser && story.reactions.relatable.includes(platform.currentUser.id);

  const handleReaction = (type: 'learned' | 'relatable') => {
    if (!platform.currentUser) {
      alert("রিঅ্যাকশন দিতে লগইন করুন।");
      return;
    }

    const userId = platform.currentUser.id;
    let newLearned = [...story.reactions.learned];
    let newRelatable = [...story.reactions.relatable];

    // Logic for 1 reaction only: toggle or switch
    if (type === 'learned') {
      if (userReactedLearned) {
        newLearned = newLearned.filter(id => id !== userId);
      } else {
        newLearned.push(userId);
        newRelatable = newRelatable.filter(id => id !== userId); // Remove from other if exists
      }
    } else {
      if (userReactedRelatable) {
        newRelatable = newRelatable.filter(id => id !== userId);
      } else {
        newRelatable.push(userId);
        newLearned = newLearned.filter(id => id !== userId); // Remove from other if exists
      }
    }

    platform.updateStory(story.id, {
      reactions: {
        learned: newLearned,
        relatable: newRelatable
      }
    });
  };

  const submitComment = () => {
    if (!newComment.trim() || !platform.currentUser) return;
    
    const comment = {
      id: Math.random().toString(36).substr(2, 9),
      storyId: story.id,
      userId: platform.currentUser.id,
      userName: platform.currentUser.displayName || 'Anonymous User',
      content: newComment,
      createdAt: Date.now(),
      isFlagged: false
    };

    platform.addComment(comment);
    setNewComment('');
  };

  const storyComments = platform.comments.filter((c: any) => c.storyId === story.id);

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden ${story.is18Plus ? 'ring-1 ring-amber-100' : ''}`}>
      <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
        <div className="flex items-center space-x-3">
          <img src={genderIcon} alt="Avatar" className="w-10 h-10 rounded-full border border-slate-200 bg-white" />
          <div>
            <span className="font-bold text-slate-900 text-sm block">
              {story.authorName}
            </span>
            <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>{new Date(story.createdAt).toLocaleDateString('bn-BD')}</span>
              <span className="text-slate-200">•</span>
              <span className="text-indigo-600">{story.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-grow">
        <div>
          <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">ভুল</h4>
          <p className="text-slate-800 leading-relaxed font-bold text-lg">
            {showFull ? story.mistake : story.mistake.substring(0, 100) + (story.mistake.length > 100 ? '...' : '')}
          </p>
        </div>

        {showFull && (
          <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-1 duration-300">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2">শিক্ষা</h4>
              <p className="text-slate-700 font-semibold leading-relaxed">{story.lessons}</p>
            </div>
            {story.advice && (
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                <h4 className="text-[10px] font-black text-emerald-500 uppercase mb-2">পরামর্শ</h4>
                <p className="text-emerald-900 font-bold">{story.advice}</p>
              </div>
            )}
          </div>
        )}

        <button 
          onClick={() => setShowFull(!showFull)}
          className="text-indigo-600 text-[11px] font-black flex items-center hover:text-indigo-800 uppercase tracking-widest transition-colors"
        >
          {showFull ? "সংক্ষিপ্ত করুন ↑" : "বিস্তারিত পড়ুন ↓"}
        </button>
      </div>

      {story.aiInsights && (
        <div className="px-6 pb-4">
          <button 
            onClick={() => setShowAI(!showAI)}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all ${
              showAI ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Sparkles size={16} className={showAI ? "text-sky-400" : "text-indigo-600"} />
              <span className="text-[11px] font-black uppercase tracking-wider">AI বিশ্লেষণ</span>
            </div>
            {showAI ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showAI && (
            <div className="mt-2 p-5 bg-slate-900 text-slate-300 rounded-2xl space-y-4 animate-in slide-in-from-top-2 duration-300 border border-slate-800">
              <p className="text-sm font-bold italic text-slate-100">"{story.aiInsights.futureAdvice}"</p>
              <div className="space-y-2">
                {story.aiInsights.keyTakeaways.map((item, i) => (
                  <div key={i} className="text-xs flex items-start bg-white/5 p-2 rounded-lg">
                    <span className="mr-2 text-sky-400 font-bold">#</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="px-6 py-4 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleReaction('learned')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-[10px] font-black transition-all ${
              userReactedLearned 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200'
            }`}
          >
            <ThumbsUp size={14} />
            <span>শিখলাম ({story.reactions.learned.length})</span>
          </button>
          
          <button 
            onClick={() => handleReaction('relatable')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-[10px] font-black transition-all ${
              userReactedRelatable 
                ? 'bg-emerald-600 text-white shadow-lg' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:border-emerald-200'
            }`}
          >
            <Users size={14} />
            <span>মিল আছে ({story.reactions.relatable.length})</span>
          </button>
        </div>

        {story.allowComments && (
          <button 
            onClick={() => setShowComments(!showComments)}
            className={`p-2.5 rounded-xl transition-colors ${showComments ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <MessageSquare size={20} />
          </button>
        )}
      </div>

      {showComments && story.allowComments && (
        <div className="border-t border-slate-100 bg-white p-6 space-y-4">
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
            {storyComments.length > 0 ? (
              storyComments.map((comment: any) => (
                <div key={comment.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">@{comment.userName}</span>
                  <p className="text-sm text-slate-700 font-semibold">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-300 text-xs py-4 italic font-bold">এখনো কোনো মন্তব্য নেই।</p>
            )}
          </div>
          <div className="flex space-x-2 pt-2">
            <input 
              type="text" 
              placeholder="একটি মন্তব্য লিখুন..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/10 font-bold"
            />
            <button 
              onClick={submitComment}
              className="bg-slate-900 text-white px-5 rounded-xl text-xs font-black hover:bg-indigo-600 transition-all shadow-md active:scale-95"
            >
              পাঠান
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryCard;