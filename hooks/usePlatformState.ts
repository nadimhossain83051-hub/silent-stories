
import { useState, useEffect } from 'react';
import { User, Story, Category, Comment } from '../types';
import { INITIAL_CATEGORIES, INITIAL_STORIES } from '../constants';

const STORAGE_KEY = 'hindsight_platform_data_v1';

interface PlatformData {
  users: User[];
  stories: Story[];
  categories: Category[];
  comments: Comment[];
  currentUser: User | null;
  emergencyMode: boolean;
}

export function usePlatformState() {
  const [data, setData] = useState<PlatformData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        currentUser: parsed.currentUser || null
      };
    }
    return {
      users: [],
      stories: INITIAL_STORIES,
      categories: INITIAL_CATEGORIES,
      comments: [],
      currentUser: null,
      emergencyMode: false
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const login = (user: User) => setData(prev => ({ ...prev, currentUser: user }));
  const logout = () => setData(prev => ({ ...prev, currentUser: null }));
  
  const addStory = (story: Story) => setData(prev => ({ 
    ...prev, 
    stories: [story, ...prev.stories] 
  }));

  const updateStory = (id: string, updates: Partial<Story>) => setData(prev => ({
    ...prev,
    stories: prev.stories.map(s => s.id === id ? { ...s, ...updates } : s)
  }));

  const addComment = (comment: Comment) => setData(prev => ({
    ...prev,
    comments: [...prev.comments, comment]
  }));

  const deleteStory = (id: string) => setData(prev => ({
    ...prev,
    stories: prev.stories.filter(s => s.id !== id)
  }));

  const toggleEmergencyMode = () => setData(prev => ({
    ...prev,
    emergencyMode: !prev.emergencyMode
  }));

  const updateUserStatus = (userId: string, isBlocked: boolean) => setData(prev => ({
    ...prev,
    users: prev.users.map(u => u.id === userId ? { ...u, isBlocked } : u)
  }));

  const registerUser = (user: User) => setData(prev => ({
    ...prev,
    users: [...prev.users, user]
  }));

  return {
    ...data,
    login,
    logout,
    addStory,
    updateStory,
    addComment,
    deleteStory,
    toggleEmergencyMode,
    updateUserStatus,
    registerUser,
    setData
  };
}
