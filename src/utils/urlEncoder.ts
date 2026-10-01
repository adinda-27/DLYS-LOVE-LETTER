import type { CustomizationData } from '../types';
import { TEMPLATES_DATA } from '../data/mockData';
import { ROMANTIC_SONGS } from '../data/pricingData';

// Compact representation to keep URL length minimal and clean
export interface CompactLoveLetterPayload {
  t: string;       // templateId
  r: string;       // recipientName
  s: string;       // senderName
  h: string;       // headline
  m: string;       // message
  d: string;       // specialDate
  sg: string;      // song title
  su?: string;     // song url (if custom or local)
  p?: string;      // main photo URL
  q: string;       // question
  a1: string;      // acceptButton
  a2: string;      // secondButton
  ps?: string;     // psNote
}

/**
 * Safely encodes a CustomizationData object into a Base64 URL-safe string
 */
export const encodeLoveLetter = (data: CustomizationData): string => {
  try {
    // Only encode photo if it's not a massive local base64 (to prevent URL overflow)
    const photoToEncode = data.photos[0]?.startsWith('data:image') && data.photos[0].length > 1000
      ? 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop'
      : data.photos[0];

    const compact: CompactLoveLetterPayload = {
      t: data.templateId || 'vintage-parchment',
      r: data.recipientName.trim(),
      s: data.senderName.trim(),
      h: data.headline.trim(),
      m: data.message.trim(),
      d: data.specialDate,
      sg: data.song.title,
      su: data.song.url,
      p: photoToEncode,
      q: data.questionPrompt.question.trim(),
      a1: data.questionPrompt.acceptButton.trim(),
      a2: data.questionPrompt.secondButton.trim(),
      ps: data.psNote?.trim(),
    };

    const jsonString = JSON.stringify(compact);
    // Encode UTF-8 safely before btoa
    const utf8Bytes = encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    );
    const base64 = btoa(utf8Bytes);
    // URL-safe base64: replace + with - and / with _
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (err) {
    console.error('Failed to encode love letter:', err);
    return '';
  }
};

/**
 * Safely decodes a URL-safe Base64 string back into CustomizationData
 */
export const decodeLoveLetter = (encoded: string): CustomizationData | null => {
  try {
    // Restore standard base64 from URL-safe
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }

    const utf8Bytes = atob(base64);
    const jsonString = decodeURIComponent(
      Array.from(utf8Bytes)
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const compact: CompactLoveLetterPayload = JSON.parse(jsonString);

    // Resolve song from catalog or fallback
    const matchedSong = ROMANTIC_SONGS.find((s) => s.title === compact.sg) || {
      title: compact.sg || 'Golden Hour (Lofi Piano)',
      artist: 'DLYS Acoustic Collection',
      url: compact.su || '/audio/golden-hour-piano.wav',
    };

    const result: CustomizationData = {
      templateId: compact.t || TEMPLATES_DATA[0].id,
      recipientName: compact.r || 'Sayang',
      senderName: compact.s || 'Aku',
      headline: compact.h || 'Untuk Orang Paling Spesial',
      message: compact.m || 'Terima kasih sudah selalu ada di setiap langkah perjalananku.',
      specialDate: compact.d || '2024-11-14',
      song: matchedSong,
      photos: compact.p
        ? [compact.p]
        : ['https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop'],
      questionPrompt: {
        question: compact.q || 'Maukah kamu terus menemaniku?',
        acceptButton: compact.a1 || 'Iya, mau! ❤️',
        secondButton: compact.a2 || 'Pasti mau! ✨',
      },
      psNote: compact.ps || 'P.S. Aku sayang kamu selalu.',
    };

    return result;
  } catch (err) {
    console.error('Failed to decode love letter:', err);
    return null;
  }
};

/**
 * Builds the full real shareable URL for the recipient
 */
export const buildShareableUrl = (data: CustomizationData): string => {
  const code = encodeLoveLetter(data);
  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : 'https://dlys.love/';
  return `${baseUrl}?letter=${code}`;
};
