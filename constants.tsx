
import React from 'react';
import { Category, Gender, Story } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'সম্পর্কের ভুল', color: 'bg-rose-100 text-rose-700' },
  { id: '2', name: 'ক্যারিয়ারের ভুল', color: 'bg-blue-100 text-blue-700' },
  { id: '3', name: 'ব্যবসার ভুল', color: 'bg-amber-100 text-amber-700' },
  { id: '4', name: 'আর্থিক ভুল', color: 'bg-emerald-100 text-emerald-700' },
  { id: '5', name: 'বিশ্বাস ভাঙার অভিজ্ঞতা', color: 'bg-indigo-100 text-indigo-700' },
  { id: '6', name: 'জীবনের বড় সিদ্ধান্ত', color: 'bg-purple-100 text-purple-700' },
  { id: '7', name: 'মানসিক স্বাস্থ্য', color: 'bg-teal-100 text-teal-700' },
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 's1',
    userId: 'u1',
    authorName: 'মায়াবী ছায়া',
    authorGender: Gender.FEMALE,
    category: 'সম্পর্কের ভুল',
    mistake: 'পরিচয়ের মাত্র ১৫ দিনের মাথায় আবেগের বশবর্তী হয়ে বিয়ের সিদ্ধান্ত নেওয়া।',
    reason: 'আমি তখন খুব একাকী বোধ করছিলাম এবং মনে হয়েছিল এটাই বোধহয় সত্যিকারের ভালোবাসা। সে খুব মিষ্টি করে কথা বলত।',
    outcome: 'বিয়ের মাত্র ২ মাসের মাথায় বুঝতে পারি আমাদের মূল্যবোধ এবং জীবনদর্শন সম্পূর্ণ আলাদা। ছোটখাটো বিষয়েও চরম অশান্তি শুরু হয়।',
    lessons: 'জীবনসঙ্গী নির্বাচনের ক্ষেত্রে তাড়াহুড়ো করা জীবনের সবচেয়ে বড় ভুল হতে পারে। আবেগের চেয়ে বাস্তবতাকে গুরুত্ব দেওয়া উচিত।',
    advice: '',
    is18Plus: false,
    allowComments: true,
    isFlagged: false,
    status: 'published',
    createdAt: Date.now() - 86400000 * 5,
    reactions: { learned: ['u2', 'u3'], relatable: ['u4'] },
    aiInsights: {
      keyTakeaways: ['আবেগের বশবর্তী হয়ে সিদ্ধান্ত নেওয়া ঝুঁকিপূর্ণ', 'পর্যাপ্ত সময় নিয়ে মানুষকে চেনা জরুরি'],
      mistakesToAvoid: ['তাড়াহুড়ো করে বিয়ের প্রতিশ্রুতি দেওয়া'],
      futureAdvice: 'সঙ্গীকে অন্তত ৬ মাস পর্যবেক্ষণে রাখুন এবং মূল্যবোধের মিল আছে কিনা যাচাই করুন।'
    }
  },
  {
    id: 's2',
    userId: 'u2',
    authorName: 'সতর্ক পথিক',
    authorGender: Gender.MALE,
    category: 'আর্থিক ভুল',
    mistake: 'শেয়ার বাজারে না বুঝে অন্যের কথায় প্রলোভনে পড়ে সব জমানো সঞ্চয় বিনিয়োগ করা।',
    reason: 'খুব অল্প সময়ে বড়লোক হওয়ার লোভ এবং হুজুগে পড়ে সিদ্ধান্ত নেওয়া।',
    outcome: 'বাজারের ধসের ফলে আমি আমার জীবনের অর্জিত ৫ বছরের সঞ্চয় মাত্র ১ সপ্তাহে হারিয়ে ফেলি এবং মানসিকভাবে ভেঙে পড়ি।',
    lessons: 'বিনিয়োগ করার আগে নিজে পড়াশোনা করা এবং রিস্ক ম্যানেজমেন্ট বোঝা জরুরি। অন্যের কথায় নিজের কষ্টার্জিত টাকা বাজি ধরা বোকামি।',
    advice: '',
    is18Plus: false,
    allowComments: true,
    isFlagged: false,
    status: 'published',
    createdAt: Date.now() - 86400000 * 10,
    reactions: { learned: ['u1', 'u5'], relatable: ['u6', 'u7'] },
    aiInsights: {
      keyTakeaways: ['বিনিয়োগে বৈচিত্র্য থাকা দরকার', 'হুজুগে বিনিয়োগ করবেন না'],
      mistakesToAvoid: ['না বুঝে বড় অংকের অর্থ বিনিয়োগ'],
      futureAdvice: 'বিনিয়োগের আগে পর্যাপ্ত সময় নিয়ে বাজার বিশ্লেষণ করুন এবং ক্ষুদ্র পরিসরে শুরু করুন।'
    }
  },
  {
    id: 's3',
    userId: 'u3',
    authorName: 'অচেনা বন্ধু',
    authorGender: Gender.OTHER,
    category: 'ব্যবসার ভুল',
    mistake: 'লিগ্যাল কন্ট্রাক্ট বা লিখিত চুক্তি ছাড়াই কাছের বন্ধুর সাথে পার্টনারশিপে ব্যবসা শুরু করা।',
    reason: 'বন্ধুর প্রতি অন্ধ বিশ্বাস ছিল এবং ভেবেছিলাম টাকা-পয়সা নিয়ে আমাদের মধ্যে কোনো ঝামেলা হবে না।',
    outcome: 'ব্যবসা লাভজনক হওয়ার পর লভ্যাংশ নিয়ে মনোমালিন্য শুরু হয়। কোনো লিখিত প্রমাণ না থাকায় সে আমাকে ঠকিয়ে ব্যবসা দখল করে নেয়। আমি বন্ধু ও ব্যবসা দুই-ই হারাই।',
    lessons: 'ব্যবসায়িক সম্পর্কে পরিষ্কার চুক্তি বা লিগ্যাল ডকুমেন্ট থাকা সবচেয়ে জরুরি, তা সে কত কাছের মানুষই হোক না কেন।',
    advice: '',
    is18Plus: false,
    allowComments: true,
    isFlagged: false,
    status: 'published',
    createdAt: Date.now() - 86400000 * 15,
    reactions: { learned: ['u2', 'u8'], relatable: ['u9'] },
    aiInsights: {
      keyTakeaways: ['পেশাদারিত্ব এবং ব্যক্তিগত সম্পর্ক আলাদা রাখা উচিত', 'লিখিত চুক্তির বিকল্প নেই'],
      mistakesToAvoid: ['কাগজপত্র ছাড়া ব্যবসায়িক লেনদেন'],
      futureAdvice: 'যে কোনো পার্টনারশিপে আইনি পরামর্শ নিন এবং অধিকার স্পষ্ট করে রাখুন।'
    }
  },
  {
    id: 's4',
    userId: 'u4',
    authorName: 'স্বপ্নীল আকাশ',
    authorGender: Gender.MALE,
    category: 'ক্যারিয়ারের ভুল',
    mistake: 'পছন্দের সাবজেক্ট ছেড়ে শুধুমাত্র উচ্চ বেতন এবং সামাজিক মর্যাদার আশায় ব্যাংকিং সেক্টরে যোগ দেওয়া।',
    reason: "পরিবারের চাপ এবং সমাজের কাছে নিজের 'স্ট্যাটাস' বড় করে দেখানোর ইচ্ছা।",
    outcome: '৩ বছর পর আমি এখন চরম হতাশায় ভুগছি। প্রতিদিন সকালে কাজ আমাকে কোনো আনন্দ দেয় না, উল্টো মানসিক চাপ বাড়ছে।',
    lessons: 'ক্যারিয়ার পছন্দের ক্ষেত্রে টাকার চেয়ে নিজের আগ্রহ এবং কাজের পরিবেশকে বেশি গুরুত্ব দেওয়া উচিত।',
    advice: '',
    is18Plus: false,
    allowComments: true,
    isFlagged: false,
    status: 'published',
    createdAt: Date.now() - 86400000 * 3,
    reactions: { learned: ['u5', 'u1'], relatable: ['u3', 'u10'] },
    aiInsights: {
      keyTakeaways: ['মানসিক শান্তি ক্যারিয়ারের প্রধান চালিকাশক্তি', 'অন্যের ইচ্ছা চাপিয়ে দেওয়া অনুচিত'],
      mistakesToAvoid: ['আগ্রহহীন কাজে দীর্ঘ সময় ব্যয় করা'],
      futureAdvice: 'নিজের শক্তি এবং আগ্রহের জায়গাটি চিহ্নিত করে ক্যারিয়ার সুইচ করার পরিকল্পনা করুন।'
    }
  },
  {
    id: 's5',
    userId: 'u5',
    authorName: 'নির্জন পথিক',
    authorGender: Gender.FEMALE,
    category: 'মানসিক স্বাস্থ্য',
    mistake: 'বিষণ্ণতা এবং অতিরিক্ত দুশ্চিন্তাকে অবহেলা করা এবং মানুষের কাছে সাহায্য না চাওয়া।',
    reason: "লোকে 'পাগল' বলবে এই ভয়ে আমি আমার সমস্যাগুলো গোপন রেখেছিলাম।",
    outcome: 'সমস্যাটা এতটাই প্রকট হয়ে যায় যে আমি স্বাভাবিক জীবনযাপন করতে পারছিলাম না। শেষ পর্যন্ত হাসপাতালেও ভর্তি হতে হয়েছিল।',
    lessons: 'মানসিক স্বাস্থ্য সমস্যা কোনো লজ্জার বিষয় নয়, সময়মতো প্রফেশনাল সাহায্য নেওয়া জীবন বাঁচাতে পারে।',
    advice: '',
    is18Plus: false,
    allowComments: true,
    isFlagged: false,
    status: 'published',
    createdAt: Date.now() - 86400000 * 7,
    reactions: { learned: ['u2', 'u4'], relatable: ['u6', 'u1'] },
    aiInsights: {
      keyTakeaways: ['মানসিক স্বাস্থ্যের সচেতনতা জরুরি', 'সাহায্য চাওয়া সাহসিকতার লক্ষণ'],
      mistakesToAvoid: ['শারীরিক উপসর্গের মত মানসিক উপসর্গ এড়িয়ে যাওয়া'],
      futureAdvice: 'কাছের মানুষের সাথে কথা বলুন এবং প্রয়োজনে মনোবিদের পরামর্শ নিন।'
    }
  },
  {
    id: 's6',
    userId: 'u6',
    authorName: 'আশার আলো',
    authorGender: Gender.FEMALE,
    category: 'বিশ্বাস ভাঙার অভিজ্ঞতা',
    mistake: 'অনলাইনে পরিচিত একজনের কথায় প্রভাবিত হয়ে তাকে ব্যক্তিগত তথ্য এবং টাকা শেয়ার করা।',
    reason: 'সে খুব আবেগপূর্ণ গল্প শুনিয়েছিল এবং আমার সহানুভূতি কাজে লাগিয়েছিল।',
    outcome: "টাকা পাওয়ার পরই সে আমাকে ব্লক করে দেয়। আমি বুঝতে পারি আমি 'স্ক্যাম' বা প্রতারণার শিকার হয়েছি।",
    lessons: 'ভার্চুয়াল জগতের কাউকে না চিনে অন্ধ বিশ্বাস করা চরম বোকামি। নিজের গোপনীয়তা রক্ষা করা নিজের দায়িত্ব।',
    advice: '',
    is18Plus: false,
    allowComments: true,
    isFlagged: false,
    status: 'published',
    createdAt: Date.now() - 86400000 * 1,
    reactions: { learned: ['u7', 'u8'], relatable: ['u9', 'u2'] },
    aiInsights: {
      keyTakeaways: ['অনলাইন নিরাপত্তায় সচেতন হোন', 'সহভূমি যেন দুর্বলতা না হয়'],
      mistakesToAvoid: ['অপরিচিতকে অর্থ সাহায্য প্রদান'],
      futureAdvice: 'অনলাইন লেনদেনের আগে পরিচয় শতভাগ নিশ্চিত করুন এবং অপরিচিতদের থেকে দূরত্ব বজায় রাখুন।'
    }
  },
  {
    id: 's7',
    userId: 'u7',
    authorName: 'অভিজ্ঞ প্রবীণ',
    authorGender: Gender.MALE,
    category: 'জীবনের বড় সিদ্ধান্ত',
    mistake: 'বাবা-মায়ের ইচ্ছায় এমন ক্যারিয়ার এবং জীবনসঙ্গী বেছে নেওয়া যা আমার মোটেও পছন্দ ছিল না।',
    reason: 'তাঁদের কষ্ট দিতে চাইনি এবং ভেবেছিলাম পরিবারের বড়রা যা বলেন তাই ঠিক।',
    outcome: '৬০ বছর বয়সে এসে আজ আমার মনে হয়, আমি আমার নিজের জীবনটা বাঁচিনি, বরং অন্য কারও স্ক্রিপ্টে অভিনয় করেছি।',
    lessons: 'বড়দের শ্রদ্ধা করা এক কথা, আর নিজের জীবনের মূল সিদ্ধান্তগুলো তাঁদের হাতে ছেড়ে দেওয়া অন্য কথা। নিজের জীবনের চালক নিজেকেই হতে হয়।',
    advice: '',
    is18Plus: false,
    allowComments: true,
    isFlagged: false,
    status: 'published',
    createdAt: Date.now() - 86400000 * 20,
    reactions: { learned: ['u1', 'u2', 'u3', 'u4'], relatable: ['u5', 'u6'] },
    aiInsights: {
      keyTakeaways: ['ব্যক্তিগত স্বাধীনতার গুরুত্ব অপরিসীম', 'অন্যের প্রত্যাশার চাপে নিজের স্বপ্ন নষ্ট করবেন না'],
      mistakesToAvoid: ['নিজের মতামতের চেয়ে অন্যের মতামতকে বেশি গুরুত্ব দেওয়া'],
      futureAdvice: 'পরিবারের সাথে খোলামেলা আলোচনা করে নিজের পছন্দ এবং স্বপ্নের কথা জানান।'
    }
  },
  {
    id: 's8',
    userId: 'u8',
    authorName: 'নির্ভীক যাত্রী',
    authorGender: Gender.MALE,
    category: 'জীবনের বড় সিদ্ধান্ত',
    mistake: 'অতিরিক্ত কর্মব্যস্ততার অজুহাতে নিজের শরীরের ছোটখাটো ব্যথা এবং উপসর্গগুলোকে দিনের পর দিন অবহেলা করা।',
    reason: 'আমি ভেবেছিলাম এখন পরিশ্রমের সময়, শরীর পরে ঠিক করে নেওয়া যাবে। ক্যারিয়ারে সফল হওয়ার নেশায় আমি বিশ্রামকে বিলাসিতা মনে করতাম।',
    outcome: 'হঠাৎ একদিন অফিসে অজ্ঞান হয়ে যাই এবং পরে ধরা পড়ে আমার উচ্চ রক্তচাপ এবং কিডনিতে সমস্যা তৈরি হয়েছে যা আগে ধরা পড়লে সহজে নিরাময়যোগ্য ছিল। এখন আমাকে নিয়মিত ওষুধ আর অনেক নিয়ম মেনে চলতে হয়।',
    lessons: 'স্বাস্থ্যই সকল সুখের মূল—এই প্রবাদটি কেবল কথার কথা নয়। শরীর কোনো সংকেত দিলে তা কখনও উপেক্ষা করতে নেই। ক্যারিয়ারের চেয়ে জীবন বড়।',
    advice: '',
    is18Plus: false,
    allowComments: true,
    isFlagged: false,
    status: 'published',
    createdAt: Date.now() - 86400000 * 4,
    reactions: { learned: ['u1', 'u5'], relatable: ['u2', 'u3'] },
    aiInsights: {
      keyTakeaways: ['স্বাস্থ্য সচেতনতা ক্যারিয়ারের অবিচ্ছেদ্য অংশ', 'শুরুতেই চিকিৎসা নেওয়া সাশ্রয়ী এবং নিরাপদ'],
      mistakesToAvoid: ['শারীরিক উপসর্গ উপেক্ষা করা', 'অতিরিক্ত কাজের চাপে স্বাস্থ্যকে বিসর্জন দেওয়া'],
      futureAdvice: 'অন্তত বছরে একবার ফুল বডি চেকআপ করান এবং পর্যাপ্ত বিশ্রাম নিন।'
    }
  },
  {
    id: 's9',
    userId: 'u9',
    authorName: 'সচেতন হৃদয়',
    authorGender: Gender.FEMALE,
    category: 'বিশ্বাস ভাঙার অভিজ্ঞতা',
    mistake: 'ব্যক্তিগত এবং পারিবারিক সমস্যার কথা সোশ্যাল মিডিয়ায় খোলাখুলি শেয়ার করে মানুষের সহানুভূতি পাওয়ার চেষ্টা করা।',
    reason: 'আমি তখন মানসিকভাবে খুব দুর্বল ছিলাম এবং মনে হয়েছিল অনলাইনে পরিচিত মানুষরা আমাকে বুঝবে এবং সাপোর্ট করবে।',
    outcome: 'পরিচিত এবং অপরিচিত অনেক মানুষ আমার দুর্বলতার সুযোগ নিয়ে আমাকে আড়ালে ট্রল করতে শুরু করে। এমনকি কর্মক্ষেত্রেও এর নেতিবাচক প্রভাব পড়ে। ব্যক্তিগত বিষয় সবার সামনে তামাশায় পরিণত হয়।',
    lessons: 'নিজের ব্যক্তিগত গোপনীয়তা রক্ষা করা সবচেয়ে বড় শক্তি। সোশ্যাল মিডিয়া সহানুভূতি পাওয়ার সঠিক জায়গা নয়, বরং অধিকাংশ মানুষ এখানে অন্যের বিপদ উপভোগ করে।',
    advice: '',
    is18Plus: false,
    allowComments: true,
    isFlagged: false,
    status: 'published',
    createdAt: Date.now() - 86400000 * 2,
    reactions: { learned: ['u10', 'u4'], relatable: ['u6', 'u1'] },
    aiInsights: {
      keyTakeaways: ['গোপনীয়তা বজায় রাখা মানসিক শান্তির জন্য জরুরি', 'ডিজিটাল ফুটপ্রিন্ট সাবধানে তৈরি করুন'],
      mistakesToAvoid: ['আবেগের বশে সোশ্যাল মিডিয়ায় ব্যক্তিগত তথ্য শেয়ার'],
      futureAdvice: 'ব্যক্তিগত সমস্যা নিয়ে বিশ্বাসযোগ্য বন্ধু বা কাউন্সিলরের সাথে কথা বলুন, পাবলিক প্ল্যাটফর্মে নয়।'
    }
  },
  {
    id: 's10',
    userId: 'u10',
    authorName: 'অনুতপ্ত সন্তান',
    authorGender: Gender.MALE,
    category: 'সম্পর্কের ভুল',
    mistake: 'বন্ধুদের সাথে আড্ডা আর ঘোরাঘুরিতে এতই ব্যস্ত থাকতাম যে, বয়স্ক মা-বাবার সাথে বসে একটু গল্প করার সময় বের করতে পারতাম না।',
    reason: 'তখন মনে হতো মা-বাবা তো বাড়িতেই আছেন, তাঁদের তো সবসময়ই পাবো। বন্ধুদের সাথে সময় কাটানোটাই বেশি রোমাঞ্চকর মনে হতো।',
    outcome: 'হঠাৎ করে বাবার মৃত্যু হওয়ার পর আমি বুঝতে পারি আমি কত বড় সুযোগ হারিয়েছি। বাবার শেষ দিনগুলোতে আমি তাঁর পাশে যথেষ্ট সময় দিইনি, যা আমাকে আজও অপরাধবোধে ভোগায়।',
    lessons: 'প্রিয়জনদের সময় দেওয়াটাই জীবনের সবচেয়ে বড় বিনিয়োগ। সময় একবার চলে গেলে আর তা কোটি টাকা দিয়েও ফিরে পাওয়া যায় না।',
    advice: '',
    is18Plus: false,
    allowComments: true,
    isFlagged: false,
    status: 'published',
    createdAt: Date.now() - 86400000 * 30,
    reactions: { learned: ['u1', 'u2', 'u3'], relatable: ['u7', 'u8', 'u9'] },
    aiInsights: {
      keyTakeaways: ['পারিবারিক বন্ধনের কোনো বিকল্প নেই', 'সময়ের সদ্ব্যবহার সম্পর্কে সচেতনতা'],
      mistakesToAvoid: ['মা-বাবাকে পর্যাপ্ত সময় না দেওয়া', 'ভবিষ্যতের ওপর বর্তমানের কর্তব্য চাপিয়ে রাখা'],
      futureAdvice: 'প্রতিদিন অন্তত কিছুক্ষণ মা-বাবার সাথে কথা বলুন এবং তাঁদের ছোটখাটো চাহিদার দিকে খেয়াল রাখুন।'
    }
  }
];

export const GENDER_AVATARS: Record<string, string> = {
  [Gender.MALE]: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4',
  [Gender.FEMALE]: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=ffdfbf',
  [Gender.OTHER]: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow&backgroundColor=c0aede',
  [Gender.PREFER_NOT_TO_SAY]: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Boots&backgroundColor=d1d4f9',
};

export const PLATFORM_MAINTAINER = {
  name: "Platform Director",
  bio: "Committed to building a space where human experience leads to collective wisdom.",
  image: "https://picsum.photos/seed/admin/200/200",
  socials: {
    twitter: "https://twitter.com/hindsight",
    facebook: "https://facebook.com/hindsight",
    linkedin: "https://linkedin.com/company/hindsight"
  }
};
