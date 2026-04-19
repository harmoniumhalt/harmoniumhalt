import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Web MIDI API integration hook.
 * Provides device selection, connection status, and note callbacks.
 */
export function useMidi(onNoteOn, onNoteOff) {
  const [supported, setSupported] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [connected, setConnected] = useState(false);
  const [lastNote, setLastNote] = useState(null);
  const midiAccessRef = useRef(null);
  const activeInputRef = useRef(null);
  const onNoteOnRef = useRef(onNoteOn);
  const onNoteOffRef = useRef(onNoteOff);

  useEffect(() => { onNoteOnRef.current = onNoteOn; }, [onNoteOn]);
  useEffect(() => { onNoteOffRef.current = onNoteOff; }, [onNoteOff]);

  // MIDI message handler
  const handleMidiMessage = useCallback((event) => {
    const [status, note, velocity] = event.data;
    const command = status & 0xf0;

    if (command === 0x90 && velocity > 0) {
      // Note ON
      setLastNote({ note, velocity });
      if (onNoteOnRef.current) onNoteOnRef.current(note, velocity / 127);
    } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
      // Note OFF
      if (onNoteOffRef.current) onNoteOffRef.current(note);
    }
  }, []);

  // Request MIDI access
  const requestMidi = useCallback(async () => {
    if (!navigator.requestMIDIAccess) {
      setSupported(false);
      return;
    }
    try {
      const access = await navigator.requestMIDIAccess();
      midiAccessRef.current = access;
      setSupported(true);

      const refreshDevices = () => {
        const list = [];
        access.inputs.forEach((input) => {
          list.push({ id: input.id, name: input.name, manufacturer: input.manufacturer });
        });
        setDevices(list);
      };
      refreshDevices();
      access.onstatechange = refreshDevices;
    } catch {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    requestMidi();
  }, [requestMidi]);

  // Connect to selected device
  const connect = useCallback((deviceId) => {
    if (!midiAccessRef.current) return;
    // Disconnect previous
    if (activeInputRef.current) {
      activeInputRef.current.onmidimessage = null;
      activeInputRef.current = null;
    }
    if (!deviceId) { setConnected(false); return; }

    const input = midiAccessRef.current.inputs.get(deviceId);
    if (input) {
      input.onmidimessage = handleMidiMessage;
      activeInputRef.current = input;
      setConnected(true);
      setSelectedDeviceId(deviceId);
    }
  }, [handleMidiMessage]);

  const disconnect = useCallback(() => {
    if (activeInputRef.current) {
      activeInputRef.current.onmidimessage = null;
      activeInputRef.current = null;
    }
    setConnected(false);
    setSelectedDeviceId(null);
  }, []);

  // MIDI note number to frequency
  const midiNoteToFreq = useCallback((note) => {
    return 440 * Math.pow(2, (note - 69) / 12);
  }, []);

  // MIDI note number to note name
  const midiNoteToName = useCallback((note) => {
    const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(note / 12) - 1;
    return names[note % 12] + octave;
  }, []);

  return {
    supported,
    devices,
    selectedDeviceId,
    connected,
    lastNote,
    connect,
    disconnect,
    midiNoteToFreq,
    midiNoteToName,
    requestMidi,
  };
}
