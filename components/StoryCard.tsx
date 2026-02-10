
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
      alert("Please login to react.");
      return;
    }

    const currentReactions = [...story.reactions[type]];
    const index = currentReactions.indexOf(platform.currentUser.id);
    
    if (index > -1) {
      currentReactions.splice(index, 1);
    } else {
      currentReactions.push(platform.currentUser.id);
    }

    platform.updateStory(story.id, {
      reactions: {
        ...story.reactions,
        [type]: currentReactions
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
      {/* Header */}
      <div className="p-5 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={genderIcon} alt="Avatar" className="w-10 h-10 rounded-full border border-slate-100" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-900 text-sm">
                {story.authorName}
              </span>
              {story.is18Plus && (
                <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase">
                  18+
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span>{new Date(story.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span className="text-indigo-600 font-medium">{story.category}</span>
            </div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-indigo-600 p-1">
          <Share2 size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4 flex-grow">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ভুল বা চ্যালেঞ্জ</h4>
          <p className="text-slate-800 leading-relaxed font-medium">
            {showFull ? story.mistake : story.mistake.substring(0, 150) + (story.mistake.length > 150 ? '...' : '')}
          </p>
        </div>

        {showFull && (
          <div className="space-y-4 pt-2 animate-in fade-in duration-300">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">কারণ</h4>
              <p className="text-slate-700 leading-relaxed">{story.reason}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ফলাফল</h4>
              <p className="text-slate-700 leading-relaxed">{story.outcome}</p>
            </div>
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">শিক্ষা</h4>
              <p className="text-slate-800 italic leading-relaxed">"{story.lessons}"</p>
            </div>
          </div>
        )}

        <button 
          onClick={() => setShowFull(!showFull)}
          className="text-indigo-600 text-sm font-semibold flex items-center hover:text-indigo-700"
        >
          {showFull ? (
            <><ChevronUp size={16} className="mr-1" /> Show Less</>
          ) : (
            <><ChevronDown size={16} className="mr-1" /> Read Full Story</>
          )}
        </button>
      </div>

      {/* AI Insights Collapsible */}
      {story.aiInsights && (
        <div className="px-5 pb-5">
          <button 
            onClick={() => setShowAI(!showAI)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
              showAI ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Sparkles size={18} className={showAI ? 'text-indigo-200' : 'text-indigo-500'} />
              <span className="text-sm font-semibold tracking-tight">AI Insights & Takeaways</span>
            </div>
            {showAI ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {showAI && (
            <div className="mt-2 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 animate-in slide-in-from-top-2 duration-300">
              <div>
                <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Key Takeaways</h5>
                <ul className="space-y-2">
                  {story.aiInsights.keyTakeaways.map((item, i) => (
                    <li key={i} className="text-sm text-slate-700 flex items-start">
                      <span className="mr-2 text-indigo-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <p className="text-xs text-slate-500">Educational analysis only.</p>
                <button 
                  onClick={copyInsights}
                  className="text-indigo-600 hover:text-indigo-700 text-xs font-medium flex items-center"
                >
                  <Copy size={12} className="mr-1" /> Copy Insights
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interactions */}
      <div className="px-5 py-4 border-t border-slate-50 bg-slate-50/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleReaction('learned')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              userReactedLearned 
                ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-400'
            }`}
          >
            <ThumbsUp size={14} />
            <span>আমি শিখেছি</span>
            <span className="opacity-50 font-medium">{story.reactions.learned.length}</span>
          </button>
          
          <button 
            onClick={() => handleReaction('relatable')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              userReactedRelatable 
                ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-400'
            }`}
          >
            <Users size={14} />
            <span>আমার সাথে মিল আছে</span>
            <span className="opacity-50 font-medium">{story.reactions.relatable.length}</span>
          </button>
        </div>

        {story.allowComments && (
          <button 
            onClick={() => setShowComments(!showComments)}
            className="text-slate-500 hover:text-indigo-600 text-sm font-medium flex items-center"
          >
            <MessageSquare size={16} className="mr-1.5" />
            {storyComments.length} {storyComments.length === 1 ? 'Comment' : 'Comments'}
          </button>
        )}
      </div>

      {/* Comments Section */}
      {showComments && story.allowComments && (
        <div className="border-t border-slate-100 bg-white p-5 space-y-4 animate-in fade-in duration-300">
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {storyComments.length > 0 ? (
              storyComments.map((comment: any) => (
                <div key={comment.id} className="bg-slate-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700">{comment.userName}</span>
                    <span className="text-[10px] text-slate-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-600">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 text-sm py-4 italic">No comments yet. Start the conversation!</p>
            )}
          </div>

          {platform.emergencyMode ? (
            <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded flex items-center">
              <EyeOff size={14} className="mr-2" /> Comments are disabled during emergency mode.
            </div>
          ) : platform.currentUser ? (
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Write a thoughtful comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitComment()}
                className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button 
                onClick={submitComment}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700"
              >
                Post
              </button>
            </div>
          ) : (
            <p className="text-center text-xs text-slate-400">Please login to comment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryCard;
