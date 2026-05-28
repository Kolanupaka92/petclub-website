import { useState, useEffect, useRef } from 'react';

const API     = import.meta.env.VITE_API_URL  || 'https://api.mypetclub.app/api';
const APP_URL = import.meta.env.VITE_APP_URL  || 'https://app.mypetclub.app';
const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || 'support@mypetclub.app';
const WHATSAPP_IN   = import.meta.env.VITE_WHATSAPP_IN   || '919347411132';
const WHATSAPP_US   = import.meta.env.VITE_WHATSAPP_US   || '16097215754';
const HQ_ADDRESS    = import.meta.env.VITE_HQ_ADDRESS    || 'Sahara, LB Nagar, Hyderabad – 500074';
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(APP_URL)}&color=1a1a2e&bgcolor=ffffff&margin=10`;

const IMG = {
  hero:      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1800&auto=format&fit=crop&q=85',
  grooming:  'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80',
  training:  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=80',
  vet:       'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&auto=format&fit=crop&q=80',
  food:      'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&auto=format&fit=crop&q=80',
  // Hero floating gallery — mixed dog & cat
  pet1:      'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&auto=format&fit=crop&q=80',  // dog
  pet2:      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80', // cat — orange tabby
  pet3:      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=80', // cat — cuddly
};

const SERVICES = [
  { icon: '✂️', title: 'Grooming', price: 'from ₹499', desc: 'Bath, haircut, nail trim & styling at your doorstep by certified groomers.', img: IMG.grooming, tag: 'Most Popular', color: 'orange', bookable: true },
  { icon: '🐕‍🦺', title: 'Training', price: 'from ₹699', desc: 'Obedience, agility & behaviour training by certified professional trainers.', img: IMG.training, tag: 'High Demand', color: 'purple', bookable: true },
  { icon: '🏥', title: 'Vet Care', price: 'from ₹399', desc: 'In-home vet visits, vaccinations & digital health records for your pet.', img: IMG.vet, tag: 'Trusted', color: 'rose', bookable: true },
  { icon: '🦮', title: 'Dog Walking', price: 'from ₹299', desc: 'GPS-tracked solo & group walks by verified walkers. Live updates sent to you.', img: IMG.training, tag: 'New', color: 'green', bookable: true },
  { icon: '🏠', title: 'Pet Boarding', price: 'from ₹499/night', desc: 'Cage-free home stays with verified boarders. Daily photos & updates guaranteed.', img: IMG.grooming, tag: 'New', color: 'amber', bookable: true },
  { icon: '🍖', title: 'Pet Food', price: 'Free Delivery', desc: 'Premium nutrition, treats & supplements delivered to your door daily.', img: IMG.food, tag: 'Coming Soon', color: 'teal', bookable: false },
];

const STEPS = [
  { n: '01', icon: '📱', title: 'Download & Sign Up', desc: 'Create your free account in under 60 seconds. Verify your phone with an OTP — no passwords needed.' },
  { n: '02', icon: '🐾', title: 'Add Your Pet', desc: 'Build a complete digital profile for your pet — breed, age, health history, vet records — all in one place.' },
  { n: '03', icon: '📅', title: 'Book & Relax', desc: 'Browse verified professionals near you, pick a time, and track your pet\'s appointment live.' },
];

const REVIEWS = [
  { name: 'Priya Sharma', city: 'Mumbai', pet: 'Bruno, Golden Retriever', stars: 5, text: 'The groomer arrived exactly on time and Bruno looks absolutely stunning. Booking through PETclub was super easy — took less than 2 minutes!', avatar: 'P' },
  { name: 'Rajiv Nair', city: 'Bengaluru', pet: 'Milo, Labrador', stars: 5, text: 'Our trainer Arjun transformed Milo\'s behaviour in just 4 sessions. The digital tracking in the app is brilliant — I can see every session note.', avatar: 'R' },
  { name: 'Kavita Reddy', city: 'Hyderabad', pet: 'Whiskers, Persian Cat', stars: 5, text: 'Booking the vet through PETclub saved me so much stress. All of Whiskers\' vaccination records are now in the app. Absolutely love it!', avatar: 'K' },
  { name: 'James Wilson', city: 'Dallas, TX', pet: 'Max, German Shepherd', stars: 5, text: 'Used it while visiting India with Max. The service was incredible — professional, punctual, and so caring. Way better than anything back home!', avatar: 'J' },
];

const COUNTRIES = [
  { code: '91', flag: 'https://flagcdn.com/20x15/in.png', flagAlt: 'IN', label: 'India (+91)', ph: '9876543210' },
  { code: '1',  flag: 'https://flagcdn.com/20x15/us.png', flagAlt: 'US', label: 'USA (+1)',    ph: '4155552671' },
];

/* ── Shared UI ── */
function Stars({ n }) {
  return <span className="text-amber-400">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

/* ══════════ INQUIRY MODAL (Pet Food / Pet Boarding) ══════════ */
const INQUIRY_CONFIG = {
  'Pet Food': {
    icon: '🍖',
    color: '#16a34a',
    tagline: 'Premium pet nutrition delivered to your door.',
    placeholder: 'e.g. My Labrador needs grain-free dry food, 10 kg bag monthly. Currently using Royal Canin. Please share available brands & prices.',
    label: 'Tell us what your pet needs',
  },
  'Pet Boarding': {
    icon: '🏠',
    color: '#f97316',
    tagline: 'Safe, caring home-away-from-home for your pet.',
    placeholder: 'e.g. Need boarding for a 2-year-old Beagle from Dec 20–27. Looking for home-style stay with daily walks. Is pick-up/drop available?',
    label: 'Tell us your boarding requirements',
  },
};

function InquiryModal({ service, onClose }) {
  const cfg = INQUIRY_CONFIG[service] || INQUIRY_CONFIG['Pet Food'];
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [state, setState] = useState('idle'); // idle | loading | done
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim())  return setError('Please enter your name.');
    if (!form.email.trim()) return setError('Please enter your email.');
    if (!form.message.trim()) return setError('Please describe what you need — our team will tailor the response to your pet!');
    setState('loading');
    try {
      const res = await fetch(`${API}/contact/send-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone ? `+91${form.phone.replace(/\D/g, '')}` : null,
          email: form.email.trim(),
          service,
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
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: '#fff', borderRadius: 28, width: '100%', maxWidth: 520,
        boxShadow: '0 24px 80px rgba(0,0,0,0.3)', overflow: 'hidden',
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        {/* Header */}
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
          <div style={{
            marginTop: 16, background: 'rgba(255,255,255,0.15)', borderRadius: 12,
            padding: '10px 16px', fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600,
          }}>
            🚀 Launching soon! Fill the form below and our team will reach out to you <strong>within 24 hours</strong>.
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '28px 32px' }}>
          {state === 'done' ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
              <h3 style={{ fontWeight: 900, fontSize: 22, color: '#111', marginBottom: 8 }}>Request Received!</h3>
              <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.6 }}>
                Thanks, <strong>{form.name.split(' ')[0]}</strong>! Our team will review your request and reach out to <strong>{form.email}</strong> within 24 hours.
              </p>
              <button onClick={onClose} style={{
                marginTop: 24, background: cfg.color, color: '#fff', border: 'none',
                borderRadius: 14, padding: '12px 32px', fontWeight: 800, fontSize: 15, cursor: 'pointer',
              }}>Close →</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: 12, padding: '10px 16px', fontSize: 13, marginBottom: 16 }}>
                  ⚠ {error}
                </div>
              )}

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
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                  {cfg.label} <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea rows={5} placeholder={cfg.placeholder} required
                  style={{ width: '100%', border: '2px solid #f3f4f6', borderRadius: 12, padding: '10px 14px', fontSize: 13, outline: 'none', resize: 'vertical', lineHeight: 1.6, boxSizing: 'border-box' }}
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>The more detail you give, the faster we can help you!</p>
              </div>

              <button type="submit" disabled={state === 'loading'}
                style={{
                  width: '100%', background: cfg.color, color: '#fff', border: 'none',
                  borderRadius: 14, padding: '14px', fontWeight: 900, fontSize: 15,
                  cursor: 'pointer', opacity: state === 'loading' ? 0.7 : 1,
                }}>
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
    { href: '#how', label: 'How It Works' },
    { href: '#getapp', label: 'Get App' },
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

        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className={`text-sm font-semibold transition-colors hover:text-orange-500 ${scrolled ? 'text-gray-600' : 'text-white/90'}`}>
              {l.label}
            </a>
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
            className="block bg-orange-500 text-white font-bold text-center py-3 rounded-xl mt-3">
            Sign In →
          </a>
        </div>
      )}
    </nav>
  );
}

/* ══════════ PHONE MOCKUP — Live Tracking UI ══════════ */
function PhoneMockup() {
  return (
    <div className="relative flex justify-center items-center lg:justify-end">
      {/* Ambient glow */}
      <div className="absolute w-80 h-80 bg-orange-500/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-48 h-48 bg-violet-500/15 rounded-full blur-2xl pointer-events-none translate-x-20 -translate-y-10" />

      {/* Phone frame */}
      <div className="relative w-[268px] h-[560px] bg-[#0f0e17] rounded-[2.8rem] border-[5px] border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden"
        style={{ animation: 'float 4s ease-in-out infinite' }}>

        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-white/50 text-[10px] font-semibold">9:41</span>
          <div className="w-16 h-4 bg-black rounded-full" /> {/* notch */}
          <div className="flex gap-1 items-center">
            <div className="w-3 h-2 bg-white/40 rounded-sm" />
            <div className="w-1 h-1 bg-white/40 rounded-full" />
          </div>
        </div>

        {/* App header */}
        <div className="px-4 py-2 flex items-center gap-2 border-b border-white/5">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xs font-black">🐾</div>
          <div className="flex-1">
            <div className="text-white text-xs font-bold">✂️ Sai Krishna • En Route</div>
            <div className="text-white/40 text-[10px]">Grooming • On the way</div>
          </div>
          <div className="flex items-center gap-1 bg-white/8 rounded-full px-2 py-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 4px #4ade80', animation: 'pulse 2s infinite' }} />
            <span className="text-white text-[9px] font-bold">LIVE</span>
          </div>
        </div>

        {/* Map area — stylised SVG map */}
        <div className="relative" style={{ height: 280 }}>
          <svg width="100%" height="100%" viewBox="0 0 258 280" xmlns="http://www.w3.org/2000/svg">
            {/* Map bg */}
            <rect width="258" height="280" fill="#1a1825"/>
            {/* Grid lines */}
            {[40,80,120,160,200,240].map(y => <line key={y} x1="0" y1={y} x2="258" y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="1"/>)}
            {[40,80,120,160,200].map(x => <line key={x} x1={x} y1="0" x2={x} y2="280" stroke="white" strokeOpacity="0.04" strokeWidth="1"/>)}
            {/* Roads */}
            <path d="M0,140 Q80,130 130,120 Q180,110 258,100" stroke="white" strokeOpacity="0.12" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <path d="M0,140 Q80,130 130,120 Q180,110 258,100" stroke="white" strokeOpacity="0.06" strokeWidth="16" fill="none" strokeLinecap="round"/>
            <path d="M80,0 Q90,80 100,140 Q110,200 115,280" stroke="white" strokeOpacity="0.08" strokeWidth="8" fill="none" strokeLinecap="round"/>
            <path d="M170,0 Q165,60 160,120 Q155,180 150,280" stroke="white" strokeOpacity="0.06" strokeWidth="6" fill="none" strokeLinecap="round"/>
            {/* Route line — orange, animated */}
            <path d="M70,210 Q90,175 110,155 Q125,140 130,120" stroke="#f97316" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeDasharray="6 3" opacity="0.9"/>
            <path d="M70,210 Q90,175 110,155 Q125,140 130,120" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.15"/>
            {/* Customer marker — orange home pin */}
            <circle cx="70" cy="210" r="18" fill="#f97316" opacity="0.15"/>
            <circle cx="70" cy="210" r="11" fill="#f97316" stroke="white" strokeWidth="2.5"/>
            <text x="70" y="214" textAnchor="middle" fontSize="10" fill="white">🏠</text>
            {/* Professional marker — animated */}
            <circle cx="130" cy="120" r="22" fill="#7c3aed" opacity="0.18"/>
            <circle cx="130" cy="120" r="13" fill="#7c3aed" stroke="white" strokeWidth="2.5"/>
            <text x="130" y="124" textAnchor="middle" fontSize="11" fill="white">✂️</text>
            {/* Map attribution suppressed */}
          </svg>

          {/* Waiting pulse on pro marker */}
          <div className="absolute pointer-events-none" style={{ top: 84, left: 108, width: 44, height: 44 }}>
            <div className="w-full h-full rounded-full border-2 border-violet-400 opacity-40" style={{ animation: 'ping 1.8s ease-out infinite' }} />
          </div>
        </div>

        {/* ETA pill */}
        <div className="mx-3 mt-2 bg-white/6 border border-white/8 rounded-2xl p-3 flex items-center gap-3">
          <div className="text-center">
            <div className="text-white/40 text-[8px] font-bold uppercase tracking-widest">ETA</div>
            <div className="text-white text-2xl font-black leading-none">8<span className="text-sm font-medium text-white/50"> min</span></div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <div className="text-white/40 text-[8px] font-bold uppercase tracking-widest">Status</div>
            <div className="text-violet-400 text-xs font-bold">En Route 🚗</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center flex-1">
            <div className="text-white/40 text-[8px] font-bold uppercase tracking-widest">Service</div>
            <div className="text-white text-xs font-bold">Full Groom</div>
          </div>
        </div>

        {/* Bottom action */}
        <div className="mx-3 mt-2 bg-orange-500 rounded-xl py-2.5 text-center">
          <span className="text-white text-xs font-black tracking-wide">Call Sai →</span>
        </div>
      </div>

      {/* Floating badge — radius matching */}
      <div className="absolute -left-4 top-16 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-gray-800 border border-gray-100"
        style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.5s' }}>
        <span className="text-lg">📍</span>
        <div><div className="text-gray-900 font-extrabold text-xs">70km Match</div><div className="text-gray-400 font-normal text-[10px]">Nearest verified pro</div></div>
      </div>

      {/* Floating badge — verified */}
      <div className="absolute -right-2 bottom-28 bg-emerald-500 rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-white"
        style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '1s' }}>
        <span className="text-lg">✅</span>
        <div><div className="font-extrabold text-xs">ID Verified</div><div className="font-normal text-[10px] text-emerald-100">48h compliance</div></div>
      </div>
    </div>
  );
}

/* ══════════ TRUST & SECURITY BANNER ══════════ */
function TrustBanner() {
  const pillars = [
    {
      icon: '📍',
      title: '70km Radius Matching',
      desc: 'Our algorithm matches your pet with the nearest verified professional within 70km — fast, local, reliable.',
      color: 'from-orange-500/10 to-orange-500/5',
      border: 'border-orange-500/20',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
    },
    {
      icon: '🛡️',
      title: '48-Hour Compliance Check',
      desc: 'Every groomer, trainer & vet is manually reviewed — ID proof, certifications & references — before going live.',
      color: 'from-violet-500/10 to-violet-500/5',
      border: 'border-violet-500/20',
      iconBg: 'bg-violet-500/10',
      iconColor: 'text-violet-400',
    },
    {
      icon: '🔐',
      title: 'Secure Onboarding',
      desc: 'OTP-verified accounts, encrypted profiles, zero-password login — every pet parent and professional stays protected.',
      color: 'from-emerald-500/10 to-emerald-500/5',
      border: 'border-emerald-500/20',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <section className="bg-gray-950 border-y border-white/5 py-14">
      <div className="container">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-orange-400 text-xs font-bold tracking-widest uppercase bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full">
            🔒 Trust &amp; Safety — Built Into Every Booking
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map(p => (
            <div key={p.title} className={`bg-gradient-to-br ${p.color} border ${p.border} rounded-3xl p-6 flex gap-4 items-start`}>
              <div className={`w-12 h-12 ${p.iconBg} rounded-2xl flex items-center justify-center text-2xl shrink-0`}>
                {p.icon}
              </div>
              <div>
                <h3 className={`font-extrabold text-white text-base mb-1.5`}>{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ HERO ══════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-[#1a0a00]" />
      <div className="absolute inset-0 opacity-20">
        <img src={IMG.hero} alt="" className="w-full h-full object-cover object-center" aria-hidden="true" />
        <div className="absolute inset-0 bg-gray-950/70" />
      </div>
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: headline + dual CTAs ── */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-400/25 text-orange-300 text-xs font-bold px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <img src="https://flagcdn.com/20x15/in.png" alt="India" className="inline-block rounded-sm" />
              India&apos;s #1 Pet Care Platform
              <span className="opacity-40">·</span>
              <img src="https://flagcdn.com/20x15/us.png" alt="USA" className="inline-block rounded-sm" />
              Now in USA
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] mb-5">
              Premium Pet Care,<br />
              <span className="text-gradient-white">At Your Door.</span>
            </h1>

            <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-lg">
              Verified groomers, trainers, vets, walkers &amp; boarders — GPS-tracked, background-checked, loved by 50,000+ pet parents.
            </p>

            {/* ── TWO CLEAR JOURNEYS ── */}
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {/* Pet Owner path */}
              <a href="#join"
                onClick={() => { setTimeout(() => document.querySelector('[data-role="owner"]')?.click(), 100); }}
                className="group relative bg-orange-500 hover:bg-orange-400 rounded-2xl p-5 transition-all shadow-brand hover:shadow-xl active:scale-[0.98] text-left">
                <div className="text-2xl mb-2">🐾</div>
                <div className="font-extrabold text-white text-base mb-0.5">I&apos;m a Pet Owner</div>
                <div className="text-orange-100/80 text-xs leading-snug mb-3">Book grooming, training, vet, walking &amp; boarding</div>
                <div className="flex items-center gap-1 text-white text-xs font-bold">
                  Book a Service <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </a>

              {/* Service Provider path */}
              <a href="#join"
                className="group relative bg-white/8 hover:bg-white/12 border border-white/15 rounded-2xl p-5 transition-all hover:shadow-xl active:scale-[0.98] text-left">
                <div className="text-2xl mb-2">💼</div>
                <div className="font-extrabold text-white text-base mb-0.5">I&apos;m a Professional</div>
                <div className="text-white/50 text-xs leading-snug mb-3">Join as groomer, trainer, vet, walker or boarder</div>
                <div className="flex items-center gap-1 text-orange-400 text-xs font-bold">
                  Join as Pro <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-white/8 pt-8">
              {[
                { v: '50K+', l: 'Happy Pets' },
                { v: '1.2K+', l: 'Verified Pros' },
                { v: '100+', l: 'Cities' },
                { v: '4.9★', l: 'App Rating' },
              ].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-black text-white">{s.v}</div>
                  <div className="text-xs text-white/50 font-medium">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Live Tracking Phone Mockup ── */}
          <div className="hidden lg:flex justify-center">
            <PhoneMockup />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  );
}

/* ══════════ SERVICES ══════════ */
function Services() {
  const [inquiryService, setInquiryService] = useState(null);

  const colorMap = {
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    rose:   'bg-rose-50 text-rose-600 border-rose-100',
    green:  'bg-green-50 text-green-600 border-green-100',
  };
  const tagColorMap = {
    orange: 'bg-orange-100 text-orange-700',
    purple: 'bg-purple-100 text-purple-700',
    rose:   'bg-rose-100 text-rose-700',
    green:  'bg-green-100 text-green-700',
  };

  return (
    <section id="services" className="section-pad bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">Everything Your Pet Needs</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Verified professionals, transparent pricing, live tracking — all in one app.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(s => {
            const inner = (
              <>
                <div className="relative h-48 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${tagColorMap[s.color]}`}>{s.tag}</span>
                  {!s.bookable && (
                    <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 text-gray-700">✉ Inquiry</span>
                  )}
                  <div className="absolute bottom-3 left-3 text-3xl">{s.icon}</div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-extrabold text-gray-900 text-lg">{s.title}</h3>
                    <span className="text-sm font-bold text-orange-500">{s.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                  {s.bookable ? (
                    <div className="flex items-center text-orange-500 font-bold text-sm group-hover:gap-2 gap-1 transition-all">
                      Book Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-green-600 font-bold text-sm group-hover:gap-2 gap-1 transition-all">
                      Get in Touch <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  )}
                </div>
              </>
            );

            return s.bookable ? (
              <a key={s.title} href={APP_URL} target="_blank" rel="noreferrer" className="card-service group">
                {inner}
              </a>
            ) : (
              <button key={s.title} type="button" onClick={() => setInquiryService(s.title)} className="card-service group text-left">
                {inner}
              </button>
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
    <section id="how" className="section-pad bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">Get Started in 3 Easy Steps</h2>
          <p className="text-gray-500 text-lg">From download to your first booking in under 5 minutes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 z-0" />

          {STEPS.map((s, i) => (
            <div key={s.n} className="relative text-center z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white shadow-card border border-orange-100 text-4xl mb-6">
                {s.icon}
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shadow-brand">{i + 1}</div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ REVIEWS ══════════ */
function Reviews() {
  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container">
        <div className="text-center mb-14">
          <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-2">Loved Across Two Countries</h2>
          <p className="text-gray-500 text-lg inline-flex items-center gap-1.5">
            Real stories from real pet parents&nbsp;
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
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
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

/* ══════════ GET APP ══════════ */
function GetApp() {
  return (
    <section id="getapp" className="section-pad bg-gray-900 overflow-hidden relative">
      {/* BG decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div>
            <span className="text-orange-400 text-sm font-bold tracking-widest uppercase">Get the App</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight">
              Your Pet Care Hub.<br />
              <span className="text-gradient">Always in Your Pocket.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Available as a progressive web app — works on any device, any browser. Native iOS & Android apps coming soon.
            </p>

            <div className="space-y-4">
              {[
                { icon: '📱', title: 'Web App', desc: 'Open in any browser — iPhone, Android, or desktop', cta: 'Open Now', href: APP_URL, primary: true },
                { icon: '🍎', title: 'iOS App', desc: 'Native iPhone app — coming to App Store soon', cta: 'Coming Soon', href: null, primary: false },
                { icon: '▶️', title: 'Android App', desc: 'Native Android app — coming to Play Store soon', cta: 'Coming Soon', href: null, primary: false },
              ].map(item => (
                <div key={item.title} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/8 transition-colors">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-sm">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                  {item.href
                    ? <a href={item.href} target="_blank" rel="noreferrer" className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0">{item.cta} →</a>
                    : <span className="bg-white/10 text-gray-500 text-xs font-semibold px-4 py-2 rounded-xl shrink-0">{item.cta}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <div className="bg-white p-5 rounded-3xl shadow-2xl mb-5 inline-block">
              <img src={QR_URL} alt="QR Code to open PETclub App" width={200} height={200} className="rounded-xl block" />
            </div>
            <p className="text-gray-400 text-sm text-center mb-2">📷 Scan with your phone camera</p>
            <p className="text-gray-500 text-xs text-center">Opens instantly — no download required</p>
            <a href={APP_URL} target="_blank" rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-brand hover:shadow-lg">
              🔗 Open PETclub App
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ JOIN / SIGNUP — Groomit-inspired step flow ══════════ */
const JOIN_ROLES = [
  {
    id: 'owner',
    icon: '🐾',
    title: 'Pet Owner',
    subtitle: 'I want to book services',
    perks: ['Book grooming, training, vet, walking & boarding', 'Live GPS tracking of your pro', 'Digital health records for your pet'],
    color: '#f97316',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    ring: 'ring-orange-400',
    tag: 'Most Popular',
    tagColor: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'groomer',
    icon: '✂️',
    title: 'Groomer',
    subtitle: 'I offer grooming services',
    perks: ['Get discovered by pet owners', 'Manage bookings & availability', 'Grow 5-star reviews'],
    color: '#7c3aed',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    ring: 'ring-violet-400',
    tag: 'High Earning',
    tagColor: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'trainer',
    icon: '🎓',
    title: 'Trainer',
    subtitle: 'I provide dog training',
    perks: ['Set your own schedule & rates', 'Certified trainer badge', 'Track client progress'],
    color: '#2563eb',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    ring: 'ring-blue-400',
    tag: 'In Demand',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'vet',
    icon: '🏥',
    title: 'Veterinarian',
    subtitle: 'I provide vet care',
    perks: ['In-clinic & home visit bookings', 'Digital prescription records', 'Verified vet badge'],
    color: '#059669',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    ring: 'ring-emerald-400',
    tag: 'Trusted',
    tagColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'walker',
    icon: '🦮',
    title: 'Dog Walker',
    subtitle: 'I walk dogs',
    perks: ['GPS-tracked walks sent to owners', 'Flexible daily schedule', 'Verified walker badge'],
    color: '#16a34a',
    bg: 'bg-green-50',
    border: 'border-green-200',
    ring: 'ring-green-400',
    tag: 'New',
    tagColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'boarder',
    icon: '🏠',
    title: 'Pet Boarder',
    subtitle: 'I host pets at home',
    perks: ['Cage-free home environment', 'Daily photo & video updates', 'Verified boarder badge'],
    color: '#d97706',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    ring: 'ring-amber-400',
    tag: 'New',
    tagColor: 'bg-amber-100 text-amber-700',
  },
];

const LEFT_PANELS = {
  owner: {
    headline: 'Your pet deserves the best.',
    sub: 'Join 50,000+ pet parents who book verified groomers, trainers, vets, walkers & boarders — with live GPS tracking.',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&auto=format&fit=crop&q=85',
    stats: [{ v: '50K+', l: 'Happy Pets' }, { v: '4.9★', l: 'Rating' }, { v: '100+', l: 'Cities' }],
  },
  groomer: {
    headline: 'Grow your grooming business.',
    sub: 'Join our verified groomer network and get discovered by thousands of pet owners in your city.',
    img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=900&auto=format&fit=crop&q=85',
    stats: [{ v: '1.2K+', l: 'Active Pros' }, { v: '₹25K+', l: 'Avg Monthly' }, { v: '24h', l: 'Verification' }],
  },
  trainer: {
    headline: 'Turn your passion into income.',
    sub: 'Connect with pet owners who need expert training. Set your rates, manage your schedule, grow your brand.',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&auto=format&fit=crop&q=85',
    stats: [{ v: '₹699+', l: 'Per Session' }, { v: 'Flex', l: 'Schedule' }, { v: '24h', l: 'Approval' }],
  },
  vet: {
    headline: 'Reach more patients digitally.',
    sub: 'Offer in-clinic and home visit care to verified pet owners. Digital records, seamless booking.',
    img: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=900&auto=format&fit=crop&q=85',
    stats: [{ v: 'Verified', l: 'Badge' }, { v: 'Digital', l: 'Rx Records' }, { v: '24/7', l: 'Bookings' }],
  },
  walker: {
    headline: 'Earn doing what you love.',
    sub: 'Join our GPS-verified walker network. Flexible hours, instant bookings, and a trusted badge that builds your client base.',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&auto=format&fit=crop&q=85',
    stats: [{ v: '₹299+', l: 'Per Walk' }, { v: 'GPS', l: 'Tracked' }, { v: '24h', l: 'Approval' }],
  },
  boarder: {
    headline: 'Turn your home into a pet haven.',
    sub: 'Host pets in your cage-free home and earn. Daily photos, GPS check-ins, and a verified boarder badge builds instant trust.',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&auto=format&fit=crop&q=85',
    stats: [{ v: '₹499+', l: 'Per Night' }, { v: 'Home', l: 'Boarding' }, { v: '24h', l: 'Approval' }],
  },
};

function JoinSection() {
  const [step, setStep]       = useState(1);   // 1=choose role, 2=enter details, 3=done
  const [role, setRole]       = useState(null);
  const [cc,   setCC]         = useState('91');
  const [form, setForm]       = useState({ name: '', phone: '', email: '', city: '' });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const selectedRole  = JOIN_ROLES.find(r => r.id === role);
  const country       = COUNTRIES.find(c => c.code === cc);
  const panel         = LEFT_PANELS[role] || LEFT_PANELS.owner;

  const pickRole = (id) => { setRole(id); setStep(2); setError(''); };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim())  return setError('Please enter your name');
    if (!form.phone || form.phone.length < 6) return setError('Enter a valid phone number');
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError('Enter a valid email');
    setLoading(true);
    try {
      await fetch(`${API}/contact/send-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), phone: `+${cc}${form.phone}`, email: form.email.trim(), role, city: form.city.trim() }),
      });
      setStep(3);
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <section id="join" className="bg-white">
      {/* ── Step progress bar ── */}
      <div className="border-b border-gray-100">
        <div className="container flex items-center gap-0 py-0">
          {['Choose Your Role', 'Your Details', 'All Set!'].map((label, i) => {
            const n = i + 1;
            const done    = step > n;
            const current = step === n;
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

      {/* ── STEP 1: Role picker ── */}
      {step === 1 && (
        <div className="section-pad">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">Get Started Free</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-3">Who are you joining as?</h2>
              <p className="text-gray-500 text-lg">Pick your role — you can always add more later.</p>
            </div>

            {/* ── Path split labels ── */}
            <div className="max-w-5xl mx-auto mb-6 grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-2xl px-5 py-3">
                <span className="text-2xl">🐾</span>
                <div><div className="font-extrabold text-gray-900 text-sm">For Pet Owners</div><div className="text-xs text-gray-500">Book services for your pet</div></div>
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
                  {/* Tag */}
                  <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full ${r.tagColor}`}>{r.tag}</span>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                    {r.icon}
                  </div>

                  <div className="font-extrabold text-gray-900 text-lg mb-0.5">{r.title}</div>
                  <div className="text-sm text-gray-500 mb-5">{r.subtitle}</div>

                  <ul className="space-y-2">
                    {r.perks.map(p => (
                      <li key={p} className="flex items-start gap-2 text-xs text-gray-600">
                        <span style={{ color: r.color }} className="font-black mt-0.5 shrink-0">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  {/* CTA arrow */}
                  <div className="flex items-center gap-1.5 mt-6 text-sm font-bold transition-all" style={{ color: r.color }}>
                    Get started <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-gray-400 mt-8">
              Already have an account?{' '}
              <a href={`${APP_URL}?signin=1`} target="_blank" rel="noreferrer" className="text-orange-500 font-bold hover:underline">Sign in →</a>
            </p>
          </div>
        </div>
      )}

      {/* ── STEP 2: Details form (split-screen) ── */}
      {step === 2 && selectedRole && (
        <div className="min-h-[600px] grid lg:grid-cols-2">

          {/* Left — value panel */}
          <div className="relative overflow-hidden bg-gray-900 flex flex-col justify-end p-10 min-h-[280px] lg:min-h-0">
            <img src={panel.img} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent" />

            <div className="relative z-10">
              {/* Role badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold text-white mb-6"
                style={{ background: selectedRole.color + '33', border: `1px solid ${selectedRole.color}66` }}>
                <span>{selectedRole.icon}</span> {selectedRole.title}
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">{panel.headline}</h2>
              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-sm">{panel.sub}</p>

              {/* Stats row */}
              <div className="flex gap-6">
                {panel.stats.map(s => (
                  <div key={s.l}>
                    <div className="text-xl font-black text-white">{s.v}</div>
                    <div className="text-xs text-gray-400 font-medium">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Trust line */}
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10">
                <span className="text-amber-400">★★★★★</span>
                <span className="text-gray-400 text-xs">Rated 4.9 by 45,000+ users</span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="flex flex-col justify-center p-8 lg:p-14 bg-white">
            {/* Back + heading */}
            <button onClick={() => { setStep(1); setRole(null); setError(''); }}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 mb-8 transition-colors group w-fit">
              <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span> Back
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-gray-900 mb-1">Create your account</h3>
              <p className="text-gray-500 text-sm">Takes under 60 seconds. No password needed.</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-2xl mb-5">
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                <input type="text" placeholder={role === 'owner' ? 'Arjun Mehta' : role === 'vet' ? 'Dr. Priya Sharma' : role === 'trainer' ? 'Ravi Kumar' : 'Sai Krishna'}
                  className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all placeholder-gray-300"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>

              {/* Phone with country */}
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

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" placeholder="you@example.com"
                  className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all placeholder-gray-300"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>

              {/* City — shown for all roles */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Your City {role !== 'owner' && <span className="text-gray-400 normal-case font-normal">— where you operate</span>}
                </label>
                <input type="text" placeholder={role === 'owner' ? 'Mumbai, Delhi, Hyderabad…' : 'e.g. Hyderabad'}
                  className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all placeholder-gray-300"
                  value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
              </div>

              {/* Role-specific info badge */}
              {role === 'groomer' && (
                <div className="flex items-start gap-3 bg-violet-50 border border-violet-100 rounded-2xl px-4 py-3 text-xs text-violet-800">
                  <span className="text-base shrink-0">✂️</span>
                  <span>After joining, upload your grooming portfolio & ID for 24h verification. You'll get a <strong>Verified Groomer</strong> badge.</span>
                </div>
              )}
              {role === 'trainer' && (
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 text-xs text-blue-800">
                  <span className="text-base shrink-0">🎓</span>
                  <span>Upload your training certification in the app. Certified trainers earn a <strong>Certified Trainer</strong> badge within 24h.</span>
                </div>
              )}
              {role === 'vet' && (
                <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3 text-xs text-emerald-800">
                  <span className="text-base shrink-0">🏥</span>
                  <span>Upload your veterinary license & registration in the app. Verified vets get a <strong>Verified Vet</strong> badge within 24h.</span>
                </div>
              )}
              {role === 'walker' && (
                <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-2xl px-4 py-3 text-xs text-green-800">
                  <span className="text-base shrink-0">🦮</span>
                  <span>Upload your ID & a short bio in the app. GPS tracking is auto-enabled for every walk. You'll get a <strong>Verified Walker</strong> badge within 24h.</span>
                </div>
              )}
              {role === 'boarder' && (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 text-xs text-amber-800">
                  <span className="text-base shrink-0">🏠</span>
                  <span>Upload your ID & home photos in the app. Our team reviews your space to ensure a safe, cage-free environment. <strong>Verified Boarder</strong> badge in 24–48h.</span>
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full font-black py-4 rounded-2xl text-white text-sm transition-all disabled:opacity-60 shadow-brand hover:opacity-90 active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${selectedRole.color}, ${selectedRole.color}dd)` }}>
                {loading ? 'Creating account…' : `Continue as ${selectedRole.title} →`}
              </button>
            </form>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-5 mt-7 pt-6 border-t border-gray-50">
              {['🔒 No password', '⚡ 60 sec setup', '🚫 No spam ever'].map(t => (
                <span key={t} className="text-xs text-gray-400 font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 3: Success ── */}
      {step === 3 && (
        <div className="section-pad">
          <div className="container">
            <div className="max-w-lg mx-auto text-center">
              {/* Animated checkmark */}
              <div className="w-24 h-24 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-5xl mx-auto mb-8">
                🎉
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-3">You&apos;re all set!</h2>
              <p className="text-gray-500 text-lg mb-3">
                We&apos;ve sent the app link to <strong>{form.email}</strong>
              </p>
              <p className="text-gray-400 text-sm mb-10">
                {selectedRole?.id === 'owner'
                  ? 'Open the app, add your pet, and book your first service in under 2 minutes.'
                  : 'Open the app to complete your professional profile. Verification takes 24–48 hours.'}
              </p>

              <a href={APP_URL} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4 rounded-2xl text-base transition-all shadow-brand hover:shadow-lg active:scale-[0.98]">
                {selectedRole?.icon} Open PETclub App →
              </a>

              <p className="text-xs text-gray-400 mt-5">
                Or scan the QR code in the <a href="#getapp" className="text-orange-500 font-semibold hover:underline">Get App section</a>
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
            <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">Contact Us</span>
            <h2 className="text-4xl font-black text-gray-900 mt-3 mb-6">Let&apos;s Talk 🐾</h2>
            <p className="text-gray-500 text-lg mb-10">Questions, partnerships, or just want to say hi — we&apos;d love to hear from you.</p>
            <div className="space-y-6">
              {[
                {
                  icon: '📧', title: 'Email',
                  content: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-gray-500 text-sm hover:text-orange-500 transition-colors">{SUPPORT_EMAIL}</a>,
                },
                {
                  icon: '📱', title: 'WhatsApp',
                  content: (
                    <div className="space-y-1">
                      <a href={`https://wa.me/${WHATSAPP_IN}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors">
                        <img src="https://flagcdn.com/20x15/in.png" alt="IN" className="rounded-sm" /> <span>+{WHATSAPP_IN.replace(/^91/, '91 ')}</span>
                      </a>
                      <a href={`https://wa.me/${WHATSAPP_US}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors">
                        <img src="https://flagcdn.com/20x15/us.png" alt="US" className="rounded-sm" /> <span>+{WHATSAPP_US.replace(/^1/, '1 ')}</span>
                      </a>
                    </div>
                  ),
                },
                { icon: '📍', title: 'HQ', content: <span className="text-gray-500 text-sm">{HQ_ADDRESS}</span> },
                { icon: '⏰', title: 'Support Hours', content: <span className="text-gray-500 text-sm">Mon–Sat, 9 AM – 7 PM IST</span> },
              ].map(item => (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center text-xl shrink-0">{item.icon}</div>
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
                    <input type="text" placeholder="Your name" required className="input-clean"
                      value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Phone</label>
                    <input type="tel" placeholder="10-digit number" className="input-clean"
                      value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g,'').slice(0,15) }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Email *</label>
                  <input type="email" placeholder="you@example.com" required className="input-clean"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Message</label>
                  <textarea rows={4} placeholder="How can we help?" className="input-clean resize-none"
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
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
  const BOOKABLE_SERVICES = ['Grooming', 'Training', 'Vet Care'];
  const INQUIRY_SERVICES  = ['Pet Food', 'Pet Boarding'];

  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/icon.svg" alt="PETclub" className="w-8 h-8 rounded-lg" />
              <span className="font-extrabold text-white text-lg">PET<span className="text-orange-400">club</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-4">India&apos;s #1 platform for pet grooming, training, vet care & food delivery. Now serving the USA too.</p>
            <div className="flex gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <img src="https://flagcdn.com/20x15/in.png" alt="IN" className="rounded-sm" /> India
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <img src="https://flagcdn.com/20x15/us.png" alt="US" className="rounded-sm" /> USA
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Services</h4>
            {BOOKABLE_SERVICES.map(s => (
              <a key={s} href={APP_URL} target="_blank" rel="noreferrer" className="block text-sm hover:text-orange-400 transition-colors py-1">{s}</a>
            ))}
            {INQUIRY_SERVICES.map(s => (
              <button key={s} type="button" onClick={() => setInquiryService(s)}
                className="block text-sm hover:text-orange-400 transition-colors py-1 text-left w-full">
                {s} <span className="text-xs text-gray-600 ml-1">✉</span>
              </button>
            ))}
            {inquiryService && <InquiryModal service={inquiryService} onClose={() => setInquiryService(null)} />}
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Company</h4>
            {['About Us', 'Careers', 'Blog', 'Press', 'Partners'].map(s => (
              s === 'About Us'
                ? <a key={s} href="/about.html" className="block text-sm py-1 hover:text-orange-400 transition-colors">{s}</a>
                : <span key={s} className="block text-sm py-1 cursor-default">{s}</span>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Get App</h4>
            <div className="bg-white p-3 rounded-2xl inline-block mb-3">
              <img src={QR_URL} alt="QR" width={100} height={100} className="rounded-lg block" />
            </div>
            <p className="text-xs">Scan to open the web app instantly</p>
            <a href={APP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-3 text-orange-400 text-sm font-bold hover:text-orange-300 transition-colors">Open App →</a>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
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

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBanner />
      <Services />
      <HowItWorks />
      <Reviews />
      <GetApp />
      <JoinSection />
      <Contact />
      <Footer />
    </>
  );
}
