import { Wind } from 'lucide-react';

export function ReverbControl({ reverbOn, onToggle, reverbAmount, onAmountChange }) {
  return (
    <div className="flex items-center gap-4 px-4 py-2.5 rounded-xl border border-[#252b3b] bg-[#12161e]">
      <div className="flex items-center gap-2">
        <Wind className="w-4 h-4 text-[#7c869a]" />
        <span className="text-xs font-semibold text-[#e8eaf0] font-display">Reverb</span>
      </div>
      <button
        onClick={() => onToggle(!reverbOn)}
        className={`relative w-10 h-5 rounded-full transition-colors ${reverbOn ? 'bg-orange-500' : 'bg-[#252b3b]'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${reverbOn ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
      {reverbOn && (
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xs text-[#7c869a] font-mono w-10">
            {Math.round(reverbAmount * 100)}%
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={reverbAmount}
            onChange={(e) => onAmountChange(parseFloat(e.target.value))}
            className="flex-1 accent-orange-500 h-1"
          />
        </div>
      )}
    </div>
  );
}
