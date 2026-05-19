import { useState, useEffect, useRef } from 'react';

const API = 'https://petclub-backend-production.up.railway.app/api';
const APP_URL = 'https://petclub-app.vercel.app';
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(APP_URL)}&color=1a1a2e&bgcolor=ffffff&margin=10`;

const IMG = {
  hero:      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1800&auto=format&fit=crop&q=85',
  grooming:  'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80',
  training:  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=80',
  vet:       'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&auto=format&fit=crop&q=80',
  food:      'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&auto=format&fit=crop&q=80',
  dog1:      'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&auto=format&fit=crop&q=80',
  dog2:      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&auto=format&fit=crop&q=80',
  dog3:      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&auto=format&fit=crop&q=80',
};

const SERVICES = [
  { icon: '✂️', title: 'Grooming', price: 'from ₹499', desc: 'Bath, haircut, nail trim & styling at your doorstep by certified groomers.', img: IMG.grooming, tag: 'Most Popular', color: 'orange' },
  { icon: '🎓', title: 'Training', price: 'from ₹699', desc: 'Obedience, agility & behaviour training by certified professional trainers.', img: IMG.training, tag: 'High Demand', color: 'purple' },
  { icon: '🏥', title: 'Vet Care', price: 'from ₹399', desc: 'In-home vet visits, vaccinations & digital health records for your pet.', img: IMG.vet, tag: 'Trusted', color: 'rose' },
  { icon: '🍖', title: 'Pet Food', price: 'Free Delivery', desc: 'Premium nutrition, treats & supplements delivered to your door daily.', img: IMG.food, tag: 'Fast Delivery', color: 'green' },
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
  { code: '91', flag: '🇮🇳', label: 'India (+91)', ph: '9876543210' },
  { code: '1',  flag: '🇺🇸', label: 'USA (+1)',    ph: '4155552671' },
];

/* ── Shared UI ── */
function Stars({ n }) {
  return <span className="text-amber-400">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
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
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white text-lg font-black">🐾</div>
          <span className={`font-extrabold text-xl transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            PET<span className="text-orange-400">club</span>
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
          <a href={APP_URL} target="_blank" rel="noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-brand hover:shadow-lg">
            Open App →
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
          <a href={APP_URL} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}
            className="block bg-orange-500 text-white font-bold text-center py-3 rounded-xl mt-3">
            Open App →
          </a>
        </div>
      )}
    </nav>
  );
}

/* ══════════ HERO ══════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={IMG.hero} alt="Happy dog" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-900/60 to-gray-900/30" />
      </div>

      {/* Floating pet images — desktop only */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-10">
        {[IMG.dog1, IMG.dog2, IMG.dog3].map((img, i) => (
          <div key={i} className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl"
            style={{ animation: `float ${3 + i}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
            <img src={img} alt="pet" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="container relative z-10 pt-20 pb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            🇮🇳&nbsp;India&apos;s #1 Pet Care Platform &nbsp;·&nbsp; 🇺🇸&nbsp;Now in USA
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Premium Pet Care,<br />
            <span className="text-gradient-white">At Your Door.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-lg">
            Book trusted groomers, trainers & vets — verified, insured, and loved by 50,000+ pet parents across India and the USA.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a href="#join" className="btn-primary text-base">
              🐾 Get Started Free
            </a>
            <a href="#getapp" className="btn-outline text-base">
              📱 Download App
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {[
              { v: '50K+', l: 'Happy Pets' },
              { v: '1.2K+', l: 'Verified Pros' },
              { v: '100+', l: 'Cities' },
              { v: '4.9★', l: 'App Rating' },
            ].map(s => (
              <div key={s.l}>
                <div className="text-2xl font-black text-white">{s.v}</div>
                <div className="text-xs text-white/60 font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

/* ══════════ SERVICES ══════════ */
function Services() {
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
          {SERVICES.map(s => (
            <a key={s.title} href={APP_URL} target="_blank" rel="noreferrer" className="card-service group">
              <div className="relative h-48 overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${tagColorMap[s.color]}`}>{s.tag}</span>
                <div className="absolute bottom-3 left-3 text-3xl">{s.icon}</div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-extrabold text-gray-900 text-lg">{s.title}</h3>
                  <span className="text-sm font-bold text-orange-500">{s.price}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center text-orange-500 font-bold text-sm group-hover:gap-2 gap-1 transition-all">
                  Book Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
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
          <p className="text-gray-500 text-lg">Real stories from real pet parents 🇮🇳 🇺🇸</p>
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

/* ══════════ JOIN / SIGNUP ══════════ */
function JoinSection() {
  const [cc, setCC] = useState('91');
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', pettype: '' });
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  const country = COUNTRIES.find(c => c.code === cc);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('Please enter your name'); return; }
    if (!form.phone || form.phone.length < 6) { setError('Enter a valid phone number'); return; }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Enter a valid email address'); return; }
    setState('loading');
    try {
      const res = await fetch(`${API}/contact/send-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), phone: `+${cc}${form.phone}`, email: form.email.trim(), city: form.city, pettype: form.pettype }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setState('done');
    } catch (err) { setState('idle'); setError(err.message || 'Something went wrong. Please try again.'); }
  };

  if (state === 'done') return (
    <section id="join" className="section-pad bg-orange-50">
      <div className="container text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-black text-gray-900 mb-3">You&apos;re in!</h2>
        <p className="text-gray-500 mb-6">We&apos;ve sent the app link to your phone and email. Welcome to PETclub!</p>
        <a href={APP_URL} target="_blank" rel="noreferrer" className="btn-primary">Open PETclub App →</a>
      </div>
    </section>
  );

  return (
    <section id="join" className="section-pad bg-orange-50">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">Join Free</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-3">Start Your Pet&apos;s Journey</h2>
            <p className="text-gray-500 text-lg">Sign up and we&apos;ll send the app link directly to your phone and email.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-card p-8 border border-orange-100">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">⚠ {error}</div>}
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Full Name *</label>
                  <input type="text" placeholder="Arjun Mehta" required className="input-clean"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Mobile Number *</label>
                  <div className="flex gap-2 mb-2">
                    {COUNTRIES.map(c => (
                      <button key={c.code} type="button" onClick={() => { setCC(c.code); setForm(f => ({ ...f, phone: '' })); }}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border-2 transition-all ${cc === c.code ? 'border-orange-400 bg-orange-50 text-orange-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                        {c.flag} +{c.code}
                      </button>
                    ))}
                  </div>
                  <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
                    <span className="bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-500 border-r border-gray-200 whitespace-nowrap">{country?.flag} +{cc}</span>
                    <input type="tel" inputMode="numeric" placeholder={country?.ph} required maxLength={15} className="flex-1 px-3 py-3 text-sm focus:outline-none"
                      value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 15) }))} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Email Address *</label>
                <input type="email" placeholder="you@example.com" required className="input-clean"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">City</label>
                  <input type="text" placeholder="Mumbai / Dallas" className="input-clean"
                    value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Pet Type</label>
                  <select className="input-clean bg-white" value={form.pettype} onChange={e => setForm(f => ({ ...f, pettype: e.target.value }))}>
                    <option value="">Select pet…</option>
                    <option>🐕 Dog</option><option>🐈 Cat</option><option>🐦 Bird</option><option>🐰 Rabbit</option><option>Other</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={state === 'loading'}
                className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed text-base">
                {state === 'loading' ? 'Sending…' : '🐾 Get App Link — It\'s Free'}
              </button>
              <p className="text-center text-xs text-gray-400">We&apos;ll send the app link to your phone & email. No spam, ever.</p>
            </form>
          </div>
        </div>
      </div>
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
                { icon: '📧', title: 'Email', val: 'support@petclub.in' },
                { icon: '📱', title: 'WhatsApp', val: '+1 (469) 751-2039' },
                { icon: '📍', title: 'HQ', val: 'Bengaluru, Karnataka, India' },
                { icon: '⏰', title: 'Support Hours', val: 'Mon–Sat, 9 AM – 7 PM IST' },
              ].map(item => (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center text-xl shrink-0">{item.icon}</div>
                  <div><div className="font-bold text-gray-900 text-sm">{item.title}</div><div className="text-gray-500 text-sm">{item.val}</div></div>
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
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-black">🐾</div>
              <span className="font-extrabold text-white text-lg">PET<span className="text-orange-400">club</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-4">India&apos;s #1 platform for pet grooming, training, vet care & food delivery. Now serving the USA too.</p>
            <div className="flex gap-3">
              {['🇮🇳 India', '🇺🇸 USA'].map(c => <span key={c} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full">{c}</span>)}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Services</h4>
            {['Grooming', 'Training', 'Vet Care', 'Pet Food', 'Pet Boarding'].map(s => (
              <a key={s} href={APP_URL} target="_blank" rel="noreferrer" className="block text-sm hover:text-orange-400 transition-colors py-1">{s}</a>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Company</h4>
            {['About Us', 'Careers', 'Blog', 'Press', 'Partners'].map(s => (
              <span key={s} className="block text-sm py-1 cursor-default">{s}</span>
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
          <span>© 2025 PETclub India Pvt Ltd. Made with 🐾 for pets everywhere.</span>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Cookies'].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
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
