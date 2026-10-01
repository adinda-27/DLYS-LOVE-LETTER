import type { CustomizationData } from '../types';
import { TEMPLATES_DATA } from '../data/mockData';
import { ROMANTIC_SONGS } from '../data/pricingData';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://gmcnahanakoiiwhwztwy.supabase.co';
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtY25haGFuYWtvaWl3aHd6dHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1OTgyNjQsImV4cCI6MjEwNjE3NDI2NH0.ZG0wAY1r3xWlZ9cu1QlL5y5B8WByOT2B66jaMi5u0AM';

const getHeaders = (extraHeaders: Record<string, string> = {}) => ({
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  ...extraHeaders,
});

export interface LoveLetterDbRow {
  id: string;
  slug: string;
  recipient_name: string;
  sender_name: string;
  headline?: string;
  message?: string;
  special_date?: string;
  song_title?: string;
  song_url?: string;
  photo_url?: string;
  question?: string;
  accept_button?: string;
  second_button?: string;
  ps_note?: string;
  template_id?: string;
  package_type?: string;
  is_paid: boolean;
  view_count: number;
  created_at: string;
}

/**
 * Creates a clean URL-friendly slug, e.g. "maya-julian" or "maya-julian-8f"
 */
export const generateSlug = (recipient: string, sender: string): string => {
  const clean = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'love';

  const base = `${clean(recipient)}-${clean(sender)}`;
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${base}-${randomSuffix}`;
};

/**
 * Saves a customized love letter into Supabase DB
 */
export const saveLetterToSupabase = async (
  data: CustomizationData,
  packageType: string = 'standard'
): Promise<{ success: boolean; slug?: string; id?: string; error?: string }> => {
  try {
    const slug = generateSlug(data.recipientName, data.senderName);

    // Filter large data URLs to avoid DB bloat if user uploaded local photo without storage
    const photoToSave =
      data.photos[0]?.startsWith('data:image') && data.photos[0].length > 100000
        ? 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop'
        : data.photos[0];

    const payload = {
      slug,
      recipient_name: data.recipientName.trim(),
      sender_name: data.senderName.trim(),
      headline: data.headline.trim(),
      message: data.message.trim(),
      special_date: data.specialDate,
      song_title: data.song.title,
      song_url: data.song.url,
      photo_url: photoToSave,
      question: data.questionPrompt.question.trim(),
      accept_button: data.questionPrompt.acceptButton.trim(),
      second_button: data.questionPrompt.secondButton.trim(),
      ps_note: data.psNote?.trim(),
      template_id: data.templateId || 'vintage-parchment',
      package_type: packageType,
      is_paid: false, // Pending WhatsApp payment confirmation
      view_count: 0,
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/love_letters`, {
      method: 'POST',
      headers: getHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Supabase save error:', errText);
      return { success: false, error: errText };
    }

    const inserted = await response.json();
    return {
      success: true,
      slug,
      id: inserted[0]?.id,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Supabase connection error:', message);
    return { success: false, error: message };
  }
};

/**
 * Fetches a love letter by its unique short slug
 */
export const getLetterBySlug = async (
  slug: string
): Promise<{ success: boolean; data?: CustomizationData; row?: LoveLetterDbRow; error?: string }> => {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/love_letters?slug=eq.${encodeURIComponent(slug)}&select=*`,
      {
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      return { success: false, error: 'Surat tidak ditemukan' };
    }

    const rows: LoveLetterDbRow[] = await response.json();
    if (!rows || rows.length === 0) {
      return { success: false, error: 'Surat tidak ditemukan' };
    }

    const row = rows[0];

    // Fire and forget increment view count
    fetch(`${SUPABASE_URL}/rest/v1/love_letters?id=eq.${row.id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ view_count: (row.view_count || 0) + 1 }),
    }).catch(() => {});

    // Resolve song
    const song = ROMANTIC_SONGS.find((s) => s.title === row.song_title) || {
      title: row.song_title || 'Golden Hour (Lofi Piano)',
      artist: 'DLYS Collection',
      url: row.song_url || '/audio/golden-hour-piano.wav',
    };

    const customization: CustomizationData = {
      templateId: row.template_id || TEMPLATES_DATA[0].id,
      recipientName: row.recipient_name,
      senderName: row.sender_name,
      headline: row.headline || 'Untuk Orang Paling Spesial',
      message: row.message || '',
      specialDate: row.special_date || '2024-11-14',
      song,
      photos: row.photo_url
        ? [row.photo_url]
        : ['https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop'],
      questionPrompt: {
        question: row.question || 'Maukah kamu terus bersamaku?',
        acceptButton: row.accept_button || 'Iya, mau! ❤️',
        secondButton: row.second_button || 'Pasti mau! ✨',
      },
      psNote: row.ps_note || '',
    };

    return { success: true, data: customization, row };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
};

/**
 * Fetches all orders for the DLYS Team Admin Dashboard
 */
export const getAllLettersForAdmin = async (): Promise<LoveLetterDbRow[]> => {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/love_letters?select=*&order=created_at.desc`,
      {
        headers: getHeaders(),
      }
    );

    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

/**
 * Updates a letter's paid / active status
 */
export const updateLetterPaidStatus = async (
  id: string,
  isPaid: boolean
): Promise<boolean> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/love_letters?id=eq.${id}`, {
      method: 'PATCH',
      headers: getHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify({ is_paid: isPaid }),
    });
    return response.ok;
  } catch {
    return false;
  }
};
