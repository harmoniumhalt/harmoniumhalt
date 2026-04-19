import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Priya Sharma',
    role: 'Carnatic Vocalist, Delhi',
    text: 'Helium Dock transformed my riyaz routine. The tanpura drone is incredibly realistic and the raga trainer helped me understand Yaman much faster than I expected.',
    rating: 5,
    avatar: 'PS',
  },
  {
    name: 'Rohan Mehta',
    role: 'Tabla Student, Mumbai',
    text: 'The tabla bols sound authentic and the keyboard shortcuts make practice feel like a real drum session. I use it every morning before my guru\'s class.',
    rating: 5,
    avatar: 'RM',
  },
  {
    name: 'Ananya Iyer',
    role: 'Piano Teacher, Bangalore',
    text: 'Finally an online platform with REAL sounds — not those tinny MIDI samples. My students use it on their tablets and the touch response is excellent.',
    rating: 5,
    avatar: 'AI',
  },
  {
    name: 'Vikram Singh',
    role: 'Music Enthusiast, Jaipur',
    text: 'I connected my MIDI keyboard and it worked instantly with the harmonium. The velocity sensitivity is real and it feels like playing an actual instrument.',
    rating: 5,
    avatar: 'VS',
  },
];

export function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl font-extrabold text-[#e8eaf0] mb-2">Loved by Musicians</h2>
        <p className="text-[#7c869a] text-sm font-mono">From beginners to professional artists</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REVIEWS.map(review => (
          <div key={review.name} className="p-5 rounded-2xl border border-[#252b3b] bg-[#12161e] relative">
            <Quote className="absolute top-4 right-4 w-6 h-6 text-orange-500/20" />
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              ))}
            </div>
            <p className="text-sm text-[#7c869a] leading-relaxed mb-4">{review.text}</p>
            <div className="flex items-center gap-3 pt-3 border-t border-[#252b3b]">
              <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-mono font-bold text-orange-400">{review.avatar}</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#e8eaf0]">{review.name}</div>
                <div className="text-[10px] text-[#7c869a] font-mono">{review.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
