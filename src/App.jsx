import { useState, useEffect } from 'react';

const API     = import.meta.env.VITE_API_URL  || 'https://api.mypetclub.app/api';
const APP_URL = import.meta.env.VITE_APP_URL  || 'https://app.mypetclub.app';
const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || 'support@mypetclub.app';
const WHATSAPP_IN   = import.meta.env.VITE_WHATSAPP_IN   || '919347411132';
const WHATSAPP_US   = import.meta.env.VITE_WHATSAPP_US   || '16097215754';
const HQ_ADDRESS    = import.meta.env.VITE_HQ_ADDRESS    || 'Sahara, LB Nagar, Hyderabad – 500074';
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(APP_URL)}&color=1a1a2e&bgcolor=ffffff&margin=10`;

/* ── Warm palette ── */
const WARM_DARK  = '#0c0500';
const WARM_DARK2 = '#120700';
const WARM_DARK3 = '#1c0e00';
const WARM_CREAM = '#fff8f0';
const WARM_CREAM2 = '#fff1e0';
const ORANGE  = '#f97316';
const ORANGE2 = '#ea580c';
const AMBER   = '#f59e0b';

/*
 * All photos self-hosted in /public/images/ — downloaded from Unsplash & Pexels.
 * Licenses:
 *   Unsplash Free License: https://unsplash.com/license
 *     — free for commercial use, no attribution required, cannot be resold as stock.
 *   Pexels Free License: https://www.pexels.com/license/
 *     — free for commercial use, no attribution required.
 * Images are served from our own Vercel CDN — zero hotlinking risk.
 */
const IMG = {
  hero:        '/images/hero.jpg',         // Unsplash: dog running in golden field
  catMain:     '/images/cat-main.jpg',     // Unsplash: orange tabby cat portrait
  catCuddle:   '/images/cat-cuddle.jpg',   // Unsplash: cuddly tabby cat
  dogMain:     '/images/dog-main.jpg',     // Unsplash: happy golden dog portrait
  grooming:    '/images/cat-groom.jpg',    // Pexels:   cat being groomed
  training:    '/images/svc-training.jpg', // Unsplash: dog training session
  vet:         '/images/cat-vet.jpg',      // Pexels:   cat at veterinarian
  walking:     '/images/svc-walking.jpg',  // Unsplash: woman walking labrador
  boarding:    '/images/cat-boarding.jpg', // Pexels:   cat resting at home stay
  dogGrooming: '/images/svc-grooming.jpg', // Unsplash: Pomeranian at grooming spa
  dogVet:      '/images/svc-vet.jpg',      // Unsplash: dog at vet clinic
  dogBoarding: '/images/svc-boarding.jpg', // Unsplash: dog on cozy bed
};

const SERVICES = [
  {
    icon: '✂️', title: 'Grooming', price: 'from ₹499',
    desc: 'Bath, haircut, nail trim & full styling for dogs AND cats — at your doorstep by certified groomers.',
    img: IMG.grooming, gradFrom: '#9a3412', gradTo: '#f97316',
    tag: 'Most Popular', tagBg: '#fff7ed', tagColor: '#c2410c',
    bookable: true, catFriendly: true,
  },
  {
    icon: '🐕‍🦺', title: 'Training', price: 'from ₹699',
    desc: 'Obedience, agility & behaviour training by certified professional trainers.',
    img: IMG.training, gradFrom: '#4c1d95', gradTo: '#8b5cf6',
    tag: 'High Demand', tagBg: '#f5f3ff', tagColor: '#6d28d9',
    bookable: true, catFriendly: false,
  },
  {
    icon: '🏥', title: 'Vet Care', price: 'from ₹399',
    desc: 'In-home vet visits, vaccinations & digital health records for cats and dogs alike.',
    img: IMG.vet, gradFrom: '#065f46', gradTo: '#34d399',
    tag: 'Trusted', tagBg: '#ecfdf5', tagColor: '#047857',
    bookable: true, catFriendly: true,
  },
  {
    icon: '🦮', title: 'Dog Walking', price: 'from ₹299',
    desc: 'GPS-tracked solo & group walks by verified walkers. Live updates sent to you.',
    img: IMG.walking, gradFrom: '#14532d', gradTo: '#4ade80',
    tag: 'New', tagBg: '#f0fdf4', tagColor: '#15803d',
    bookable: true, catFriendly: false,
  },
  {
    icon: '🏠', title: 'Pet Boarding', price: 'from ₹499/night',
    desc: 'Cage-free home stays for dogs & cats with verified boarders. Daily photos guaranteed.',
    img: IMG.boarding, gradFrom: '#78350f', gradTo: '#f59e0b',
    tag: 'New', tagBg: '#fffbeb', tagColor: '#b45309',
    bookable: true, catFriendly: true,
  },
  {
    icon: '🍖', title: 'Pet Food', price: 'Free Delivery',
    desc: 'Premium nutrition, treats & supplements for cats and dogs delivered to your door.',
    img: null, gradFrom: '#0e7490', gradTo: '#22d3ee',
    tag: 'Coming Soon', tagBg: '#ecfeff', tagColor: '#0e7490',
    bookable: false, catFriendly: true,
  },
];

const STEPS = [
  { n: '01', icon: '📱', title: 'Open & Sign Up', desc: 'Open mypetclub.app in any browser — no download, no App Store. Create your free account in under 60 seconds with OTP. No passwords needed.' },
  { n: '02', icon: '🐾', title: 'Add Your Pet', desc: 'Build a complete digital profile for your pet — breed, age, health history, vet records — all in one place.' },
  { n: '03', icon: '📅', title: 'Book & Relax', desc: 'Browse verified professionals near you, pick a time, and track your pet\'s appointment live.' },
];

const REVIEWS = [
  { name: 'Priya Sharma', city: 'Mumbai', pet: 'Bruno, Golden Retriever', stars: 5, text: 'The groomer arrived exactly on time and Bruno looks absolutely stunning. Booking through PETclub was super easy — took less than 2 minutes!', avatar: 'P' },
  { name: 'Kavita Reddy', city: 'Hyderabad', pet: 'Whiskers, Persian Cat', stars: 5, text: 'Booking the vet for Whiskers through PETclub was so easy. All her vaccination records are now in the app. Cat parents — this is made for us too!', avatar: 'K' },
  { name: 'Rajiv Nair', city: 'Bengaluru', pet: 'Milo, Labrador', stars: 5, text: 'Our trainer Arjun transformed Milo\'s behaviour in just 4 sessions. The digital tracking in the app is brilliant — I can see every session note.', avatar: 'R' },
  { name: 'James Wilson', city: 'Dallas, TX', pet: 'Max & Luna, GSD + Tabby', stars: 5, text: 'Used PETclub for both my German Shepherd and my cat Luna. The vet handled both perfectly. Incredible service, far better than anything back home!', avatar: 'J' },
];

const COUNTRIES = [
  { code: '91', flag: 'https://flagcdn.com/20x15/in.png', flagAlt: 'IN', label: 'India (+91)', ph: '9876543210' },
  { code: '1',  flag: 'https://flagcdn.com/20x15/us.png', flagAlt: 'US', label: 'USA (+1)',    ph: '4155552671' },
];

/* ── Inquiry modal config ── */
const INQUIRY_CONFIG = {
  'Pet Food': {
    icon: '🍖', color: '#0891b2',
    tagline: 'Premium pet nutrition delivered to your door.',
    placeholder: 'e.g. My Labrador needs grain-free dry food, 10 kg bag monthly. Or: my Persian cat needs hairball control wet food.',
    label: 'Tell us what your pet needs',
  },
  'Pet Boarding': {
    icon: '🏠', color: ORANGE,
    tagline: 'Safe, caring home-away-from-home for your pet.',
    placeholder: 'e.g. Need boarding for a 2-year-old Beagle from Dec 20–27. Or: indoor cat who needs daily feeding & playtime while I travel.',
    label: 'Tell us your boarding requirements',
  },
};

/* ══════════ SHARED SVG ILLUSTRATIONS ══════════ */
function CatFace({ size = 120, color = '#fff', opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      {/* Ears */}
      <polygon points="18,42 28,12 40,38" fill={color} />
      <polygon points="60,38 72,12 82,42" fill={color} />
      {/* Inner ears */}
      <polygon points="24,38 30,20 37,36" fill={color} opacity="0.35" />
      <polygon points="63,36 70,20 76,38" fill={color} opacity="0.35" />
      {/* Head */}
      <ellipse cx="50" cy="60" rx="30" ry="28" fill={color} />
      {/* Eyes */}
      <ellipse cx="37" cy="55" rx="5" ry="6" fill={WARM_DARK} />
      <ellipse cx="63" cy="55" rx="5" ry="6" fill={WARM_DARK} />
      <circle cx="39" cy="53" r="1.5" fill="white" />
      <circle cx="65" cy="53" r="1.5" fill="white" />
      {/* Nose */}
      <polygon points="50,64 46,69 54,69" fill="#f9a8d4" />
      {/* Mouth */}
      <path d="M46,70 Q50,74 54,70" stroke={WARM_DARK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Whiskers left */}
      <line x1="10" y1="64" x2="43" y2="66" stroke={WARM_DARK} strokeWidth="1.2" opacity="0.4" />
      <line x1="10" y1="69" x2="43" y2="70" stroke={WARM_DARK} strokeWidth="1.2" opacity="0.4" />
      {/* Whiskers right */}
      <line x1="57" y1="66" x2="90" y2="64" stroke={WARM_DARK} strokeWidth="1.2" opacity="0.4" />
      <line x1="57" y1="70" x2="90" y2="69" stroke={WARM_DARK} strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

function DogFace({ size = 120, color = '#fff', opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      {/* Floppy ears */}
      <ellipse cx="22" cy="52" rx="13" ry="20" fill={color} opacity="0.75" transform="rotate(-10,22,52)" />
      <ellipse cx="78" cy="52" rx="13" ry="20" fill={color} opacity="0.75" transform="rotate(10,78,52)" />
      {/* Head */}
      <circle cx="50" cy="50" r="27" fill={color} />
      {/* Snout */}
      <ellipse cx="50" cy="64" rx="14" ry="10" fill={color} opacity="0.6" />
      {/* Nose */}
      <ellipse cx="50" cy="58" rx="7" ry="5" fill={WARM_DARK} />
      <ellipse cx="48" cy="57" rx="2" ry="1.5" fill="white" opacity="0.5" />
      {/* Eyes */}
      <circle cx="37" cy="44" r="5.5" fill={WARM_DARK} />
      <circle cx="63" cy="44" r="5.5" fill={WARM_DARK} />
      <circle cx="39" cy="42" r="1.8" fill="white" />
      <circle cx="65" cy="42" r="1.8" fill="white" />
      {/* Mouth */}
      <path d="M43,68 Q50,73 57,68" stroke={WARM_DARK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Tongue */}
      <ellipse cx="50" cy="73" rx="5" ry="4" fill="#f9a8d4" />
    </svg>
  );
}

/* ══════════ INQUIRY MODAL ══════════ */
function InquiryModal({ service, onClose }) {
  const cfg = INQUIRY_CONFIG[service] || INQUIRY_CONFIG['Pet Food'];
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim())  return setError('Please enter your name.');
    if (!form.email.trim()) return setError('Please enter your email.');
    if (!form.message.trim()) return setError('Please describe what you need!');
    setState('loading');
    try {
      const res = await fetch(`${API}/contact/send-link`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(), phone: form.phone ? `+91${form.phone.replace(/\D/g, '')}` : null,
          email: form.email.trim(), service,
          message: `[${service} Inquiry]\n\n${form.message.trim()}`,
        }),
      });
      if (!res.ok) throw new Error();
      setState('done');
    } catch {
      setState('idle');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: '#fff', borderRadius: 28, width: '100%', maxWidth: 520,
        boxShadow: '0 24px 80px rgba(0,0,0,0.3)', overflow: 'hidden',
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)`, padding: '28px 32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 40, marginBottom: 8 }}>{cfg.icon}</div>
              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 22, margin: 0 }}>{service}</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: '4px 0 0' }}>{cfg.tagline}</p>
            </div>
            <button onClick={onClose} style={{
              background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 12,
              width: 36, height: 36, color: '#fff', fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 12,
            }}>✕</button>
          </div>
          <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 16px', fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
            🚀 Launching soon! Fill the form and our team will reach out within <strong>24 hours</strong>.
          </div>
        </div>
        <div style={{ padding: '28px 32px' }}>
          {state === 'done' ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
              <h3 style={{ fontWeight: 900, fontSize: 22, color: '#111', marginBottom: 8 }}>Request Received!</h3>
              <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.6 }}>
                Thanks, <strong>{form.name.split(' ')[0]}</strong>! We'll reach out to <strong>{form.email}</strong> within 24 hours.
              </p>
              <button onClick={onClose} style={{ marginTop: 24, background: cfg.color, color: '#fff', border: 'none', borderRadius: 14, padding: '12px 32px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Close →</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: 12, padding: '10px 16px', fontSize: 13, marginBottom: 16 }}>⚠ {error}</div>}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Full Name *</label>
                  <input type="text" placeholder="Arjun Mehta" required
                    style={{ width: '100%', border: '2px solid #f3f4f6', borderRadius: 12, padding: '10px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Phone</label>
                  <input type="tel" placeholder="9876543210"
                    style={{ width: '100%', border: '2px solid #f3f4f6', borderRadius: 12, padding: '10px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g,'').slice(0,10) }))} />
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Email *</label>
                <input type="email" placeholder="you@example.com" required
                  style={{ width: '100%', border: '2px solid #f3f4f6', borderRadius: 12, padding: '10px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{cfg.label} <span style={{ color: '#ef4444' }}>*</span></label>
                <textarea rows={5} placeholder={cfg.placeholder} required
                  style={{ width: '100%', border: '2px solid #f3f4f6', borderRadius: 12, padding: '10px 14px', fontSize: 13, outline: 'none', resize: 'vertical', lineHeight: 1.6, boxSizing: 'border-box' }}
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <button type="submit" disabled={state === 'loading'}
                style={{ width: '100%', background: cfg.color, color: '#fff', border: 'none', borderRadius: 14, padding: '14px', fontWeight: 900, fontSize: 15, cursor: 'pointer', opacity: state === 'loading' ? 0.7 : 1 }}>
                {state === 'loading' ? 'Sending…' : `📩 Send Inquiry — We'll Reach Out ASAP`}
              </button>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 14 }}>
                {['🔒 Privacy protected', '⚡ 24h response', '🚫 No spam'].map(t => (
                  <span key={t} style={{ fontSize: 11, color: '#9ca3af' }}>{t}</span>
                ))}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════ NAVBAR ══════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [
    { href: '#services', label: 'Services' },
    { href: '#pets', label: 'Cats & Dogs' },
    { href: '#how', label: 'How It Works' },
    { href: '#getapp', label: 'Use App' },
    { href: '#join', label: 'Join' },
    { href: '#contact', label: 'Contact' },
  ];
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="container h-18 flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-2.5">
          <img src="/icon.svg" alt="PETclub" className="w-9 h-9 rounded-xl" />
          <span className={`font-extrabold text-xl transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            PET<span className={scrolled ? 'text-orange-500' : 'text-orange-400'}>club</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className={`text-sm font-semibold transition-colors hover:text-orange-500 ${scrolled ? 'text-gray-600' : 'text-white/90'}`}>{l.label}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${APP_URL}?signin=1`} target="_blank" rel="noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-brand hover:shadow-lg">
            Sign In →
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
          {open ? '✕' : '☰'}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-xl">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block font-semibold text-gray-700 hover:text-orange-500 py-2.5 px-3 rounded-xl hover:bg-orange-50 transition-colors">
              {l.label}
            </a>
          ))}
          <a href={`${APP_URL}?signin=1`} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}
            className="block bg-orange-500 text-white font-bold text-center py-3 rounded-xl mt-3">Sign In →</a>
        </div>
      )}
    </nav>
  );
}

/* ══════════ PHONE MOCKUP ══════════ */
function PhoneMockup() {
  return (
    <div className="relative flex justify-center items-center lg:justify-end">
      <div className="absolute w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(249,115,22,0.28)' }} />
      <div className="absolute w-48 h-48 rounded-full blur-2xl pointer-events-none translate-x-20 -translate-y-10" style={{ background: 'rgba(124,58,237,0.15)' }} />
      <div className="relative rounded-[2.8rem] overflow-hidden border-[5px]"
        style={{
          width: 268, height: 560,
          background: '#0f0e17',
          borderColor: 'rgba(255,255,255,0.10)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.15)',
          animation: 'float 4s ease-in-out infinite',
        }}>
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-white/50 text-[10px] font-semibold">9:41</span>
          <div className="w-16 h-4 bg-black rounded-full" />
          <div className="flex gap-1 items-center">
            <div className="w-3 h-2 rounded-sm" style={{ background: 'rgba(255,255,255,0.4)' }} />
            <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.4)' }} />
          </div>
        </div>
        <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black" style={{ background: ORANGE }}>🐾</div>
          <div className="flex-1">
            <div className="text-white text-xs font-bold">✂️ Sai Krishna • En Route</div>
            <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Grooming • On the way</div>
          </div>
          <div className="flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 4px #4ade80', animation: 'pulse 2s infinite' }} />
            <span className="text-white text-[9px] font-bold">LIVE</span>
          </div>
        </div>
        <div className="relative" style={{ height: 280 }}>
          <svg width="100%" height="100%" viewBox="0 0 258 280" xmlns="http://www.w3.org/2000/svg">
            <rect width="258" height="280" fill="#1a1825"/>
            {[40,80,120,160,200,240].map(y => <line key={y} x1="0" y1={y} x2="258" y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="1"/>)}
            {[40,80,120,160,200].map(x => <line key={x} x1={x} y1="0" x2={x} y2="280" stroke="white" strokeOpacity="0.04" strokeWidth="1"/>)}
            <path d="M0,140 Q80,130 130,120 Q180,110 258,100" stroke="white" strokeOpacity="0.12" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <path d="M0,140 Q80,130 130,120 Q180,110 258,100" stroke="white" strokeOpacity="0.06" strokeWidth="16" fill="none" strokeLinecap="round"/>
            <path d="M80,0 Q90,80 100,140 Q110,200 115,280" stroke="white" strokeOpacity="0.08" strokeWidth="8" fill="none" strokeLinecap="round"/>
            <path d="M70,210 Q90,175 110,155 Q125,140 130,120" stroke="#f97316" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeDasharray="6 3" opacity="0.9"/>
            <path d="M70,210 Q90,175 110,155 Q125,140 130,120" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.15"/>
            <circle cx="70" cy="210" r="18" fill="#f97316" opacity="0.15"/>
            <circle cx="70" cy="210" r="11" fill="#f97316" stroke="white" strokeWidth="2.5"/>
            <text x="70" y="214" textAnchor="middle" fontSize="10" fill="white">🏠</text>
            <circle cx="130" cy="120" r="22" fill="#7c3aed" opacity="0.18"/>
            <circle cx="130" cy="120" r="13" fill="#7c3aed" stroke="white" strokeWidth="2.5"/>
            <text x="130" y="124" textAnchor="middle" fontSize="11" fill="white">✂️</text>
          </svg>
          <div className="absolute pointer-events-none" style={{ top: 84, left: 108, width: 44, height: 44 }}>
            <div className="w-full h-full rounded-full border-2 border-violet-400 opacity-40" style={{ animation: 'ping 1.8s ease-out infinite' }} />
          </div>
        </div>
        <div className="mx-3 mt-2 rounded-2xl p-3 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="text-center">
            <div className="font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 8 }}>ETA</div>
            <div className="text-white text-2xl font-black leading-none">8<span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}> min</span></div>
          </div>
          <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="text-center">
            <div className="font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 8 }}>Status</div>
            <div className="text-violet-400 text-xs font-bold">En Route 🚗</div>
          </div>
          <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="text-center flex-1">
            <div className="font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 8 }}>Service</div>
            <div className="text-white text-xs font-bold">Full Groom</div>
          </div>
        </div>
        <div className="mx-3 mt-2 rounded-xl py-2.5 text-center" style={{ background: ORANGE }}>
          <span className="text-white text-xs font-black tracking-wide">Call Sai →</span>
        </div>
      </div>
      {/* Floating badge */}
      <div className="absolute -left-4 top-16 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-gray-800 border border-gray-100"
        style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.5s' }}>
        <span className="text-lg">📍</span>
        <div><div className="text-gray-900 font-extrabold text-xs">70km Match</div><div className="text-gray-400 font-normal text-[10px]">Nearest verified pro</div></div>
      </div>
      <div className="absolute -right-2 bottom-28 bg-emerald-500 rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-white"
        style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '1s' }}>
        <span className="text-lg">✅</span>
        <div><div className="font-extrabold text-xs">ID Verified</div><div className="font-normal text-emerald-100 text-[10px]">48h compliance</div></div>
      </div>
    </div>
  );
}

/* ══════════ HERO ══════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: `linear-gradient(150deg, ${WARM_DARK} 0%, #3b0d00 28%, #7c2d12 55%, #c2410c 78%, #f97316 100%)` }}>

      {/* Hero background photo — subtle, gives life without fighting the gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={IMG.hero} alt="" aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.18, mixBlendMode: 'luminosity' }} />
      </div>

      {/* Glow orbs */}
      <div className="absolute pointer-events-none" style={{ top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: -100, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)' }} />

      {/* Paw brand mark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img src="/icon.svg" alt="" aria-hidden="true" className="absolute opacity-[0.05]" style={{ width: 240, bottom: -30, right: -30 }} />
      </div>

      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 text-orange-200 text-xs font-bold px-4 py-2 rounded-full mb-5 backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)' }}>
              <img src="https://flagcdn.com/20x15/in.png" alt="India" className="inline-block rounded-sm" />
              India&apos;s #1 Pet Care Platform
              <span className="opacity-40">·</span>
              <img src="https://flagcdn.com/20x15/us.png" alt="USA" className="inline-block rounded-sm" />
              Now in USA
            </div>

            {/* ── P1: Trust strip ── */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7">
              {[
                { icon: '🐾', val: '50,000+', label: 'Pets Served' },
                { icon: '✅', val: '1,200+',  label: 'Verified Pros' },
                { icon: '📍', val: '100+',    label: 'Cities' },
                { icon: '⭐', val: '4.9',     label: 'App Rating' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span className="text-base">{s.icon}</span>
                  <span className="text-white font-black text-sm">{s.val}</span>
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</span>
                </div>
              ))}
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] mb-5">
              Premium Care for<br />
              <span className="text-gradient-white">Dogs &amp; Cats.</span>
            </h1>

            <p className="text-lg mb-4 leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Verified groomers, vets, trainers, walkers &amp; boarders — GPS-tracked, background-checked, loved by 50,000+ pet parents across India &amp; USA.
            </p>

            {/* Pet type pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['🐕 Dogs', '🐱 Cats', '✂️ Grooming', '🏥 Vet', '🎓 Training', '🦮 Walking', '🏠 Boarding'].map(p => (
                <span key={p} className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)' }}>
                  {p}
                </span>
              ))}
            </div>

            {/* Two journey cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <a href="#join" className="group relative rounded-2xl p-5 transition-all hover:shadow-xl active:scale-[0.98] text-left"
                style={{ background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                <div className="text-2xl mb-2">🐾</div>
                <div className="font-extrabold text-base mb-0.5" style={{ color: WARM_DARK }}>I&apos;m a Pet Owner</div>
                <div className="text-xs leading-snug mb-3" style={{ color: '#92400e' }}>Book grooming, training, vet, walking &amp; boarding</div>
                <div className="flex items-center gap-1 text-xs font-bold" style={{ color: ORANGE2 }}>
                  Book a Service <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </a>
              <a href="#join" className="group relative rounded-2xl p-5 transition-all hover:shadow-xl active:scale-[0.98] text-left"
                style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.22)' }}>
                <div className="text-2xl mb-2">💼</div>
                <div className="font-extrabold text-white text-base mb-0.5">I&apos;m a Professional</div>
                <div className="text-xs leading-snug mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>Join as groomer, trainer, vet, walker or boarder</div>
                <div className="flex items-center gap-1 text-xs font-bold text-orange-300">
                  Join as Pro <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              {[
                { v: '50K+', l: 'Happy Pets' },
                { v: '1.2K+', l: 'Verified Pros' },
                { v: '100+', l: 'Cities' },
                { v: '4.9★', l: 'App Rating' },
              ].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-black text-white">{s.v}</div>
                  <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.50)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Phone + floating pet cards */}
          <div className="hidden lg:block relative">
            <PhoneMockup />
            {/* Floating cat card */}
            <div className="absolute -top-6 left-0 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
              style={{ background: '#fff', border: '1px solid #fed7aa', animation: 'float 4.5s ease-in-out infinite', animationDelay: '2s', zIndex: 20 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, #7c2d12, #c2410c)` }}>
                <CatFace size={28} color="white" />
              </div>
              <div>
                <div className="font-extrabold text-xs" style={{ color: WARM_DARK }}>Cat Grooming</div>
                <div className="text-[10px]" style={{ color: '#92400e' }}>Now available ✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: `linear-gradient(to top, ${WARM_DARK}, transparent)` }} />
    </section>
  );
}

/* ══════════ TRUST BANNER ══════════ */
function TrustBanner() {
  const pillars = [
    { icon: '📍', title: '70km Radius Matching', desc: 'Our algorithm matches your pet with the nearest verified professional within 70km — fast, local, reliable.', fromColor: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.25)', iconBg: 'rgba(249,115,22,0.12)', iconColor: ORANGE },
    { icon: '🛡️', title: '48-Hour Compliance Check', desc: 'Every groomer, trainer & vet is manually reviewed — ID proof, certifications & references — before going live.', fromColor: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', iconBg: 'rgba(139,92,246,0.12)', iconColor: '#8b5cf6' },
    { icon: '🔐', title: 'Secure Onboarding', desc: 'OTP-verified accounts, encrypted profiles, zero-password login — every pet parent and professional stays protected.', fromColor: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.25)', iconBg: 'rgba(52,211,153,0.12)', iconColor: '#34d399' },
  ];
  return (
    <section style={{ background: WARM_DARK2, borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '56px 0' }}>
      <div className="container">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{ color: ORANGE, background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)' }}>
            🔒 Trust &amp; Safety — Built Into Every Booking
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map(p => (
            <div key={p.title} className="rounded-3xl p-6 flex gap-4 items-start"
              style={{ background: p.fromColor, border: `1px solid ${p.border}` }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: p.iconBg }}>
                {p.icon}
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base mb-1.5">{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ PETS WE SERVE ══════════ */
function PetsWeServe() {
  const [tab, setTab] = useState('dog');
  const dogServices = ['Grooming', 'Training', 'Vet Care', 'Dog Walking', 'Pet Boarding'];
  const catServices = ['Grooming', 'Vet Care', 'Pet Boarding', 'Pet Food'];

  return (
    <section id="pets" style={{ background: WARM_CREAM, padding: '80px 0' }}>
      <div className="container">
        <div className="text-center mb-10">
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: ORANGE2 }}>For Every Pet</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4" style={{ color: WARM_DARK }}>
            We Love Dogs &amp; Cats Equally
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#92400e' }}>
            Whether you have a fluffy Persian cat or a boisterous Labrador — or both — we&apos;ve got every service covered.
          </p>
        </div>

        {/* ── P2: Tab toggle ── */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-2xl p-1.5 gap-1" style={{ background: '#fff', border: '1px solid #fed7aa', boxShadow: '0 4px 20px rgba(249,115,22,0.10)' }}>
            {[
              { id: 'dog', emoji: '🐕', label: 'For Dogs', activeGrad: `linear-gradient(135deg, ${ORANGE2}, ${ORANGE})`, activeShadow: '0 4px 16px rgba(249,115,22,0.30)' },
              { id: 'cat', emoji: '🐱', label: 'For Cats', activeGrad: 'linear-gradient(135deg, #5b21b6, #8b5cf6)',    activeShadow: '0 4px 16px rgba(139,92,246,0.30)' },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all duration-200"
                style={tab === t.id
                  ? { background: t.activeGrad, color: '#fff', boxShadow: t.activeShadow }
                  : { background: 'transparent', color: '#92400e' }
                }>
                <span className="text-lg">{t.emoji}</span> {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card — only active tab shown */}
        <div className="max-w-2xl mx-auto">

          {/* Dogs panel */}
          {tab === 'dog' && (
            <div className="rounded-3xl overflow-hidden shadow-xl animate-fade-up" style={{ boxShadow: '0 20px 60px rgba(249,115,22,0.22)' }}>
              <div className="relative overflow-hidden" style={{ height: 260, background: `linear-gradient(135deg, #7c2d12, ${ORANGE})` }}>
                <img src={IMG.dogMain} alt="Golden retriever"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0.85, objectPosition: '50% 25%' }}
                  onError={e => e.target.style.display = 'none'} />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(124,45,18,0.25) 0%, rgba(249,115,22,0.60) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="text-4xl mb-1">🐕</div>
                  <h3 className="text-3xl font-black text-white mb-0.5">For Your Dog</h3>
                  <p className="text-orange-100 text-sm font-medium">All breeds · all sizes · all ages</p>
                </div>
              </div>
              <div style={{ background: '#fff7ed', padding: '28px 32px' }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {dogServices.map(s => (
                    <div key={s} className="flex items-center gap-2.5 rounded-2xl px-4 py-3"
                      style={{ background: '#fff', border: '1px solid #fed7aa' }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                        style={{ background: ORANGE2 }}>✓</span>
                      <span className="text-sm font-semibold" style={{ color: '#7c2d12' }}>{s}</span>
                    </div>
                  ))}
                </div>
                <a href={APP_URL} target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 font-black text-sm transition-all hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${ORANGE2}, ${ORANGE})`, color: '#fff', boxShadow: '0 8px 24px rgba(249,115,22,0.30)' }}>
                  Book for Your Dog →
                </a>
              </div>
            </div>
          )}

          {/* Cats panel */}
          {tab === 'cat' && (
            <div className="rounded-3xl overflow-hidden shadow-xl animate-fade-up" style={{ boxShadow: '0 20px 60px rgba(139,92,246,0.22)' }}>
              <div className="relative overflow-hidden" style={{ height: 260, background: 'linear-gradient(135deg, #4c1d95, #8b5cf6)' }}>
                <img src={IMG.catMain} alt="Orange tabby cat"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0.85, objectPosition: '50% 30%' }}
                  onError={e => e.target.style.display = 'none'} />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(76,29,149,0.25) 0%, rgba(109,40,217,0.65) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="text-4xl mb-1">🐱</div>
                  <h3 className="text-3xl font-black text-white mb-0.5">For Your Cat</h3>
                  <p className="text-purple-100 text-sm font-medium">Persian · Siamese · tabby &amp; more</p>
                </div>
              </div>
              <div style={{ background: '#f5f3ff', padding: '28px 32px' }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {catServices.map(s => (
                    <div key={s} className="flex items-center gap-2.5 rounded-2xl px-4 py-3"
                      style={{ background: '#fff', border: '1px solid #ddd6fe' }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                        style={{ background: '#7c3aed' }}>✓</span>
                      <span className="text-sm font-semibold" style={{ color: '#4c1d95' }}>{s}</span>
                    </div>
                  ))}
                  {['Training', 'Walking'].map(s => (
                    <div key={s} className="flex items-center gap-2.5 rounded-2xl px-4 py-3"
                      style={{ background: 'rgba(255,255,255,0.5)', border: '1px dashed #c4b5fd' }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                        style={{ background: '#ede9fe', color: '#7c3aed' }}>→</span>
                      <span className="text-xs font-medium" style={{ color: '#7c3aed' }}>{s} <span style={{ opacity: 0.6 }}>(soon)</span></span>
                    </div>
                  ))}
                </div>
                <a href={APP_URL} target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 font-black text-sm transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #5b21b6, #8b5cf6)', color: '#fff', boxShadow: '0 8px 24px rgba(139,92,246,0.30)' }}>
                  Book for Your Cat →
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Combined household badge */}
        <div className="mt-8 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
          style={{ background: `linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.08))`, border: `1px solid rgba(249,115,22,0.20)` }}>
          <div className="text-4xl flex gap-1">🐕🐱</div>
          <div className="flex-1">
            <div className="font-extrabold text-lg mb-1" style={{ color: WARM_DARK }}>Multi-pet household?</div>
            <div className="text-sm" style={{ color: '#92400e' }}>One app, one account — manage all your pets' profiles, health records, and bookings in a single place.</div>
          </div>
          <a href={APP_URL} target="_blank" rel="noreferrer"
            className="whitespace-nowrap rounded-2xl px-6 py-3 font-bold text-sm transition-all hover:opacity-90"
            style={{ background: ORANGE, color: '#fff', boxShadow: '0 6px 20px rgba(249,115,22,0.28)' }}>
            Add All Pets →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════ SERVICES ══════════ */
function Services() {
  const [inquiryService, setInquiryService] = useState(null);

  return (
    <section id="services" className="section-pad bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: ORANGE }}>Our Services</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">Everything Your Pet Needs</h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">Verified professionals, transparent pricing, live tracking — all in one app.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(s => {
            const cardInner = (
              <>
                {/* Photo header with gradient overlay + CSS gradient fallback */}
                <div className="relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500"
                  style={{ height: 210, background: `linear-gradient(135deg, ${s.gradFrom}, ${s.gradTo})` }}>
                  {s.img && (
                    <img
                      src={s.img}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  )}
                  {/* Dual gradient overlay: top branding tint + bottom readability */}
                  <div className="absolute inset-0" style={{
                    background: `linear-gradient(to bottom, ${s.gradFrom}55 0%, transparent 40%, rgba(0,0,0,0.55) 100%)`
                  }} />
                  {/* Tag */}
                  <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm"
                    style={{ background: s.tagBg, color: s.tagColor }}>{s.tag}</span>
                  {/* Bookable / inquiry badge */}
                  {!s.bookable && (
                    <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 text-gray-700">✉ Inquiry</span>
                  )}
                  {/* Bottom row: icon + cat badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className="text-3xl drop-shadow-lg">{s.icon}</span>
                    {s.catFriendly && (
                      <div className="flex items-center gap-1 rounded-full px-2.5 py-1"
                        style={{ background: 'rgba(0,0,0,0.40)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}>
                        <CatFace size={13} color="white" />
                        <span className="text-white text-[10px] font-bold">Cats too!</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-extrabold text-gray-900 text-lg leading-tight">{s.title}</h3>
                    <span className="shrink-0 text-xs font-black px-2.5 py-1 rounded-xl whitespace-nowrap"
                      style={{ background: 'rgba(249,115,22,0.10)', color: ORANGE2, border: '1px solid rgba(249,115,22,0.22)' }}>
                      {s.price}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                  {s.bookable ? (
                    <div className="flex items-center font-bold text-sm gap-1 group-hover:gap-2 transition-all" style={{ color: ORANGE }}>
                      Book Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-green-600 font-bold text-sm gap-1 group-hover:gap-2 transition-all">
                      Get in Touch <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  )}
                </div>
              </>
            );

            return s.bookable ? (
              <a key={s.title} href={APP_URL} target="_blank" rel="noreferrer" className="card-service group">{cardInner}</a>
            ) : (
              <button key={s.title} type="button" onClick={() => setInquiryService(s.title)} className="card-service group text-left">{cardInner}</button>
            );
          })}
        </div>
      </div>
      {inquiryService && <InquiryModal service={inquiryService} onClose={() => setInquiryService(null)} />}
    </section>
  );
}

/* ══════════ HOW IT WORKS ══════════ */
function HowItWorks() {
  return (
    <section id="how" className="section-pad" style={{ background: WARM_CREAM2 }}>
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: ORANGE2 }}>Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4" style={{ color: WARM_DARK }}>Get Started in 3 Easy Steps</h2>
          <p className="text-base" style={{ color: '#92400e' }}>From sign-up to your first booking in under 5 minutes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 z-0"
            style={{ background: 'linear-gradient(to right, #fed7aa, #f97316, #fed7aa)' }} />

          {STEPS.map((s, i) => (
            <div key={s.n} className="relative text-center z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white border text-4xl mb-6 shadow-xl"
                style={{ borderColor: '#fed7aa', boxShadow: '0 8px 32px rgba(249,115,22,0.12)' }}>
                {s.icon}
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shadow-brand"
                style={{ background: ORANGE }}>
                {i + 1}
              </div>
              <h3 className="text-xl font-extrabold mb-3" style={{ color: WARM_DARK }}>{s.title}</h3>
              <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: '#92400e' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ REVIEWS ══════════ */
function Stars({ n }) {
  return <span className="text-amber-400">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

function Reviews() {
  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container">
        <div className="text-center mb-14">
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: ORANGE }}>Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-2">Loved by Dogs &amp; Cat Parents</h2>
          <p className="text-gray-500 text-base inline-flex items-center gap-1.5">
            Real stories from real pet families&nbsp;
            <img src="https://flagcdn.com/20x15/in.png" alt="India" className="inline-block rounded-sm" />
            <img src="https://flagcdn.com/20x15/us.png" alt="USA" className="inline-block rounded-sm" />
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map(r => (
            <div key={r.name} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-card hover:shadow-xl transition-all hover:-translate-y-1">
              <Stars n={r.stars} />
              <p className="text-gray-700 text-sm leading-relaxed mt-3 mb-5 italic">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)' }}>
                  {r.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.city} · {r.pet}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ USE THE APP ══════════ */
function GetApp() {
  const platforms = [
    {
      icon: '🍎',
      title: 'iPhone / iPad',
      step: 'Open in Safari',
      desc: 'Tap the Share icon ⎙ → "Add to Home Screen" → Done. Sits on your home screen exactly like a native app — no App Store, no download.',
      cta: 'Open in Safari →',
      href: APP_URL,
      accent: 'rgba(249,115,22,0.18)',
    },
    {
      icon: '🤖',
      title: 'Android Phone',
      step: 'Open in Chrome',
      desc: 'Tap the ⋮ menu → "Add to Home Screen" (or tap the Install banner that appears automatically). One tap — it\'s on your phone.',
      cta: 'Open in Chrome →',
      href: APP_URL,
      accent: 'rgba(52,211,153,0.14)',
    },
    {
      icon: '💻',
      title: 'Desktop / Laptop',
      step: 'Open in any browser',
      desc: 'Works in Chrome, Edge, Safari, Firefox on Windows, Mac & Linux. In Chrome or Edge, click the install icon ⊕ in the address bar to pin it.',
      cta: 'Open App →',
      href: APP_URL,
      accent: 'rgba(139,92,246,0.14)',
    },
  ];

  return (
    <section id="getapp" className="section-pad overflow-hidden relative" style={{ background: WARM_DARK3 }}>
      <div className="absolute pointer-events-none" style={{ top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)' }} />

      <div className="container relative z-10">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: AMBER }}>Use Anywhere</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4 leading-tight">
            No App Store Needed.<br />
            <span className="text-gradient">Works Everywhere, Instantly.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>
            PETclub is a web app — open it in your browser and add it to your home screen in two taps.
            No download, no waiting, no App Store approval. Same experience on every device.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Platform cards */}
          <div className="space-y-4">
            {platforms.map(p => (
              <div key={p.title} className="rounded-2xl p-5 flex gap-4 items-start"
                style={{ background: p.accent, border: '1px solid rgba(255,255,255,0.10)' }}>
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                  style={{ background: 'rgba(255,255,255,0.10)' }}>
                  {p.icon}
                </div>
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-extrabold text-white text-base">{p.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(249,115,22,0.25)', color: '#fed7aa' }}>
                      {p.step}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.60)' }}>{p.desc}</p>
                  <a href={p.href} target="_blank" rel="noreferrer"
                    className="inline-flex items-center text-xs font-bold rounded-xl px-4 py-2 transition-all hover:opacity-90"
                    style={{ background: ORANGE, color: '#fff' }}>
                    {p.cta}
                  </a>
                </div>
              </div>
            ))}

            {/* No-download assurance strip */}
            <div className="flex flex-wrap gap-4 pt-2">
              {['✅ No App Store', '✅ No download', '✅ No waiting', '✅ Free forever'].map(t => (
                <span key={t} className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.50)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* QR code + open button */}
          <div className="flex flex-col items-center">
            <div className="rounded-3xl p-6 mb-6 text-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <div className="bg-white p-4 rounded-2xl inline-block mb-4">
                <img src={QR_URL} alt="Scan to open PETclub" width={180} height={180} className="rounded-xl block" />
              </div>
              <p className="text-white font-bold text-sm mb-1">📷 Point your camera here</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>iPhone & Android cameras open it instantly — no QR app needed</p>
            </div>

            <a href={APP_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-brand hover:shadow-lg text-base"
              style={{ background: ORANGE }}>
              🚀 Open PETclub Now
            </a>
            <p className="text-xs mt-3 text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Works on any device · any browser · any OS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ JOIN SECTION ══════════ */
const JOIN_ROLES = [
  { id: 'owner', icon: '🐾', title: 'Pet Owner', subtitle: 'I want to book services', perks: ['Book grooming, training, vet, walking & boarding', 'Live GPS tracking of your pro', 'Digital health records for all your pets'], color: ORANGE, bg: 'bg-orange-50', border: 'border-orange-200', tag: 'Most Popular', tagColor: 'bg-orange-100 text-orange-700' },
  { id: 'groomer', icon: '✂️', title: 'Groomer', subtitle: 'I offer grooming services', perks: ['Get discovered by pet owners', 'Manage bookings & availability', 'Grow 5-star reviews'], color: '#7c3aed', bg: 'bg-violet-50', border: 'border-violet-200', tag: 'High Earning', tagColor: 'bg-violet-100 text-violet-700' },
  { id: 'trainer', icon: '🎓', title: 'Trainer', subtitle: 'I provide dog training', perks: ['Set your own schedule & rates', 'Certified trainer badge', 'Track client progress'], color: '#2563eb', bg: 'bg-blue-50', border: 'border-blue-200', tag: 'In Demand', tagColor: 'bg-blue-100 text-blue-700' },
  { id: 'vet', icon: '🏥', title: 'Veterinarian', subtitle: 'I provide vet care', perks: ['In-clinic & home visit bookings', 'Digital prescription records', 'Verified vet badge'], color: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200', tag: 'Trusted', tagColor: 'bg-emerald-100 text-emerald-700' },
  { id: 'walker', icon: '🦮', title: 'Dog Walker', subtitle: 'I walk dogs', perks: ['GPS-tracked walks sent to owners', 'Flexible daily schedule', 'Verified walker badge'], color: '#16a34a', bg: 'bg-green-50', border: 'border-green-200', tag: 'New', tagColor: 'bg-green-100 text-green-700' },
  { id: 'boarder', icon: '🏠', title: 'Pet Boarder', subtitle: 'I host pets at home', perks: ['Cage-free home environment', 'Daily photo & video updates', 'Verified boarder badge'], color: '#d97706', bg: 'bg-amber-50', border: 'border-amber-200', tag: 'New', tagColor: 'bg-amber-100 text-amber-700' },
];

const LEFT_PANELS = {
  owner:   { headline: 'Your pet deserves the best.', sub: 'Join 50,000+ pet parents who book verified groomers, trainers, vets, walkers & boarders — with live GPS tracking.', img: 'https://images.unsplash.com/photo-1607696442638-93393692197a?w=900&auto=format&fit=crop&q=85', stats: [{ v: '50K+', l: 'Happy Pets' }, { v: '4.9★', l: 'Rating' }, { v: '100+', l: 'Cities' }] },
  groomer: { headline: 'Grow your grooming business.', sub: 'Join our verified groomer network and get discovered by thousands of pet owners — for dogs and cats.', img: 'https://images.unsplash.com/photo-1611173622933-91942d394b04?w=900&auto=format&fit=crop&q=85', stats: [{ v: '1.2K+', l: 'Active Pros' }, { v: '₹25K+', l: 'Avg Monthly' }, { v: '24h', l: 'Verification' }] },
  trainer: { headline: 'Turn your passion into income.', sub: 'Connect with pet owners who need expert training. Set your rates, manage your schedule.', img: 'https://images.unsplash.com/photo-1551779891-b83901e1f8b3?w=900&auto=format&fit=crop&q=85', stats: [{ v: '₹699+', l: 'Per Session' }, { v: 'Flex', l: 'Schedule' }, { v: '24h', l: 'Approval' }] },
  vet:     { headline: 'Reach more patients digitally.', sub: 'Offer in-clinic and home visit care to verified pet owners. Digital records, seamless booking.', img: 'https://images.unsplash.com/photo-1630438994394-3deff7a591bf?w=900&auto=format&fit=crop&q=85', stats: [{ v: 'Verified', l: 'Badge' }, { v: 'Digital', l: 'Rx Records' }, { v: '24/7', l: 'Bookings' }] },
  walker:  { headline: 'Earn doing what you love.', sub: 'Join our GPS-verified walker network. Flexible hours, instant bookings, and a trusted badge.', img: 'https://images.unsplash.com/photo-1618946019619-9d7b7d86b48f?w=900&auto=format&fit=crop&q=85', stats: [{ v: '₹299+', l: 'Per Walk' }, { v: 'GPS', l: 'Tracked' }, { v: '24h', l: 'Approval' }] },
  boarder: { headline: 'Turn your home into a pet haven.', sub: 'Host dogs and cats in your cage-free home and earn. Daily photos, GPS check-ins, verified boarder badge.', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&auto=format&fit=crop&q=85', stats: [{ v: '₹499+', l: 'Per Night' }, { v: 'Home', l: 'Boarding' }, { v: '24h', l: 'Approval' }] },
};

function JoinSection() {
  const [step, setStep]       = useState(1);
  const [role, setRole]       = useState(null);
  const [cc,   setCC]         = useState('91');
  const [form, setForm]       = useState({ name: '', phone: '', email: '', city: '' });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const selectedRole = JOIN_ROLES.find(r => r.id === role);
  const country      = COUNTRIES.find(c => c.code === cc);
  const panel        = LEFT_PANELS[role] || LEFT_PANELS.owner;

  const pickRole = (id) => { setRole(id); setStep(2); setError(''); };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) return setError('Please enter your name');
    if (!form.phone || form.phone.length < 6) return setError('Enter a valid phone number');
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError('Enter a valid email');
    setLoading(true);
    try {
      await fetch(`${API}/contact/send-link`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), phone: `+${cc}${form.phone}`, email: form.email.trim(), role, city: form.city.trim() }),
      });
      setStep(3);
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <section id="join" className="bg-white">
      {/* Step progress */}
      <div className="border-b border-gray-100">
        <div className="container flex items-center gap-0 py-0">
          {['Choose Your Role', 'Your Details', 'All Set!'].map((label, i) => {
            const n = i + 1;
            const done = step > n; const current = step === n;
            return (
              <div key={label} className="flex items-center flex-1">
                <div className={`flex items-center gap-2.5 py-4 text-sm font-semibold transition-colors ${current ? 'text-orange-500' : done ? 'text-emerald-600' : 'text-gray-400'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${current ? 'bg-orange-500 text-white shadow-brand' : done ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {done ? '✓' : n}
                  </div>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-px mx-3 transition-colors ${step > n ? 'bg-emerald-300' : 'bg-gray-100'}`} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="section-pad">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: ORANGE }}>Get Started Free</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-3">Who are you joining as?</h2>
              <p className="text-gray-500 text-lg">Pick your role — you can always add more later.</p>
            </div>
            <div className="max-w-5xl mx-auto mb-6 grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-2xl px-5 py-3">
                <span className="text-2xl">🐾</span>
                <div><div className="font-extrabold text-gray-900 text-sm">For Pet Owners</div><div className="text-xs text-gray-500">Book services for your dog or cat</div></div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3">
                <span className="text-2xl">💼</span>
                <div><div className="font-extrabold text-gray-900 text-sm">For Service Providers</div><div className="text-xs text-gray-500">Earn by offering grooming, training, vet care, walking or boarding</div></div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {JOIN_ROLES.map(r => (
                <button key={r.id} type="button" data-role={r.id} onClick={() => pickRole(r.id)}
                  className={`group relative text-left rounded-3xl border-2 p-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] ${r.bg} ${r.border}`}>
                  <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full ${r.tagColor}`}>{r.tag}</span>
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">{r.icon}</div>
                  <div className="font-extrabold text-gray-900 text-lg mb-0.5">{r.title}</div>
                  <div className="text-sm text-gray-500 mb-5">{r.subtitle}</div>
                  <ul className="space-y-2">
                    {r.perks.map(p => (
                      <li key={p} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="font-black mt-0.5 shrink-0" style={{ color: r.color }}>✓</span>{p}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1.5 mt-6 text-sm font-bold transition-all" style={{ color: r.color }}>
                    Get started <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-400 mt-8">
              Already have an account?{' '}
              <a href={`${APP_URL}?signin=1`} target="_blank" rel="noreferrer" className="font-bold hover:underline" style={{ color: ORANGE }}>Sign in →</a>
            </p>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && selectedRole && (
        <div className="min-h-[600px] grid lg:grid-cols-2">
          <div className="relative overflow-hidden bg-gray-900 flex flex-col justify-end p-10 min-h-[280px] lg:min-h-0">
            <img src={panel.img} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold text-white mb-6"
                style={{ background: selectedRole.color + '33', border: `1px solid ${selectedRole.color}66` }}>
                <span>{selectedRole.icon}</span> {selectedRole.title}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">{panel.headline}</h2>
              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-sm">{panel.sub}</p>
              <div className="flex gap-6">
                {panel.stats.map(s => (
                  <div key={s.l}><div className="text-xl font-black text-white">{s.v}</div><div className="text-xs text-gray-400 font-medium">{s.l}</div></div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10">
                <span className="text-amber-400">★★★★★</span>
                <span className="text-gray-400 text-xs">Rated 4.9 by 45,000+ users</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-14 bg-white">
            <button onClick={() => { setStep(1); setRole(null); setError(''); }}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 mb-8 transition-colors group w-fit">
              <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span> Back
            </button>
            <div className="mb-8">
              <h3 className="text-2xl font-black text-gray-900 mb-1">Create your account</h3>
              <p className="text-gray-500 text-sm">Takes under 60 seconds. No password needed.</p>
            </div>
            {error && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-2xl mb-5"><span>⚠</span> {error}</div>}
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                <input type="text" placeholder={role === 'vet' ? 'Dr. Priya Sharma' : 'Arjun Mehta'}
                  className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all placeholder-gray-300"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mobile Number</label>
                <div className="flex border-2 border-gray-100 rounded-2xl overflow-hidden focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-50 transition-all">
                  <div className="relative">
                    <select value={cc} onChange={e => { setCC(e.target.value); setForm(f => ({ ...f, phone: '' })); }}
                      className="appearance-none bg-gray-50 border-r-2 border-gray-100 px-4 py-3.5 text-sm font-bold text-gray-700 focus:outline-none pr-8 cursor-pointer">
                      {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flagAlt} +{c.code}</option>)}
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
                  </div>
                  <input type="tel" inputMode="numeric" placeholder={country?.ph} maxLength={15}
                    className="flex-1 px-4 py-3.5 text-sm font-medium focus:outline-none placeholder-gray-300"
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 15) }))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" placeholder="you@example.com"
                  className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all placeholder-gray-300"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Your City {role !== 'owner' && <span className="text-gray-400 normal-case font-normal">— where you operate</span>}
                </label>
                <input type="text" placeholder={role === 'owner' ? 'Mumbai, Delhi, Hyderabad…' : 'e.g. Hyderabad'}
                  className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all placeholder-gray-300"
                  value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full font-black py-4 rounded-2xl text-white text-sm transition-all disabled:opacity-60 shadow-brand hover:opacity-90 active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${selectedRole.color}, ${selectedRole.color}dd)` }}>
                {loading ? 'Creating account…' : `Continue as ${selectedRole.title} →`}
              </button>
            </form>
            <div className="flex items-center justify-center gap-5 mt-7 pt-6 border-t border-gray-50">
              {['🔒 No password', '⚡ 60 sec setup', '🚫 No spam ever'].map(t => (
                <span key={t} className="text-xs text-gray-400 font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="section-pad">
          <div className="container">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-24 h-24 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-5xl mx-auto mb-8">🎉</div>
              <h2 className="text-4xl font-black text-gray-900 mb-3">You&apos;re all set!</h2>
              <p className="text-gray-500 text-lg mb-3">We&apos;ve sent the app link to <strong>{form.email}</strong></p>
              <p className="text-gray-400 text-sm mb-10">
                {selectedRole?.id === 'owner'
                  ? 'Open the app, add your pet(s), and book your first service in under 2 minutes.'
                  : 'Open the app to complete your professional profile. Verification takes 24–48 hours.'}
              </p>
              <a href={APP_URL} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 text-white font-black px-8 py-4 rounded-2xl text-base transition-all shadow-brand hover:shadow-lg active:scale-[0.98]"
                style={{ background: ORANGE }}>
                {selectedRole?.icon} Open PETclub App →
              </a>
              <p className="text-xs text-gray-400 mt-5">
                Or scan the QR code in the <a href="#getapp" className="font-semibold hover:underline" style={{ color: ORANGE }}>Get App section</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ══════════ CONTACT ══════════ */
function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim()) { setError('Name and email are required'); return; }
    setState('loading');
    try {
      const res = await fetch(`${API}/contact/send-link`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone ? `+91${form.phone.replace(/\D/g,'')}` : '+910000000000', email: form.email, message: form.message }),
      });
      if (!res.ok) throw new Error('Failed');
      setState('done');
    } catch { setState('idle'); setError('Something went wrong. Please try again.'); }
  };

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: ORANGE }}>Contact Us</span>
            <h2 className="text-4xl font-black text-gray-900 mt-3 mb-6">Let&apos;s Talk 🐾</h2>
            <p className="text-gray-500 text-lg mb-10">Questions, partnerships, or just want to say hi — we&apos;d love to hear from you.</p>
            <div className="space-y-6">
              {[
                { icon: '📧', title: 'Email', content: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-gray-500 text-sm hover:text-orange-500 transition-colors">{SUPPORT_EMAIL}</a> },
                { icon: '📱', title: 'WhatsApp', content: (
                  <div className="space-y-1">
                    <a href={`https://wa.me/${WHATSAPP_IN}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors">
                      <img src="https://flagcdn.com/20x15/in.png" alt="IN" className="rounded-sm" /> <span>+{WHATSAPP_IN.replace(/^91/, '91 ')}</span>
                    </a>
                    <a href={`https://wa.me/${WHATSAPP_US}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors">
                      <img src="https://flagcdn.com/20x15/us.png" alt="US" className="rounded-sm" /> <span>+{WHATSAPP_US.replace(/^1/, '1 ')}</span>
                    </a>
                  </div>
                )},
                { icon: '📍', title: 'HQ', content: <span className="text-gray-500 text-sm">{HQ_ADDRESS}</span> },
                { icon: '⏰', title: 'Support Hours', content: <span className="text-gray-500 text-sm">Mon–Sat, 9 AM – 7 PM IST</span> },
              ].map(item => (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0" style={{ background: WARM_CREAM, border: `1px solid #fed7aa` }}>{item.icon}</div>
                  <div><div className="font-bold text-gray-900 text-sm mb-0.5">{item.title}</div>{item.content}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            {state === 'done' ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">Message received!</h3>
                <p className="text-gray-500">We&apos;ll get back within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h3 className="font-extrabold text-xl text-gray-900 mb-5">Send a Message</h3>
                {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">⚠ {error}</div>}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Name *</label>
                    <input type="text" placeholder="Your name" required className="input-clean" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Phone</label>
                    <input type="tel" placeholder="10-digit number" className="input-clean" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g,'').slice(0,15) }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Email *</label>
                  <input type="email" placeholder="you@example.com" required className="input-clean" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Message</label>
                  <textarea rows={4} placeholder="How can we help?" className="input-clean resize-none" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <button type="submit" disabled={state === 'loading'} className="btn-primary w-full disabled:opacity-60">
                  {state === 'loading' ? 'Sending…' : '📩 Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ FOOTER ══════════ */
function Footer() {
  const [inquiryService, setInquiryService] = useState(null);
  const BOOKABLE_SERVICES = ['Grooming', 'Training', 'Vet Care', 'Dog Walking', 'Pet Boarding'];
  const INQUIRY_SERVICES  = ['Pet Food'];

  return (
    <footer style={{ background: WARM_DARK, color: 'rgba(255,255,255,0.50)' }} className="pt-16 pb-8">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/icon.svg" alt="PETclub" className="w-8 h-8 rounded-lg" />
              <span className="font-extrabold text-white text-lg">PET<span style={{ color: ORANGE }}>club</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-2">Premium pet care for dogs &amp; cats — grooming, training, vet, walking &amp; boarding across India and USA.</p>
            <div className="flex items-center gap-1 mb-4 text-xs" style={{ color: AMBER }}>
              <span>🐕 Dogs</span><span style={{ opacity: 0.4 }}>·</span><span>🐱 Cats</span><span style={{ opacity: 0.4 }}>·</span><span>All Breeds</span>
            </div>
            <div className="flex gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <img src="https://flagcdn.com/20x15/in.png" alt="IN" className="rounded-sm" /> India
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <img src="https://flagcdn.com/20x15/us.png" alt="US" className="rounded-sm" /> USA
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Services</h4>
            {BOOKABLE_SERVICES.map(s => (
              <a key={s} href={APP_URL} target="_blank" rel="noreferrer" className="block text-sm py-1 transition-colors hover:text-orange-400">{s}</a>
            ))}
            {INQUIRY_SERVICES.map(s => (
              <button key={s} type="button" onClick={() => setInquiryService(s)} className="block text-sm py-1 transition-colors hover:text-orange-400 text-left w-full">
                {s} <span className="text-xs opacity-50 ml-1">✉</span>
              </button>
            ))}
            {inquiryService && <InquiryModal service={inquiryService} onClose={() => setInquiryService(null)} />}
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Company</h4>
            {[
              { label: 'About Us',  href: '/about.html' },
              { label: 'Careers',   href: '/careers.html' },
              { label: 'Blog',      href: '/blog.html' },
              { label: 'Press',     href: '/press.html' },
              { label: 'Partners',  href: '/partners.html' },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="block text-sm py-1 transition-colors hover:text-orange-400">{label}</a>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Get App</h4>
            <div className="bg-white p-3 rounded-2xl inline-block mb-3">
              <img src={QR_URL} alt="QR" width={100} height={100} className="rounded-lg block" />
            </div>
            <p className="text-xs">Scan to open the web app instantly</p>
            <a href={APP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-3 text-sm font-bold transition-colors hover:text-orange-300" style={{ color: ORANGE }}>Open App →</a>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span>© {new Date().getFullYear()} PETclub India. Made with 🐾 for pets everywhere.</span>
          <div className="flex gap-5">
            <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms</a>
            <a href="/privacy.html#cookies" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════ P1: STICKY MOBILE BOOK BAR ══════════ */
function StickyBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 320);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
      style={{ background: WARM_DARK, borderTop: '1px solid rgba(255,255,255,0.10)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center gap-3 px-4 py-3">
        {/* WhatsApp */}
        <a href={`https://wa.me/${WHATSAPP_IN}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-all hover:scale-105"
          style={{ background: '#25d366' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
        {/* Book Now CTA */}
        <a href={APP_URL} target="_blank" rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5 font-black text-sm text-white transition-all hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${ORANGE2}, ${ORANGE})`, boxShadow: '0 4px 20px rgba(249,115,22,0.40)' }}>
          🐾 Book a Service — Free
        </a>
      </div>
    </div>
  );
}

/* ══════════ P3: WHATSAPP DESKTOP FLOAT ══════════ */
function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div className={`hidden md:block fixed bottom-8 right-6 z-50 transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      {open && (
        <div className="mb-3 w-72 rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}>
          <div className="px-5 py-4 flex items-center gap-3" style={{ background: '#25d366' }}>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-xl">🐾</div>
            <div>
              <div className="text-white font-extrabold text-sm">PETclub Support</div>
              <div className="text-green-100 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-200 inline-block" />
                Typically replies in minutes
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white text-lg leading-none">✕</button>
          </div>
          <div className="px-5 py-4 space-y-2">
            <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 leading-relaxed">
              Hi! 👋 How can we help your pet today?
            </div>
            <div className="flex gap-2 flex-wrap pt-1">
              {['Book a service', 'Join as Pro', 'Track my booking'].map(q => (
                <a key={q} href={`https://wa.me/${WHATSAPP_IN}?text=${encodeURIComponent(q)}`} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:bg-green-50"
                  style={{ borderColor: '#25d366', color: '#15803d' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
          <div className="px-5 pb-4">
            <a href={`https://wa.me/${WHATSAPP_IN}`} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-black text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#25d366' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 ml-auto"
        style={{ background: '#25d366', boxShadow: '0 8px 32px rgba(37,211,102,0.45)' }}>
        {open
          ? <span className="text-white text-xl font-bold">✕</span>
          : <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        }
      </button>
    </div>
  );
}

/* ══════════ APP ══════════ */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBanner />
      <PetsWeServe />
      <Services />
      <HowItWorks />
      <Reviews />
      <GetApp />
      <JoinSection />
      <Contact />
      <Footer />
      {/* P1: sticky mobile CTA */}
      <StickyBar />
      {/* P3: WhatsApp desktop float */}
      <WhatsAppFloat />
    </>
  );
}
