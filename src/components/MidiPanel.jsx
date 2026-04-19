import { Usb, Wifi, WifiOff, RefreshCw } from 'lucide-react';

export function MidiPanel({ supported, devices, selectedDeviceId, connected, lastNote, onConnect, onDisconnect, onDeviceChange, onRefresh, midiNoteToName }) {
  return (
    <div className={`rounded-xl border p-4 ${connected ? 'border-orange-500/50 reverb-on' : 'border-[#252b3b]'} bg-[#12161e] transition-all`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Usb className="w-4 h-4 text-orange-400" />
          <span className="font-display text-sm font-semibold text-[#e8eaf0]">MIDI Device</span>
        </div>
        <div className="flex items-center gap-2">
          {connected ? (
            <span className="flex items-center gap-1 text-xs text-green-400 font-mono midi-pulse">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span> Connected
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-[#7c869a] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#7c869a] inline-block"></span> Not connected
            </span>
          )}
        </div>
      </div>

      {!supported ? (
        <p className="text-xs text-yellow-400/80 font-mono">Web MIDI not supported in this browser. Try Chrome.</p>
      ) : (
        <>
          <div className="flex gap-2 mb-3">
            <select
              value={selectedDeviceId || ''}
              onChange={(e) => onDeviceChange(e.target.value)}
              className="flex-1 bg-[#1a1f2e] border border-[#252b3b] rounded-lg px-3 py-1.5 text-sm text-[#e8eaf0] font-mono focus:outline-none focus:border-orange-500"
            >
              <option value="">Select MIDI device…</option>
              {devices.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <button
              onClick={onRefresh}
              className="px-2 py-1.5 rounded-lg border border-[#252b3b] hover:border-orange-500/50 transition-colors"
              title="Refresh devices"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#7c869a]" />
            </button>
          </div>
          <div className="flex gap-2">
            {!connected ? (
              <button
                onClick={() => onConnect(selectedDeviceId)}
                disabled={!selectedDeviceId}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors"
              >
                <Wifi className="w-3.5 h-3.5" /> Connect MIDI
              </button>
            ) : (
              <button
                onClick={onDisconnect}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252b3b] hover:bg-red-500/20 hover:border-red-500/50 border border-[#252b3b] text-[#e8eaf0] text-xs font-semibold transition-colors"
              >
                <WifiOff className="w-3.5 h-3.5" /> Disconnect
              </button>
            )}
            {lastNote && (
              <span className="ml-auto flex items-center gap-1 text-xs font-mono text-orange-400">
                Note: {midiNoteToName(lastNote.note)} vel:{Math.round(lastNote.velocity * 127)}
              </span>
            )}
          </div>
          {devices.length === 0 && (
            <p className="mt-2 text-xs text-[#7c869a] font-mono">No MIDI devices found. Connect a device and refresh.</p>
          )}
        </>
      )}
    </div>
  );
}
