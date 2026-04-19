import { BookOpen, ChevronRight, Clock, BarChart2 } from 'lucide-react';

const LEVELS = [
  {
    level: 'Beginner',
    color: 'from-green-900/50 to-green-950',
    accent: 'text-green-400',
    border: 'border-green-800/50',
    lessons: [
      { title: 'Introduction to Swaras', duration: '15 min', desc: 'Learn Sa Re Ga Ma Pa Dha Ni — the 7 basic notes of Indian music.' },
      { title: 'Harmonium Basics', duration: '20 min', desc: 'Posture, bellows operation, and your first notes on harmonium.' },
      { title: 'Understanding Taals', duration: '15 min', desc: 'Introduction to rhythm cycles: Teentaal, Rupak, and Keherwa.' },
      { title: 'Simple Alankars', duration: '25 min', desc: 'Ascending and descending note patterns for finger exercises.' },
    ]
  },
  {
    level: 'Intermediate',
    color: 'from-orange-900/50 to-orange-950',
    accent: 'text-orange-400',
    border: 'border-orange-800/50',
    lessons: [
      { title: 'Ragas: Yaman & Bhairav', duration: '30 min', desc: 'Learn the aroha, avaroha, vadi and samvadi of two essential ragas.' },
      { title: 'Meend & Gamak', duration: '25 min', desc: 'Master glide techniques and ornamental oscillations.' },
      { title: 'Teen Taal Composition', duration: '35 min', desc: 'Compose and play a simple bandish in 16-beat cycle.' },
      { title: 'Tabla Accompaniment', duration: '30 min', desc: 'Coordinate your playing with live tabla rhythms.' },
    ]
  },
  {
    level: 'Advanced',
    color: 'from-purple-900/50 to-purple-950',
    accent: 'text-purple-400',
    border: 'border-purple-800/50',
    lessons: [
      { title: 'Raga Improvisation', duration: '45 min', desc: 'Develop your own musical vocabulary within a raga framework.' },
      { title: 'Layakari & Speed', duration: '40 min', desc: 'Double-time and half-time rhythmic variations.' },
      { title: 'Khayal Gayaki Style', duration: '50 min', desc: 'Understand and apply the khayal vocal tradition to instruments.' },
      { title: 'Raga Bhairavi Performance', duration: '60 min', desc: 'Full performance piece in Raga Bhairavi with live drone.' },
    ]
  },
];

export function Lessons() {
  return (
    <section id="lessons" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h2 className="font-display text-3xl font-extrabold text-[#e8eaf0]">Lesson Curriculum</h2>
          <p className="text-sm text-[#7c869a] font-mono">Beginner to Advanced</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {LEVELS.map(lvl => (
          <div key={lvl.level} className={`rounded-2xl border ${lvl.border} bg-gradient-to-b ${lvl.color} overflow-hidden`}>
            <div className="px-5 py-4 border-b border-white/10">
              <span className={`font-display text-lg font-bold ${lvl.accent}`}>{lvl.level}</span>
              <p className="text-xs text-white/50 font-mono mt-0.5">{lvl.lessons.length} lessons</p>
            </div>
            <div className="p-3 space-y-2">
              {lvl.lessons.map(lesson => (
                <div key={lesson.title} className="group p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white leading-snug">{lesson.title}</h3>
                      <p className="text-[11px] text-white/50 font-mono mt-0.5 leading-relaxed">{lesson.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 shrink-0 mt-0.5 transition-colors" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Clock className="w-3 h-3 text-white/30" />
                    <span className="text-[10px] font-mono text-white/40">{lesson.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
