import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronRight, Play } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import heroBg from '@/assets/images/hero-bg.png';
import suitMens from '@/assets/images/suit-mens.png';
import suitWomens from '@/assets/images/suit-womens.png';
import skincareSerum from '@/assets/images/skincare-serum.png';
import skincareCream from '@/assets/images/skincare-cream.png';
import atelier from '@/assets/images/atelier.png';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const formatNGN = (amount: number): string =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);

function Navbar() {
  const { mobileNavOpen, setMobileNavOpen } = useAppStore();
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/5 ${scrolled ? 'bg-background/80 backdrop-blur-xl py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase font-serif text-muted-foreground">
          <a href="#collections" className="hover:text-primary transition-colors">Collections</a>
          <a href="#skincare" className="hover:text-primary transition-colors">Skincare</a>
          <a href="#atelier" className="hover:text-primary transition-colors">Atelier</a>
        </div>

        <a href="/" className="text-2xl tracking-[0.3em] font-serif text-foreground">
          AVELLIN
        </a>

        <div className="hidden md:flex items-center gap-8">
          <button className="text-xs tracking-widest uppercase font-serif text-muted-foreground hover:text-primary transition-colors">
            Sign In
          </button>
          <Link
            to="/register"
            className="text-xs tracking-widest uppercase font-serif bg-primary/10 text-primary border border-primary/20 px-6 py-2.5 hover:bg-primary hover:text-primary-foreground transition-all duration-500"
          >
            Request Access
          </Link>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-t border-white/5 md:hidden flex flex-col items-center justify-center gap-8 text-sm tracking-widest uppercase font-serif"
          >
            <a href="#collections" onClick={() => setMobileNavOpen(false)} className="hover:text-primary transition-colors">Collections</a>
            <a href="#skincare" onClick={() => setMobileNavOpen(false)} className="hover:text-primary transition-colors">Skincare</a>
            <a href="#atelier" onClick={() => setMobileNavOpen(false)} className="hover:text-primary transition-colors">Atelier</a>
            <Link
              to="/register"
              onClick={() => setMobileNavOpen(false)}
              className="text-primary border border-primary/20 px-8 py-3 mt-4"
            >
              Request Access
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Lagos boardroom"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background"></div>
      </div>

      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-800/30 to-transparent hidden lg:block"></div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12 flex flex-col items-center text-center mt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl"
        >
          <motion.p variants={fadeUp} className="text-primary text-xs md:text-sm tracking-[0.4em] uppercase font-serif mb-8">
            Lagos &#8212; London &#8212; Dubai
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal tracking-wide text-foreground mb-10 leading-[1.1]">
            AMBITION MEETS <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/80 to-emerald-600/70 italic">REFINEMENT</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Nigeria's private marketplace for the discerning professional. Where Lekki boardrooms meet bespoke tailoring, and African botanical mastery meets global skincare science.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-4 text-xs tracking-widest uppercase font-serif hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 group">
              Explore Collection
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto text-foreground px-10 py-4 text-xs tracking-widest uppercase font-serif border border-border hover:border-primary/50 transition-colors flex items-center justify-center gap-3 group">
              <Play size={10} className="fill-current text-primary" />
              The Atelier Vision
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="py-32 bg-background relative border-t border-white/5">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-emerald-800/40 to-transparent"></div>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif tracking-widest leading-relaxed text-foreground/90">
            "THE NIGERIAN PROFESSIONAL DOES NOT SEEK VALIDATION. THEY ARRIVE, AND THE ROOM ADJUSTS."
          </motion.h2>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 my-12">
            <div className="w-8 h-[1px] bg-emerald-700"></div>
            <div className="w-12 h-[1px] bg-primary"></div>
            <div className="w-8 h-[1px] bg-emerald-700"></div>
          </motion.div>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg font-light leading-loose">
            Avellin was born on the 26th floor of a Lagos tower, where African craftsmanship met global precision. We source hand-loomed aso-oke threads, super 160s merino from the highlands, and cold-pressed botanical serums from across the continent. Every piece is a quiet declaration. No noise. Only excellence.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function CorporateWear() {
  return (
    <section id="collections" className="py-32 bg-card relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-xl"
          >
            <p className="text-primary text-xs tracking-widest uppercase font-serif mb-4">01 &#8212; The Wardrobe</p>
            <h2 className="text-4xl md:text-5xl font-serif tracking-wide">LAGOS TO LONDON</h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest uppercase font-serif text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
          >
            View All Pieces <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-primary" />
          </motion.button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16"
        >
          <motion.div variants={fadeUp} className="group cursor-pointer">
            <div className="relative overflow-hidden aspect-[3/4] mb-6">
              <img src={suitMens} alt="Men's bespoke suit" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              <div className="absolute top-4 left-4">
                <span className="text-[10px] tracking-widest uppercase font-serif text-emerald-400/80 border border-emerald-800/40 bg-background/60 px-2 py-1">Handcrafted</span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif tracking-wide text-xl mb-2 group-hover:text-primary transition-colors">The Aso-Oke Executive</h3>
                <p className="text-muted-foreground font-light text-sm">Super 160s Merino &#8226; Hand-Woven Accents</p>
              </div>
              <span className="font-serif text-sm">{formatNGN(2950000)}</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="group cursor-pointer md:mt-24">
            <div className="relative overflow-hidden aspect-[3/4] mb-6">
              <img src={suitWomens} alt="Women's tailored blazer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              <div className="absolute top-4 left-4">
                <span className="text-[10px] tracking-widest uppercase font-serif text-emerald-400/80 border border-emerald-800/40 bg-background/60 px-2 py-1">Limited Edition</span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif tracking-wide text-xl mb-2 group-hover:text-primary transition-colors">The Victoria Island Silhouette</h3>
                <p className="text-muted-foreground font-light text-sm">Structured Silk Crepe &#8226; Lagos Cut</p>
              </div>
              <span className="font-serif text-sm">{formatNGN(2560000)}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Skincare() {
  return (
    <section id="skincare" className="py-32 bg-background relative border-t border-white/5">
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-emerald-800/30 to-transparent"></div>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row-reverse justify-between items-end mb-20 gap-8 text-right">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-xl md:text-right"
          >
            <p className="text-primary text-xs tracking-widest uppercase font-serif mb-4">02 &#8212; The Regimen</p>
            <h2 className="text-4xl md:text-5xl font-serif tracking-wide">BOTANICAL MASTERY</h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest uppercase font-serif text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group flex-row-reverse md:flex-row"
          >
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-primary hidden md:block rotate-180 md:rotate-0" />
            Explore Regimen
          </motion.button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeUp} className="group cursor-pointer lg:col-span-1">
            <div className="relative overflow-hidden aspect-square lg:aspect-[3/4] mb-6 bg-card border border-white/5 flex items-center justify-center p-12">
              <img src={skincareSerum} alt="Shea & Oud Renewal Serum" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl" />
            </div>
            <div>
              <h3 className="font-serif tracking-wide text-lg mb-1 group-hover:text-primary transition-colors">Shea &amp; Oud Renewal Serum</h3>
              <p className="text-muted-foreground font-light text-sm mb-3">Cold-Pressed Shea &#8226; Oud Extract &#8226; Peptides</p>
              <span className="font-serif text-sm text-emerald-500">{formatNGN(296000)}</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="group cursor-pointer lg:col-span-1 lg:mt-16">
            <div className="relative overflow-hidden aspect-square lg:aspect-[3/4] mb-6 bg-card border border-white/5 flex items-center justify-center p-12">
              <img src={skincareCream} alt="Moringa Night Repair Cream" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl" />
            </div>
            <div>
              <h3 className="font-serif tracking-wide text-lg mb-1 group-hover:text-primary transition-colors">Moringa Night Repair Cream</h3>
              <p className="text-muted-foreground font-light text-sm mb-3">Baobab Oil &#8226; Moringa Leaf &#8226; Ceramide Complex</p>
              <span className="font-serif text-sm text-emerald-500">{formatNGN(335000)}</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-1 flex flex-col justify-center lg:pl-12 pt-12 lg:pt-0">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-[1px] bg-emerald-700"></div>
              <div className="w-8 h-[1px] bg-primary"></div>
            </div>
            <h3 className="font-serif text-2xl mb-6 leading-relaxed">Formulated for the skin of high-performance Africa.</h3>
            <p className="text-muted-foreground font-light leading-loose mb-10 text-sm">
              Each formula is developed with African dermatologists and harvested from continent-sourced botanicals &#8212; moringa from Kaduna, baobab from the Sahel, shea from Benue. Engineered to combat humidity, UV intensity, and the demands of an executive lifestyle.
            </p>
            <button className="self-start text-xs tracking-widest uppercase font-serif border-b border-emerald-700/50 pb-1 text-emerald-500 hover:border-emerald-500 transition-colors">
              Read The Science
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Atelier() {
  return (
    <section id="atelier" className="py-32 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-primary text-xs tracking-widest uppercase font-serif mb-6">03 &#8212; The Experience</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-wide mb-8 leading-[1.1]">
              PRIVATE <br />FITTINGS
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground font-light leading-loose text-lg mb-10 max-w-md">
              Step into our private ateliers in Lagos, London, or Dubai. Experience one-on-one styling by master tailors, bespoke measurements, and a curated skincare consultation over chilled zobo or aged cognac. This is where Sanusi meets Savile Row.
            </motion.p>
            <motion.div variants={fadeUp}>
              <button className="bg-primary/10 text-primary border border-primary/20 px-8 py-4 text-xs tracking-widest uppercase font-serif hover:bg-primary hover:text-primary-foreground transition-all duration-500">
                Book An Appointment
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden relative">
              <img src={atelier} alt="Private Atelier" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 -left-8 w-52 aspect-square bg-background p-6 border border-emerald-900/40 hidden md:block">
              <p className="font-serif text-xs uppercase tracking-widest text-emerald-500 mb-2">Flagship Location</p>
              <p className="font-serif text-xl">Victoria Island</p>
              <p className="text-muted-foreground font-light text-xs mt-2">Lagos, Nigeria</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const { emailSubscribed, setEmailSubscribed } = useAppStore();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setEmailSubscribed(true);
  };

  return (
    <section className="py-32 bg-background relative border-t border-white/5 text-center">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif tracking-wide mb-6">THE INNER CIRCLE</motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground font-light leading-loose mb-12">
            Early invitations to Lagos trunk shows, new botanical formulations, and editorial insights from the continent's most refined professionals.
          </motion.p>

          <AnimatePresence mode="wait">
            {!emailSubscribed ? (
              <motion.form
                key="form"
                variants={fadeUp}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent border-b border-white/20 px-4 py-4 text-sm font-light text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                />
                <button type="submit" className="text-xs tracking-widest uppercase font-serif text-primary border border-primary/20 px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all">
                  Subscribe
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-6 border border-emerald-800/40 bg-emerald-950/30 text-emerald-400 font-serif tracking-widest uppercase text-sm"
              >
                Welcome to the Inner Circle.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-card pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl tracking-[0.3em] font-serif text-foreground mb-6">AVELLIN</h2>
            <p className="text-muted-foreground font-light text-sm max-w-sm leading-loose">
              Nigeria's premium destination for the African corporate elite. Bespoke tailoring, botanical skincare, and the quiet confidence of continental craftsmanship.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
              <p className="text-xs text-muted-foreground/60 font-light tracking-wider uppercase">Lagos &#8226; London &#8226; Dubai</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase font-serif text-primary mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-light text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">The Wardrobe</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Botanical Regimen</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Private Ateliers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">The Journal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase font-serif text-primary mb-6">Assistance</h4>
            <ul className="space-y-4 text-sm font-light text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Client Services</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bespoke Inquiries</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Delivery &amp; Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms &amp; Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-muted-foreground/50 font-light">
          <p>&copy; {new Date().getFullYear()} AVELLIN. All rights reserved. RC 1234567</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors uppercase tracking-wider">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors uppercase tracking-wider">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <Hero />
      <Manifesto />
      <CorporateWear />
      <Skincare />
      <Atelier />
      <Newsletter />
      <Footer />
    </div>
  );
}
