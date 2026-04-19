import { ArrowRight, Calendar, Clock } from 'lucide-react';

const ARTICLES = [
  {
    title: 'How to Start Learning Harmonium from Scratch',
    excerpt: 'A complete beginner guide to sitting posture, bellows technique, and your first swar exercises on harmonium.',
    tag: 'Beginner', date: 'Jun 2026', readTime: '8 min',
    color: 'from-orange-900/40 to-orange-950/80',
    accent: 'text-orange-400', tagBg: 'bg-orange-500/15 text-orange-400',
  },
  {
    title: 'Raga Yaman: The Evening Raga of Romance',
    excerpt: 'Deep dive into Raga Yaman — its aroha, avaroha, characteristic phrases, and famous compositions.',
    tag: 'Raga Guide', date: 'May 2026', readTime: '12 min',
    color: 'from-indigo-900/40 to-indigo-950/80',
    accent: 'text-indigo-400', tagBg: 'bg-indigo-500/15 text-indigo-400',
  },
  {
    title: 'Understanding Teentaal: The 16-Beat Cycle',
    excerpt: 'Master the most common taal in Hindustani music. Learn vibhags, matra counting, and how to clap the taal.',
    tag: 'Rhythm', date: 'May 2026', readTime: '10 min',
    color: 'from-amber-900/40 to-amber-950/80',
    accent: 'text-amber-400', tagBg: 'bg-amber-500/15 text-amber-400',
  },
  {
    title: 'MIDI Keyboard Setup for Indian Classical Music',
    excerpt: 'Connect any MIDI keyboard to Helium Dock and play Harmonium, Piano, or Synth with velocity sensitivity.',
    tag: 'Tech', date: 'Apr 2026', readTime: '6 min',
    color: 'from-cyan-900/40 to-cyan-950/80',
    accent: 'text-cyan-400', tagBg: 'bg-cyan-500/15 text-cyan-400',
  },
  {
    title: 'Tanpura: The Drone That Grounds Every Raga',
    excerpt: 'Learn why tanpura is essential for Indian music practice, proper tuning, and how to use a digital tanpura.',
    tag: 'Instruments', date: 'Apr 2026', readTime: '9 min',
    color: 'from-purple-900/40 to-purple-950/80',
    accent: 'text-purple-400', tagBg: 'bg-purple-500/15 text-purple-400',
  },
  {
    title: 'Daily Riyaz Routine for Serious Students',
    excerpt: 'Build a 30-minute daily practice schedule covering warm-ups, alankars, raga exploration, and compositions.',
    tag: 'Practice', date: 'Mar 2026', readTime: '11 min',
    color: 'from-green-900/40 to-green-950/80',
    accent: 'text-green-400', tagBg: 'bg-green-500/15 text-green-400',
  },
];

export function Blog() {
  return (
    <section id="blog" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-[#e8eaf0]">Learn & Explore</h2>
          <p className="text-sm text-[#7c869a] font-mono mt-1">Articles, guides, and lessons</p>
        </div>
        <button className="hidden sm:flex items-center gap-1.5 text-sm text-[#7c869a] hover:text-orange-400 transition-colors font-mono">
          View all <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ARTICLES.map(article => (
          <article
            key={article.title}
            className={`group p-5 rounded-2xl border border-[#252b3b] bg-gradient-to-b ${article.color} hover:border-orange-500/30 transition-all cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold font-mono ${article.tagBg}`}>
                {article.tag}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </div>
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2 leading-snug group-hover:text-orange-100 transition-colors">
              {article.title}
            </h3>
            <p className="text-xs text-white/50 leading-relaxed mb-4">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
                <Calendar className="w-3 h-3" />
                {article.date}
              </div>
              <span className={`flex items-center gap-1 text-xs font-mono ${article.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                Read <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* More articles hint */}
      <div className="mt-6 text-center">
        <p className="text-[#7c869a] text-sm font-mono">
          Showing 6 of 28 articles.{' '}
          <button className="text-orange-400 hover:underline">View all articles</button>
        </p>
      </div>
    </section>
  );
}
