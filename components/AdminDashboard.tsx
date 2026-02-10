
import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Flag, 
  ShieldAlert, 
  Settings, 
  MoreVertical, 
  Eye, 
  EyeOff, 
  CheckCircle,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Story, User } from '../types';

interface Props {
  platform: any;
}

const AdminDashboard: React.FC<Props> = ({ platform }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stories' | 'users' | 'safety'>('overview');

  const stats = [
    { label: 'Total Stories', value: platform.stories.length, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Registered Users', value: platform.users.length, icon: Users, color: 'text-indigo-600' },
    { label: 'Flagged Content', value: platform.stories.filter((s: any) => s.isFlagged).length, icon: Flag, color: 'text-red-600' },
    { label: 'Total Reactions', value: platform.stories.reduce((acc: number, s: any) => acc + s.reactions.learned.length + s.reactions.relatable.length, 0), icon: TrendingUp, color: 'text-emerald-600' },
  ];

  const categoryData = platform.categories.map((cat: any) => ({
    name: cat.name,
    count: platform.stories.filter((s: any) => s.category === cat.name).length,
    color: '#6366f1'
  }));

  const exportLogs = () => {
    const data = JSON.stringify(platform.stories, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hindsight-logs-${new Date().toISOString()}.json`;
    a.click();
  };

  const handleStatusChange = (id: string, status: 'published' | 'hidden') => {
    platform.updateStory(id, { status, isFlagged: false });
  };

  const handleBlockUser = (id: string, block: boolean) => {
    platform.updateUserStatus(id, block);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Admin Command Center</h2>
          <p className="text-slate-500">Monitor community safety and platform analytics.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={exportLogs}
            className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            <Download size={16} />
            <span>Export Data</span>
          </button>
          <button 
            onClick={platform.toggleEmergencyMode}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
              platform.emergencyMode 
                ? 'bg-amber-100 text-amber-700 border border-amber-300 ring-2 ring-amber-500 ring-opacity-20' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <ShieldAlert size={16} />
            <span>{platform.emergencyMode ? 'Active lockdown' : 'Emergency Lockdown'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {[
          { id: 'overview', icon: BarChart3, label: 'Overview' },
          { id: 'stories', icon: BookOpen, label: 'Story Management' },
          { id: 'users', icon: Users, label: 'User Verification' },
          { id: 'safety', icon: ShieldAlert, label: 'Safety Controls' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-all ${
              activeTab === tab.id 
                ? 'border-indigo-600 text-indigo-600 font-bold' 
                : 'border-transparent text-slate-500 hover:text-indigo-600 hover:border-slate-200'
            }`}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[500px]">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className={`p-3 rounded-xl bg-slate-50 w-fit mb-4 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Popular Categories</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                        {categoryData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Platform Health</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-sm font-medium text-slate-700">API Gateway</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Story Content</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Author (Real ID)</th>
                    <th className="px-6 py-4">Reactions</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {platform.stories.map((story: Story) => {
                    const author = platform.users.find((u: any) => u.id === story.userId);
                    return (
                      <tr key={story.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-sm font-semibold text-slate-900 line-clamp-1">{story.mistake}</p>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-1">{story.lessons}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{story.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          {story.isFlagged ? (
                            <span className="flex items-center text-red-600 text-xs font-bold">
                              <Flag size={14} className="mr-1" /> Flagged
                            </span>
                          ) : story.status === 'published' ? (
                            <span className="flex items-center text-emerald-600 text-xs font-bold">
                              <CheckCircle size={14} className="mr-1" /> Active
                            </span>
                          ) : (
                            <span className="flex items-center text-slate-400 text-xs font-bold">
                              <EyeOff size={14} className="mr-1" /> Hidden
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <p className="font-medium text-slate-900">{author?.fullName || 'N/A'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600">{story.reactions.learned.length + story.reactions.relatable.length}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {story.status === 'published' ? (
                              <button 
                                onClick={() => handleStatusChange(story.id, 'hidden')}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <EyeOff size={18} />
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleStatusChange(story.id, 'published')}
                                className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg"
                              >
                                <Eye size={18} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
             <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Full Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Gender</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {platform.users.map((user: User) => (
                    <tr key={user.id} className={`hover:bg-slate-50 transition-colors ${user.isBlocked ? 'bg-red-50/30' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                            {user.fullName.charAt(0)}
                          </div>
                          <p className="text-sm font-semibold text-slate-900">{user.fullName}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.gender}
                      </td>
                      <td className="px-6 py-4">
                        {user.isAdmin ? (
                          <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded uppercase">Admin</span>
                        ) : (
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">Member</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {user.isBlocked ? (
                          <button onClick={() => handleBlockUser(user.id, false)} className="text-xs font-bold text-emerald-600 hover:underline">Unblock</button>
                        ) : (
                          !user.isAdmin && <button onClick={() => handleBlockUser(user.id, true)} className="text-xs font-bold text-red-600 hover:underline">Block</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
