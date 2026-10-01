const fs = require('fs');
const path = require('path');

const sampleRate = 22050;

function createWav(buffer, totalSamples, sampleRate) {
  const dataLength = totalSamples * 2;
  const wavBuffer = Buffer.alloc(44 + dataLength);
  wavBuffer.write('RIFF', 0);
  wavBuffer.writeUInt32LE(36 + dataLength, 4);
  wavBuffer.write('WAVE', 8);
  wavBuffer.write('fmt ', 12);
  wavBuffer.writeUInt32LE(16, 16);
  wavBuffer.writeUInt16LE(1, 20); // PCM
  wavBuffer.writeUInt16LE(1, 22); // Mono
  wavBuffer.writeUInt32LE(sampleRate, 24);
  wavBuffer.writeUInt32LE(sampleRate * 2, 28);
  wavBuffer.writeUInt16LE(2, 32);
  wavBuffer.writeUInt16LE(16, 34);
  wavBuffer.write('data', 36);
  wavBuffer.writeUInt32LE(dataLength, 40);

  for (let i = 0; i < totalSamples; i++) {
    const sample = Math.max(-1, Math.min(1, buffer[i]));
    const int16 = sample < 0 ? sample * 32768 : sample * 32767;
    wavBuffer.writeInt16LE(Math.floor(int16), 44 + i * 2);
  }
  return wavBuffer;
}

const noteFreqs = {
  'G2': 98.00, 'A2': 110.00, 'B2': 123.47, 'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F#3': 185.00, 'G3': 196.00,
  'A3': 220.00, 'B3': 246.94, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F#4': 369.99, 'G4': 392.00,
  'A4': 440.00, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F#5': 739.99, 'G5': 783.99,
  'A5': 880.00, 'B5': 987.77,
};

function generateTrack(progression, bpm, outFile) {
  const secondsPerBeat = 60 / bpm;
  const totalBars = progression.length;
  const totalDuration = totalBars * 4 * secondsPerBeat;
  const totalSamples = Math.floor(totalDuration * sampleRate);
  const buffer = new Float32Array(totalSamples);

  function playNote(freq, startSample, durationSamples, volume, isBass = false) {
    if (!freq) return;
    for (let i = 0; i < durationSamples; i++) {
      const idx = startSample + i;
      if (idx >= totalSamples) break;
      const t = i / sampleRate;
      const attack = Math.min(1, i / (sampleRate * 0.005));
      const decayRate = isBass ? 1.2 : 2.4;
      const envelope = attack * Math.exp(-t * decayRate);

      const s1 = Math.sin(2 * Math.PI * freq * t);
      const s2 = 0.35 * Math.sin(2 * Math.PI * freq * 2 * t);
      const s3 = 0.15 * Math.sin(2 * Math.PI * freq * 3 * t);
      const s4 = 0.05 * Math.sin(2 * Math.PI * freq * 4 * t);
      const chorus = Math.sin(2 * Math.PI * (freq * 1.002) * t) * 0.15;

      buffer[idx] += (s1 + s2 + s3 + s4 + chorus) * envelope * volume;
    }
  }

  progression.forEach((bar, barIdx) => {
    const barStart = Math.floor(barIdx * 4 * secondsPerBeat * sampleRate);
    const bassFreq = noteFreqs[bar.bass];
    playNote(bassFreq, barStart, Math.floor(sampleRate * secondsPerBeat * 2.8), 0.35, true);
    playNote(bassFreq, barStart + Math.floor(sampleRate * secondsPerBeat * 2), Math.floor(sampleRate * secondsPerBeat * 1.8), 0.25, true);

    bar.chords.forEach((chordNote, chordIdx) => {
      const chordFreq = noteFreqs[chordNote];
      const offset = Math.floor(chordIdx * 0.25 * secondsPerBeat * sampleRate);
      playNote(chordFreq, barStart + offset, Math.floor(sampleRate * secondsPerBeat * 3), 0.18);
    });

    const eighthStep = (4 * secondsPerBeat) / bar.melody.length;
    bar.melody.forEach((melNote, melIdx) => {
      const melFreq = noteFreqs[melNote];
      const melStart = barStart + Math.floor(melIdx * eighthStep * sampleRate);
      playNote(melFreq, melStart, Math.floor(sampleRate * 2.2), 0.28);
    });
  });

  const delaySamples = Math.floor(sampleRate * 0.32);
  for (let i = delaySamples; i < totalSamples; i++) {
    buffer[i] += buffer[i - delaySamples] * 0.28;
  }

  let maxAmp = 0;
  for (let i = 0; i < totalSamples; i++) {
    const abs = Math.abs(buffer[i]);
    if (abs > maxAmp) maxAmp = abs;
  }
  const normFactor = maxAmp > 0.95 ? 0.95 / maxAmp : 0.9;
  for (let i = 0; i < totalSamples; i++) {
    buffer[i] *= normFactor;
  }

  const wavData = createWav(buffer, totalSamples, sampleRate);
  fs.writeFileSync(outFile, wavData);
  console.log(`Saved: ${outFile} (${(wavData.length / 1024).toFixed(1)} KB)`);
}

const outDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Track 1: Golden Hour Piano
const track1 = [
  { bass: 'G2', chords: ['G3', 'B3', 'D4', 'F#4'], melody: ['B4', 'D5', 'F#5', 'G5', 'F#5', 'D5', 'B4', 'A4'] },
  { bass: 'E3', chords: ['E3', 'G3', 'B3', 'D4'], melody: ['G4', 'B4', 'D5', 'E5', 'D5', 'B4', 'G4', 'F#4'] },
  { bass: 'C3', chords: ['C3', 'E3', 'G3', 'B3'], melody: ['E4', 'G4', 'B4', 'C5', 'B4', 'G4', 'E4', 'D4'] },
  { bass: 'D3', chords: ['D3', 'F#3', 'A3', 'D4'], melody: ['D4', 'G4', 'A4', 'D5', 'A4', 'F#4', 'E4', 'D4'] },
  { bass: 'G2', chords: ['G3', 'B3', 'D4', 'F#4'], melody: ['D5', 'G5', 'F#5', 'D5', 'B4', 'D5', 'G5', 'A5'] },
  { bass: 'E3', chords: ['E3', 'G3', 'B3', 'D4'], melody: ['B5', 'G5', 'E5', 'D5', 'B4', 'E5', 'D5', 'B4'] },
  { bass: 'C3', chords: ['C3', 'E3', 'G3', 'B3'], melody: ['G4', 'B4', 'D5', 'E5', 'D5', 'B4', 'G4', 'A4'] },
  { bass: 'D3', chords: ['D3', 'F#3', 'A3', 'C4'], melody: ['A4', 'B4', 'D5', 'A4', 'G4', 'D4', 'B3', 'G3'] },
];
generateTrack(track1, 64, path.join(outDir, 'golden-hour-piano.wav'));

// Track 2: Until I Found You (Slow 50s Ballad)
const track2 = [
  { bass: 'C3', chords: ['C3', 'E3', 'G3', 'C4'], melody: ['C4', 'E4', 'G4', 'A4', 'G4', 'E4', 'D4', 'C4'] },
  { bass: 'A2', chords: ['A2', 'C3', 'E3', 'A3'], melody: ['C4', 'E4', 'A4', 'B4', 'A4', 'E4', 'D4', 'C4'] },
  { bass: 'F#3', chords: ['D3', 'F#3', 'A3', 'D4'], melody: ['D4', 'F#4', 'A4', 'B4', 'A4', 'F#4', 'E4', 'D4'] },
  { bass: 'G2', chords: ['G3', 'B3', 'D4', 'G4'], melody: ['D4', 'G4', 'B4', 'C5', 'B4', 'G4', 'F#4', 'G4'] },
  { bass: 'C3', chords: ['C3', 'E3', 'G3', 'C4'], melody: ['E4', 'G4', 'C5', 'D5', 'C5', 'G4', 'E4', 'D4'] },
  { bass: 'A2', chords: ['A2', 'C3', 'E3', 'A3'], melody: ['C4', 'E4', 'A4', 'C5', 'A4', 'E4', 'C4', 'B3'] },
  { bass: 'D3', chords: ['D3', 'F#3', 'A3', 'D4'], melody: ['F#4', 'A4', 'D5', 'E5', 'D5', 'A4', 'F#4', 'D4'] },
  { bass: 'G2', chords: ['G3', 'B3', 'D4', 'F#4'], melody: ['B4', 'C5', 'D5', 'B4', 'G4', 'D4', 'B3', 'G3'] },
];
generateTrack(track2, 58, path.join(outDir, 'until-i-found-you.wav'));
