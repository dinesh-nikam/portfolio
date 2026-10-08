"use client";

/* ────────────────────────────────────────────────────────────────────
   Story audio engine — SOUND ◌

   Design constraints from the creative brief:
   - Audio NEVER starts on its own. It fades in only after the visitor
     explicitly enables sound, and the choice is remembered per session.
   - The character is warm / introspective / minimal: a soft ambient pad
     plus sparse, quiet piano-like tones. Almost silent at the edges.

   Licensing: no copyrighted music is embedded. This is an original,
   fully procedural ambient placeholder (WebAudio oscillators + filtered
   noise). To ship a licensed or commissioned soundtrack instead, drop
   the file in /public/audio and call `playTrack(url)` from the toggle —
   the fade/mute/session plumbing below stays identical.
   ──────────────────────────────────────────────────────────────────── */

const STORAGE_KEY = "story-sound-enabled";

type Nodes = {
  ctx: AudioContext;
  master: GainNode;
  padStop: () => void;
  melodyStop: () => void;
};

let nodes: Nodes | null = null;

/** Very soft major-9 pentatonic pool — warm, hopeful, nostalgic. */
const TONE_POOL = [220.0, 246.94, 277.18, 329.63, 415.3, 440.0];

function createEngine(): Nodes | null {
  const Ctx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;

  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0;

  // Gentle low-pass so everything sits far back in the mix.
  const warmth = ctx.createBiquadFilter();
  warmth.type = "lowpass";
  warmth.frequency.value = 1200;
  warmth.Q.value = 0.4;

  warmth.connect(master);
  master.connect(ctx.destination);

  /* ── Ambient pad: two detuned triangles + slowly-breathing gain ── */
  const padGain = ctx.createGain();
  padGain.gain.value = 0.05;
  padGain.connect(warmth);

  const oscA = ctx.createOscillator();
  const oscB = ctx.createOscillator();
  oscA.type = "triangle";
  oscB.type = "triangle";
  oscA.frequency.value = 110; // A2
  oscB.frequency.value = 110.7; // slow beat ≈ 0.7 Hz
  oscA.connect(padGain);
  oscB.connect(padGain);

  // Breathing LFO on the pad.
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.06;
  lfoGain.gain.value = 0.02;
  lfo.connect(lfoGain);
  lfoGain.connect(padGain.gain);

  /* ── Air: filtered noise, extremely quiet ── */
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const channel = noiseBuffer.getChannelData(0);
  for (let i = 0; i < channel.length; i += 1) channel[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 800;
  noiseFilter.Q.value = 0.5;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.008;
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(warmth);

  oscA.start();
  oscB.start();
  lfo.start();
  noise.start();

  /* ── Sparse piano-ish tones: random pentatonic plucks ── */
  let melodyTimer = 0;
  const scheduleTone = () => {
    const now = ctx.currentTime;
    const freq = TONE_POOL[Math.floor(Math.random() * TONE_POOL.length)];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);
    osc.connect(gain);
    gain.connect(warmth);
    osc.start(now);
    osc.stop(now + 5);
  };
  const melodyLoop = () => {
    scheduleTone();
    melodyTimer = window.setTimeout(melodyLoop, 3500 + Math.random() * 6000);
  };
  melodyTimer = window.setTimeout(melodyLoop, 1200);

  return {
    ctx,
    master,
    padStop: () => {
      window.clearTimeout(melodyTimer);
      try {
        oscA.stop();
        oscB.stop();
        lfo.stop();
        noise.stop();
      } catch {
        /* already stopped */
      }
    },
    melodyStop: () => window.clearTimeout(melodyTimer),
  };
}

/** Fade the master gain to a level over `duration` seconds. */
function fade(to: number, duration: number): void {
  if (!nodes) return;
  const { ctx, master } = nodes;
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(master.gain.value, now);
  master.gain.linearRampToValueAtTime(to, now + duration);
}

/** True when the visitor enabled sound earlier in this session. */
export function soundWasEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

/** Enable sound: creates the engine lazily, fades in, remembers choice. */
export async function enableSound(): Promise<void> {
  if (!nodes) {
    nodes = createEngine();
    if (!nodes) return;
  }
  if (nodes.ctx.state === "suspended") await nodes.ctx.resume();
  fade(0.5, 2.5);
  sessionStorage.setItem(STORAGE_KEY, "1");
}

/** Mute: fades out but keeps the engine warm for a quick fade back in. */
export function disableSound(): void {
  fade(0, 0.8);
  sessionStorage.setItem(STORAGE_KEY, "0");
}

/** Fully dispose the audio graph (used on unmount). */
export function disposeSound(): void {
  if (!nodes) return;
  fade(0, 0.3);
  const toStop = nodes;
  nodes = null;
  window.setTimeout(() => toStop.padStop(), 400);
}

/**
 * Slot for a licensed/original soundtrack:
 * replace the procedural engine with an <audio>/buffer loop here.
 */
export function playTrack(_url: string): void {
  /* Intentional placeholder — see header comment. */
  void _url;
}

