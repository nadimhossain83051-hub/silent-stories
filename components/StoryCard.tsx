import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Copy, 
  MessageSquare, 
  Share2,
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

    if (type === 'learned') {
      if (userReactedLearned) {
        newLearned = newLearned.filter(id => id !== userId);
      } else {
        newLearned.push(userId);
        // Remove from other reaction to maintain 1-reaction limit
        newRelatable = newRelatable.filter(id => id !== userId);
      }
    } else {
      if (userReactedRelatable) {
        newRelatable = newRelatable.filter(id => id !== userId);
      } else {
        newRelatable.push(userId);
        // Remove from other reaction to maintain 1-reaction limit
        newLearned = newLearned.filter(id => id !== userId);
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

  const copyInsights = () => {
    if (!story.aiInsights) return;
    const text = `ভুল থেকেই শিক্ষা:\n\nKey Lessons:\n${story.aiInsights.keyTakeaways.join('\n')}\n\nAdvice:\n${story.aiInsights.futureAdvice}`;
    navigator.clipboard.writeText(text);
    alert("Insights copied to clipboard!");
  };

  const storyComments = platform.comments.filter((c: any) => c.storyId === story.id);

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col ${story.is18Plus ? 'ring-1 ring-amber-200' : ''}`}>
      <div className="p-5 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={genderIcon} alt="Avatar" className="w-10 h-10 rounded-full border border-slate-100" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-900 text-sm">
                {story.authorName}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span>{new Date(story.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span className="text-indigo-600 font-medium">{story.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4 flex-grow">
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ভুল</h4>
          <p className="text-slate-800 leading-relaxed font-bold text-lg">
            {showFull ? story.mistake : story.mistake.substring(0, 100) + (story.mistake.length > 100 ? '...' : '')}
          </p>
        </div>

        {showFull && (
          <div className="space-y-4 pt-2 animate-in fade-in duration-300">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1">প্রাপ্ত শিক্ষা</h4>
              <p className="text-slate-800 font-semibold">{story.lessons}</p>
            </div>
          </div>
        )}

        <button 
          onClick={() => setShowFull(!showFull)}
          className="text-indigo-600 text-xs font-bold flex items-center hover:text-indigo-700 uppercase tracking-widest"
        >
          {showFull ? "সংক্ষিপ্ত করুন" : "বিস্তারিত পড়ুন"}
        </button>
      </div>

      {story.aiInsights && (
        <div className="px-5 pb-5">
          <button 
            onClick={() => setShowAI(!showAI)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
              showAI ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Sparkles size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">AI বিশ্লেষণ</span>
            </div>
            {showAI ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showAI && (
            <div className="mt-2 p-4 bg-slate-900 text-slate-300 rounded-xl space-y-4 animate-in slide-in-from-top-2 duration-300">
              <p className="text-sm font-medium italic">"{story.aiInsights.futureAdvice}"</p>
              <ul className="space-y-2">
                {story.aiInsights.keyTakeaways.map((item, i) => (
                  <li key={i} className="text-xs flex items-start">
                    <span className="mr-2 text-sky-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="px-5 py-4 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleReaction('learned')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-[10px] font-bold transition-all ${
              userReactedLearned 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-400'
            }`}
          >
            <ThumbsUp size={12} />
            <span>শিখলাম ({story.reactions.learned.length})</span>
          </button>
          
          <button 
            onClick={() => handleReaction('relatable')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-[10px] font-bold transition-all ${
              userReactedRelatable 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-400'
            }`}
          >
            <Users size={12} />
            <span>মিল আছে ({story.reactions.relatable.length})</span>
          </button>
        </div>

        {story.allowComments && (
          <button 
            onClick={() => setShowComments(!showComments)}
            className="text-slate-400 hover:text-indigo-600 p-2"
          >
            <MessageSquare size={18} />
          </button>
        )}
      </div>

      {showComments && story.allowComments && (
        <div className="border-t border-slate-100 bg-white p-5 space-y-4">
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
            {storyComments.length > 0 ? (
              storyComments.map((comment: any) => (
                <div key={comment.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">@{comment.userName}</span>
                  </div>
                  <p className="text-sm text-slate-800 font-medium">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-300 text-xs py-4 italic">কোনো মন্তব্য নেই।</p>
            )}
          </div>
          <div className="flex space-x-2 pt-2">
            <input 
              type="text" 
              placeholder="মন্তব্য লিখুন..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/10 font-medium"
            />
            <button 
              onClick={submitComment}
              className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors"
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