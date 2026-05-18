import { useState } from 'react';

const API = 'http://localhost:5000/api';

const SERVICES = [
  { icon: '✂️', title: 'Grooming', desc: 'Professional bath, trim & styling at your doorstep', color: 'from-orange-400 to-orange-500' },
  { icon: '🎓', title: 'Training', desc: 'Certified trainers for obedience, agility & behaviour', color: 'from-amber-400 to-amber-500' },
  { icon: '🏥', title: 'Vet Care', desc: 'Book vet consultations & track vaccinations digitally', color: 'from-rose-400 to-rose-500' },
  { icon: '🍖', title: 'Pet Food', desc: 'Premium nutrition & treats delivered to your door', color: 'from-green-400 to-green-500' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', city: 'Mumbai', pet: 'Golden Retriever', text: 'PETclub made booking a groomer so easy! Max looks amazing and the groomer was so professional.', stars: 5 },
  { name: 'Arjun Nair', city: 'Bengaluru', pet: 'Labrador', text: 'The training sessions transformed my dog completely. Highly recommend PETclub to every pet parent!', stars: 5 },
  { name: 'Kavitha Reddy', city: 'Hyderabad', pet: 'Persian Cat', text: 'Vet booking in minutes! All my cat\'s health records are organised in the app. Life-changing!', stars: 5 },
];

const STATS = [
  { value: '50,000+', label: 'Happy Pets' },
  { value: '1,200+', label: 'Professionals' },
  { value: '100+', label: 'Cities' },
  { value: '4.8★', label: 'App Rating' },
];

const STEPS = [
  { step: '01', icon: '🐾', title: 'Create Pet Profile', desc: 'Add your pet\'s details — name, breed, age, health history — in seconds.' },
  { step: '02', icon: '📍', title: 'Book Near You', desc: 'Find verified professionals in your city and schedule at your convenience.' },
  { step: '03', icon: '📱', title: 'Track Real-Time', desc: 'Get live updates, digital records, and photos during every service.' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-orange-100 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-extrabold text-xl">
          <span>🐾</span>
          <span>PET<span className="text-orange-500">club</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <a href="#services" className="hover:text-orange-500 transition-colors">Services</a>
          <a href="#how" className="hover:text-orange-500 transition-colors">How It Works</a>
          <a href="#download" className="hover:text-orange-500 transition-colors">Download</a>
          <a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a>
        </div>
        <a href="#download" className="hidden md:inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors">
          📱 Get App
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-orange-50">
          {open ? '✕' : '☰'}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-orange-100 px-4 py-4 space-y-3">
          {['#services','#how','#download','#contact'].map((href, i) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block font-semibold text-gray-700 hover:text-orange-500 py-1">
              {['Services','How It Works','Download','Contact'][i]}
            </a>
          ))}
          <a href="#download" onClick={() => setOpen(false)} className="block bg-orange-500 text-white font-bold text-center py-3 rounded-xl mt-2">
            📱 Get App
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-orange-200 rounded-full opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-amber-200 rounded-full opacity-30 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6">
            🇮🇳 India&apos;s #1 Pet Care Platform
          </div>
          <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-6">
            Your Pet Deserves<br />
            <span className="text-gradient">The Best Care</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Book grooming, training, vet care & food delivery for your pet.
            All in one app — with verified professionals across 100+ Indian cities.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#download" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-lg hover:shadow-xl transition-all">
              📱 Download App
            </a>
            <a href="http://localhost:5175" className="border-2 border-orange-400 text-orange-600 hover:bg-orange-50 font-bold px-8 py-4 rounded-2xl text-base transition-all">
              🐾 Try Demo
            </a>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-orange-500">{s.value}</div>
                <div className="text-xs text-gray-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Phone mockup */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-64 h-[520px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] shadow-2xl p-3 border-4 border-gray-700">
              <div className="w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 rounded-[2.5rem] flex flex-col items-center justify-center text-white text-center p-6">
                <div className="text-6xl mb-4">🐾</div>
                <div className="font-black text-2xl mb-2">PETclub</div>
                <div className="text-sm opacity-90 mb-6">Your complete pet care app</div>
                <div className="space-y-2 w-full">
                  {['✂️ Grooming', '🎓 Training', '🏥 Vet Care', '🍖 Pet Food'].map(s => (
                    <div key={s} className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-sm font-semibold text-left">{s}</div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -left-10 top-20 bg-white shadow-xl rounded-2xl px-4 py-3 text-sm font-bold text-gray-800 border border-orange-100">
              ⭐ 4.8 Rating
            </div>
            <div className="absolute -right-10 bottom-24 bg-white shadow-xl rounded-2xl px-4 py-3 text-sm font-bold text-gray-800 border border-orange-100">
              🛡️ Insured
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Everything Your Pet Needs</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">One platform for all pet services — verified professionals, transparent pricing, digital records.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(s => (
            <div key={s.title} className="group rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className={`bg-gradient-to-br ${s.color} p-8 text-center`}>
                <div className="text-5xl mb-3">{s.icon}</div>
                <h3 className="text-white font-black text-xl">{s.title}</h3>
              </div>
              <div className="bg-white p-5">
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-3 text-orange-500 font-bold text-sm">Book Now →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">How PETclub Works</h2>
          <p className="text-gray-500 text-lg">Get started in under 2 minutes</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative text-center">
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-2/3 w-1/2 h-0.5 bg-orange-200" />
              )}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500 text-2xl mb-5 shadow-lg shadow-orange-200">
                {s.icon}
              </div>
              <div className="text-xs font-black text-orange-400 mb-2 tracking-widest">STEP {s.step}</div>
              <h3 className="text-xl font-black mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Loved by Pet Parents Across India</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-orange-50 rounded-3xl p-7 border border-orange-100">
              <div className="text-orange-400 text-lg mb-4">{'★'.repeat(t.stars)}</div>
              <p className="text-gray-700 leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.city} · {t.pet} owner</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Download() {
  return (
    <section id="download" className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-6xl mb-6">🐾</div>
        <h2 className="text-4xl font-black mb-4">Download PETclub Today</h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">Available on iOS and Android. Free to download — pay only for services you book.</p>
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a href="https://apps.apple.com/in/app/petclub" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all">
            <span className="text-2xl">🍎</span>
            <div className="text-left"><div className="text-xs text-gray-400">Download on the</div><div>App Store</div></div>
          </a>
          <a href="https://play.google.com/store/apps/details?id=in.petclub" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all">
            <span className="text-2xl">▶️</span>
            <div className="text-left"><div className="text-xs text-gray-400">Get it on</div><div>Google Play</div></div>
          </a>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', city: '', service: '' });
  const [state, setState] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setState('loading');
    try {
      await fetch(`${API}/contact/send-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, email: `${form.phone}@demo.petclub.in` }),
      });
      setState('done');
    } catch {
      setState('done');
    }
  };

  if (state === 'done') {
    return (
      <div className="max-w-md mx-auto bg-white/10 border border-white/20 rounded-3xl p-8 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-xl font-bold mb-2">App link sent!</h3>
        <p className="text-gray-400 text-sm">Check your phone for the download link.</p>
      </div>
    );
  }

  return (
    <div id="contact" className="max-w-md mx-auto">
      <p className="text-gray-400 mb-4 text-sm">Get the app link directly on your phone</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text" placeholder="Your name" required
          value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400"
        />
        <div className="flex gap-2">
          <span className="bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-sm text-gray-400">+91</span>
          <input
            type="tel" placeholder="Mobile number" required maxLength={10}
            value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g,'').slice(0,10) }))}
            className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400"
          />
        </div>
        <input
          type="text" placeholder="Your city"
          value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
          className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400"
        />
        <button
          type="submit" disabled={state === 'loading'}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {state === 'loading' ? 'Sending…' : '📱 Send Me the App Link'}
        </button>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-500 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white font-extrabold text-xl">
            <span>🐾</span><span>PET<span className="text-orange-500">club</span></span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
            <a href="#download" className="hover:text-white transition-colors">Download</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-sm text-center">
            © 2025 PETclub India · Made with 🐾 for pets
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Download />
      <Footer />
    </div>
  );
}
