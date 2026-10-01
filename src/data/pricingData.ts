import type { PricingPackage, CustomizationData } from '../types';

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'standard',
    name: 'Paket Template Instant',
    tagline: 'Gunakan template eksklusif buatan DLYS',
    price: 'Rp 39.000',
    originalPrice: 'Rp 69.000',
    badge: 'Paling Populer',
    isPopular: true,
    description: 'Cocok buat kamu yang mau langsung jadi cepat tanpa ribet desain. Tinggal masukkan teks pesan, foto kenangan, dan pilih lagu favorit kalian.',
    features: [
      'Gunakan template pilihan dari katalog DLYS',
      'Bebas ubah semua teks & surat cinta',
      'Upload 1 - 5 foto kenangan polaroid',
      'Musik romantis pilihan berdua',
      'Link personal aktif selamanya (dlys.love/m/nama-kalian)',
      'Watermark "DLYS Preview" otomatis hilang',
      'Bebas revisi teks & foto kapan saja',
      'Pengerjaan instan langsung aktif setelah pembayaran',
    ],
  },
  {
    id: 'custom-theme',
    name: 'Paket Custom Theme Eksklusif',
    tagline: 'Desain khusus dibuatkan oleh DLYS Team',
    price: 'Rp 99.000',
    originalPrice: 'Rp 149.000',
    badge: 'Desain Eksklusif',
    isPopular: false,
    description: 'Punya konsep cerita cinta yang unik? DLYS Team akan membuatkan tema, warna, animasi, ilustrasi, dan alur interaktif baru khusus untuk kisah kalian.',
    features: [
      'Semua fitur Paket Template Instant',
      'Desain tema & visual dibuat eksklusif oleh DLYS Team',
      'Bebas request konsep warna & nuansa (Cyberpunk, Retro 90s, Pastel Anime, dll)',
      'Animasi & alur interaktif spesial sesuai request',
      'Konsultasi 1-on-1 via WhatsApp langsung dengan DLYS Team',
      'Bisa custom audio voice note rekaman suara asli kamu',
      'Link QR Code estetik siap cetak (untuk kartu/buket bunga)',
      'Garansi revisi desain sampai puas',
    ],
  },
  {
    id: 'romance-novel',
    name: 'Paket Digital Romance Novel',
    tagline: 'Perjalanan cinta diubah jadi e-book novel kontemporer',
    price: 'Rp 149.000',
    originalPrice: 'Rp 249.000',
    badge: '✨ Hardcover & E-Book',
    isPopular: true,
    description: 'Koleksi paling eksklusif DLYS Atelier. Kenangan, foto kencan pertama, percakapan bermakna, dan milestone hubungan Anda dirajut menjadi novel kontemporer editorial elegan.',
    features: [
      'Semua fitur e-book novel "OUR STORY" interaktif',
      'Format hardcover navy & matte gold debossed foil',
      'Bab pembuka novel, rekreasi chat biner, & memoir kencan pertama',
      '9 Milestone timeline perjalanan cinta horizontal',
      'Bonus file print-ready PDF (siap cetak fisik Royal Octavo / A5)',
      'Soundtrack piano romantis & tautan privat aktif selamanya',
      'Asistensi penataan narasi & editing oleh DLYS Editorial Team',
      'QR Code estetik siap cetak untuk kartu kado / buket bunga',
    ],
  },
];

export const ROMANTIC_SONGS = [
  { title: 'Golden Hour (Lofi Piano)', artist: 'JVKE ft. Chill Clouds', url: '/audio/golden-hour-piano.wav' },
  { title: 'Until I Found You', artist: 'Stephen Sanchez', url: '/audio/until-i-found-you.wav' },
  { title: 'Saturn (Romantic Piano)', artist: 'Sleeping At Last', url: '/audio/golden-hour-piano.wav' },
  { title: 'La Vie En Rose (Acoustic Strings)', artist: 'Acoustic Strings', url: '/audio/until-i-found-you.wav' },
  { title: 'Bloom (Gentle Guitar & Piano)', artist: 'The Paper Kites', url: '/audio/golden-hour-piano.wav' },
  { title: 'Nothing (Warm Slowdance)', artist: 'Bruno Major', url: '/audio/until-i-found-you.wav' },
  { title: 'Satu Bulan (Piano Cover)', artist: 'Bernadya', url: '/audio/until-i-found-you.wav' },
  { title: 'Sempurna (Acoustic Version)', artist: 'Andra and The Backbone', url: '/audio/golden-hour-piano.wav' },
  { title: 'About You (Lofi Piano)', artist: 'The 1975', url: '/audio/until-i-found-you.wav' },
];

export const SAMPLE_ROMANTIC_PROMPTS = [
  {
    label: 'Romantis & Puitis',
    headline: 'Untuk orang yang membuat dunia ini terasa lebih lembut',
    message: 'Dua tahun lalu kamu hadir di hidupku dan mengubah hari-hari biasa menjadi kenangan favoritku. Terima kasih untuk setiap tawa kecil di dalam mobil, obrolan larut malam, dan caramu selalu menggenggam tanganku. Aku bersyukur memiliki kamu.',
    ps: 'P.S. Coba cek saku jaketmu sebelum kita makan malam nanti ya ✨',
  },
  {
    label: 'Anniversary Jadian',
    headline: 'Selamat hari jadian untuk orang paling favorit sedunia',
    message: 'Nggak kerasa sudah 730 hari kita bareng-bareng. Dari yang awalnya cuma strangers di kedai kopi waktu hujan, sekarang jadi orang yang selalu kucari setiap hari. Semoga kita terus saling menemani sampai tua nanti ya sayang.',
    ps: 'P.S. Malam ini kamu nggak boleh nolak dessert pilihan aku! 🍦',
  },
  {
    label: 'Ulang Tahun Manis',
    headline: 'Selamat bertambah usia, manusia paling berharga',
    message: 'Selamat ulang tahun untuk orang yang senyumnya selalu berhasil memperbaiki hari terburukku. Semoga di usia barumu ini, semua impianmu tercapai satu per satu. Dan aku akan selalu ada di sampingmu untuk merayakannya.',
    ps: 'P.S. Kado aslinya sudah menunggumu, tapi link ini khusus buat bikin kamu tersenyum duluan!',
  },
  {
    label: 'Manis & Lucu (Playful)',
    headline: 'Sertifikat penghargaan untuk pasangan tersabar',
    message: 'Terima kasih sudah mau sabar mendengarkan ceritaku yang random, mau berbagi kentang goreng tanpa ngeluh, dan selalu bikin aku tertawa bahkan saat aku lagi ngambek. You are my favorite weirdo.',
    ps: 'P.S. Voucher pijat punggung berlaku seumur hidup tanpa syarat dan ketentuan!',
  },
];

export const DEFAULT_WHATSAPP_NUMBER = '6285786947920'; // Nomor WhatsApp DLYS Team

export const generateWhatsAppOrderUrl = (
  pkg: PricingPackage,
  data: CustomizationData,
  templateTitle: string,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER,
  draftCode?: string
): string => {
  const codeSnippet = draftCode ? `%0A• Kode Draft: \`${draftCode}\`%0A` : '';
  const specialRequest =
    pkg.id === 'romance-novel'
      ? 'Pemesanan Paket E-Book Romance Novel (Termasuk 9 Halaman Novel, Chat Biner, Milestone Timeline & File Print-Ready PDF)'
      : pkg.id === 'custom-theme'
      ? 'Mau request konsep tema khusus'
      : 'Sesuai preview draft';

  const text =
    `Halo DLYS Team! 💌✨%0A%0A` +
    `Saya ingin konfirmasi pemesanan produk DLYS:%0A` +
    `━━━━━━━━━━━━━━━━━━%0A` +
    `• Paket: *${encodeURIComponent(pkg.name)}* (${encodeURIComponent(pkg.price)})%0A` +
    `• Produk/Template: *${encodeURIComponent(templateTitle)}*%0A` +
    `• Untuk Pasangan: *${encodeURIComponent(data.recipientName)}*%0A` +
    `• Dari: *${encodeURIComponent(data.senderName)}*%0A` +
    `• Tanggal Spesial: *${encodeURIComponent(data.specialDate || '03 Oktober')}*%0A` +
    `• Lagu Latar: *${encodeURIComponent(data.song.title)}*%0A` +
    codeSnippet +
    `• Catatan Layanan: *${encodeURIComponent(specialRequest)}*%0A` +
    `━━━━━━━━━━━━━━━━━━%0A` +
    `Tolong info nomor rekening / QRIS untuk pembayarannya ya, terima kasih DLYS Team! 🙏❤️`;

  return `https://wa.me/${phoneNumber}?text=${text}`;
};
