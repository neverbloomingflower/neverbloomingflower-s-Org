import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Instagram, 
  Facebook, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronDown, 
  X,
  Utensils,
  ShoppingBag,
  Sparkles,
  Send
} from 'lucide-react';

type Language = 'en' | 'ka';

interface MenuItem {
  id: string;
  name: { en: string; ka: string };
  desc: { en: string; ka: string };
  price: string;
  category: 'coffee' | 'drinks' | 'food' | 'cocktails';
  icon: React.ReactNode;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'espresso',
    category: 'coffee',
    name: { en: 'Espresso', ka: 'ესპრესო' },
    desc: { en: 'Classic single shot, rich golden crema, intense aroma', ka: 'კლასიკური ერთი ჩასხმა, მდიდარი ოქროსფერი კრემა' },
    price: '₾ 4',
    icon: <Coffee className="w-12 h-12 text-amber-700" />
  },
  {
    id: 'cappuccino',
    category: 'coffee',
    name: { en: 'Cappuccino', ka: 'კაპუჩინო' },
    desc: { en: 'Espresso, steamed milk and silky microfoam', ka: 'ესპრესო, ორთქლზე მოხარშული რძე და ნაზი ქაფი' },
    price: '₾ 7',
    icon: <Coffee className="w-12 h-12 text-amber-600" />
  },
  {
    id: 'latte',
    category: 'coffee',
    name: { en: 'Latte', ka: 'ლატე' },
    desc: { en: 'Smooth espresso with creamy steamed milk and latte art', ka: 'რბილი ესპრესო კრემოვანი რძით და ლატე ართით' },
    price: '₾ 8',
    icon: <Coffee className="w-12 h-12 text-amber-500" />
  },
  {
    id: 'bruschetta',
    category: 'food',
    name: { en: 'Bruschetta', ka: 'ბრუსკეტა' },
    desc: { en: 'Grilled sourdough, vine tomatoes, basil, extra-virgin olive oil', ka: 'გამომწვარი პური, პომიდორი, რეჰანი, ზეითუნის ზეთი' },
    price: '₾ 12',
    icon: <Utensils className="w-12 h-12 text-red-600" />
  },
  {
    id: 'tiramisu',
    category: 'food',
    name: { en: 'Tiramisù', ka: 'ტირამისუ' },
    desc: { en: 'Mascarpone, espresso-soaked savoiardi, fine cocoa dust', ka: 'მასკარპონე, ესპრესოში გაჟღენთილი საბოიარდი, კაკაოს ფხვნილი' },
    price: '₾ 14',
    icon: <Sparkles className="w-12 h-12 text-amber-900" />
  }
];

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<MenuItem['category']>('coffee');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = (key: string) => {
    const translations: Record<string, { en: string; ka: string }> = {
      heroTitle: { en: 'Espresso Cafe & Shop', ka: 'ესპრესო კაფე და მაღაზია' },
      heroSub: { en: 'Milanese Bistro Vekua', ka: 'მილანური ბისტრო ვეკუა' },
      heroTag: { en: 'Where every cup tells a story. Fine coffee, warm atmosphere, and the spirit of Milan in the heart of Tbilisi.', ka: 'სადაც თითოეული ფინჯანი ყვება ისტორიას. შესანიშნავი ყავა, თბილი ატმოსფერო და მილანის სული თბილისის გულში.' },
      viewMenu: { en: 'View Menu', ka: 'მენიუ' },
      findUs: { en: 'Find Us', ka: 'გვიპოვე' },
      aboutTitle: { en: 'A Milanese Heart in Tbilisi', ka: 'მილანური გული თბილისში' },
      aboutText: { en: "Espresso Cafe & Shop is more than a coffee house — it's a warm corner of Milan nestled in the vibrant streets of Tbilisi.", ka: "Espresso Cafe & Shop ყავის სახლზე მეტია — ეს მილანის თბილი კუთხეა, თბილისის ცოცხალ ქუჩებში." },
      contactTitle: { en: 'Contact Us', ka: 'დაგვიკავშირდით' },
      sendMsg: { en: 'Send Message', ka: 'გაგზავნა' },
      yourName: { en: 'Your Name', ka: 'თქვენი სახელი' },
      phoneEmail: { en: 'Phone or Email', ka: 'ტელეფონი ან ელ-ფოსტა' },
      message: { en: 'Message', ka: 'შეტყობინება' },
      success: { en: 'Thank you! Your message will be sent to jonifarcvania1234@gmail.com', ka: 'გმადლობთ! თქვენი შეტყობინება გაიგზავნება jonifarcvania1234@gmail.com-ზე' }
    };
    return translations[key]?.[lang] || key;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setStatus({ type: 'success', msg: t('success') });
        setFormData({ name: '', contact: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: 'Failed to send message.' });
      }
    } catch (error) {
      setStatus({ type: 'error', msg: 'An error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#faf7f2] text-[#2c1a0e] font-serif selection:bg-amber-100`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-20 bg-white/80 backdrop-blur-md border-b border-amber-900/10">
        <div className="flex items-center gap-6">
          <a href="#" className="text-xl font-bold tracking-tight text-[#2c1a0e]">Espresso Cafe</a>
          <div className="hidden md:flex gap-4">
            <a href="https://facebook.com" className="p-2 hover:bg-amber-50 rounded-full transition-colors"><Facebook size={18} /></a>
            <a href="https://instagram.com" className="p-2 hover:bg-amber-50 rounded-full transition-colors"><Instagram size={18} /></a>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex gap-8 uppercase text-xs tracking-widest font-medium">
            <a href="#about" className="hover:text-amber-600 transition-colors">About</a>
            <a href="#menu" className="hover:text-amber-600 transition-colors">Menu</a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">Contact</a>
          </div>
          
          <div className="flex border border-amber-900/20 rounded-full overflow-hidden">
            <button 
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 text-[10px] font-bold transition-colors ${lang === 'en' ? 'bg-amber-700 text-white' : 'hover:bg-amber-50'}`}
            >EN</button>
            <button 
              onClick={() => setLang('ka')}
              className={`px-4 py-1.5 text-[10px] font-bold transition-colors ${lang === 'ka' ? 'bg-amber-700 text-white' : 'hover:bg-amber-50'}`}
            >ქა</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(196,135,74,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(92,61,46,0.06)_0%,transparent_50%)]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-600 mb-6">Tbilisi · Georgia</p>
          <h1 className="text-6xl md:text-8xl font-bold text-[#2c1a0e] leading-[0.9] mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-xl italic text-amber-600 mb-8">{t('heroSub')}</p>
          <p className="text-lg text-stone-500 max-w-md mx-auto leading-relaxed mb-12">
            {t('heroTag')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#menu" className="px-10 py-4 bg-[#2c1a0e] text-[#f5efe6] uppercase text-xs tracking-widest font-bold hover:bg-amber-800 transition-colors">
              {t('viewMenu')}
            </a>
            <a href="#contact" className="px-10 py-4 border border-[#2c1a0e] text-[#2c1a0e] uppercase text-xs tracking-widest font-bold hover:bg-[#2c1a0e] hover:text-white transition-all">
              {t('findUs')}
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 text-stone-400">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-[#f5efe6]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/5] bg-[#2c1a0e] rounded-sm overflow-hidden flex items-center justify-center group">
            <Coffee size={120} className="text-amber-600/20 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-600 rounded-full flex flex-col items-center justify-center text-white shadow-2xl">
              <span className="text-2xl font-bold">☕</span>
              <span className="text-[10px] uppercase tracking-widest mt-1">Est. 2018</span>
            </div>
          </div>
          
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-600 mb-4">Our Story</p>
            <h2 className="text-4xl font-bold text-[#2c1a0e] mb-8 leading-tight">{t('aboutTitle')}</h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-6">{t('aboutText')}</p>
            <p className="text-lg text-stone-600 leading-relaxed mb-10">
              Every bean is carefully sourced, every cup crafted with precision and love. 
              Whether you're here for a quick espresso or a long afternoon with friends, we make every moment count.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Coffee size={20} />, title: 'Specialty Coffee', sub: 'Single origin' },
                { icon: <Utensils size={20} />, title: 'Italian Kitchen', sub: 'Authentic recipes' },
                { icon: <ShoppingBag size={20} />, title: 'Coffee Shop', sub: 'Take home blends' },
                { icon: <Sparkles size={20} />, title: 'Atmosphere', sub: 'Warm & cozy' }
              ].map((feat, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{feat.title}</h4>
                    <p className="text-xs text-stone-500">{feat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-600 mb-4">What We Offer</p>
            <h2 className="text-5xl font-bold text-[#2c1a0e]">Our Menu</h2>
            <div className="w-16 h-px bg-amber-600 mx-auto mt-6" />
          </div>

          <div className="flex justify-center mb-16">
            <div className="inline-flex border border-amber-900/10 rounded-full p-1 bg-white shadow-sm">
              {['coffee', 'drinks', 'food', 'cocktails'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat as any)}
                  className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === cat ? 'bg-[#2c1a0e] text-white shadow-lg' : 'text-stone-400 hover:text-amber-700'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {MENU_ITEMS.filter(item => item.category === activeTab).map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedItem(item)}
                  className="group bg-white border border-amber-900/5 p-8 rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles size={16} className="text-amber-400" />
                  </div>
                  <div className="h-24 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.name[lang]}</h3>
                  <p className="text-sm text-stone-500 mb-4 line-clamp-2">{item.desc[lang]}</p>
                  <p className="text-lg font-bold text-amber-600">{item.price}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-[#f5efe6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-600 mb-4">Get In Touch</p>
            <h2 className="text-5xl font-bold text-[#2c1a0e]">{t('contactTitle')}</h2>
            <div className="w-16 h-px bg-amber-600 mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-10">
              {[
                { icon: <Phone size={20} />, label: 'Phone', val: '+995 591 00 81 90', link: 'tel:+995591008190' },
                { icon: <MapPin size={20} />, label: 'Location', val: 'Vekua Street, Tbilisi, Georgia' },
                { icon: <Clock size={20} />, label: 'Hours', val: 'Mon – Fri: 8:00 – 22:00\nSat – Sun: 9:00 – 23:00' },
                { icon: <Instagram size={20} />, label: 'Instagram', val: '@milanesebistrovekua', link: 'https://instagram.com' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl border border-amber-900/10 flex items-center justify-center text-amber-600 shrink-0 bg-white">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-amber-600 mb-1">{item.label}</p>
                    {item.link ? (
                      <a href={item.link} className="text-lg hover:text-amber-600 transition-colors">{item.val}</a>
                    ) : (
                      <p className="text-lg whitespace-pre-line">{item.val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-xl border border-amber-900/5">
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-2">{t('yourName')}</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-100 px-4 py-3 rounded-lg focus:outline-none focus:border-amber-600 transition-colors"
                    placeholder="—"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-2">{t('phoneEmail')}</label>
                  <input 
                    required
                    type="text" 
                    value={formData.contact}
                    onChange={e => setFormData({...formData, contact: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-100 px-4 py-3 rounded-lg focus:outline-none focus:border-amber-600 transition-colors"
                    placeholder="—"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-2">{t('message')}</label>
                  <textarea 
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-100 px-4 py-4 rounded-lg focus:outline-none focus:border-amber-600 transition-colors min-h-[120px]"
                    placeholder="—"
                  />
                </div>
                
                <button 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#2c1a0e] text-white uppercase text-xs tracking-widest font-bold hover:bg-amber-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      {t('sendMsg')}
                      <Send size={14} />
                    </>
                  )}
                </button>

                {status && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-center text-sm mt-4 ${status.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}
                  >
                    {status.msg}
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c1a0e] text-amber-100/40 py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-2">Espresso Cafe & Shop</h2>
          <p className="italic text-amber-500/60 mb-10">Milanese Bistro Vekua · Tbilisi, Georgia</p>
          
          <div className="flex justify-center gap-6 mb-12">
            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all"><Facebook size={20} /></a>
            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all"><Instagram size={20} /></a>
          </div>
          
          <p className="text-[10px] uppercase tracking-widest opacity-40">
            © 2024 Espresso Cafe & Shop · +995 591 00 81 90
          </p>
        </div>
      </footer>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#faf7f2] w-full max-w-lg p-12 rounded-2xl text-center shadow-2xl"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 text-stone-400 hover:text-[#2c1a0e] transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-10 flex justify-center scale-150 py-10">
                {selectedItem.icon}
              </div>
              
              <h2 className="text-3xl font-bold mb-4">{selectedItem.name[lang]}</h2>
              <p className="text-stone-500 leading-relaxed mb-8">{selectedItem.desc[lang]}</p>
              <p className="text-2xl font-bold text-amber-600">{selectedItem.price}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
