import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Truck, ArrowRight, ChevronRight, Mail, MapPin, Phone, MessageCircle, Store, Factory, CheckCircle2, Sparkles, Globe } from 'lucide-react';
import Hero from '../Components/Hero.jsx';
import { assets } from '../assets/assets';

// 1. IMPROVED TRUST BAR: Uses glassmorphism and subtle ring animations for professional trust
const TrustBar = () => (
  <div className="w-full bg-slate-50/50 backdrop-blur-sm border-y border-slate-100 py-20 px-6 md:px-20">
    <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
      {[
        { icon: Truck, color: "emerald", label: "Islandwide Delivery", sub: "Fast & Secure To Your Doorstep" },
        { icon: Store, color: "blue", label: "Wholesale & Retail", sub: "Custom Orders & Bulk Supply" },
        { icon: Award, color: "amber", label: "Sri Lanka's 1st", sub: "The Original Bag Pioneers" }
      ].map((item, i) => (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          key={i} 
          className="flex flex-col items-center md:items-start gap-6 group"
        >
          <div className={`p-6 rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 group-hover:ring-${item.color}-500 group-hover:shadow-xl group-hover:shadow-${item.color}-500/10 transition-all duration-500`}>
            <item.icon size={32} className={`text-${item.color}-600`} />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-slate-900 font-black text-xs tracking-[0.3em] uppercase">{item.label}</h4>
            <p className="text-slate-400 text-[10px] mt-2 font-medium uppercase tracking-widest">{item.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="w-full bg-white min-h-screen font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* 1. Hero Section: Lowered z-index to ensure correct layering */}
      <div className="w-full h-screen overflow-hidden bg-black">
        <Hero />
      </div>

      <TrustBar />

      {/* 2. REFINED BRAND NARRATIVE: Split cinematic layout */}
      <section className="w-full py-40 px-6 md:px-20 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-blue-600" />
                <span className="text-blue-600 font-black text-[10px] tracking-[0.5em] uppercase italic">A Style for Every Story</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-serif italic text-slate-950 leading-[0.85] tracking-tighter">
                Sri Lanka's <br /> 
                <span className="text-slate-300">Best Brand.</span>
              </h2>
            </div>
            
            <p className="text-slate-500 leading-relaxed text-xl font-light max-w-lg border-l-2 border-slate-100 pl-8">
              As the nation's first premier bag brand, DMAX has been the companion of choice for millions. We merge technical precision with timeless Sri Lankan aesthetics.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8">
               {[
                 { icon: Sparkles, text: "Premier Craft" },
                 { icon: Globe, text: "Global Standards" }
               ].map((feat, i) => (
                 <div key={i} className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
                      <feat.icon size={20} className="text-slate-400" />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-900">{feat.text}</span>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* CINEMATIC IMAGE PANEL */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group cursor-none"
          >
            <div className="aspect-[4/5] lg:aspect-[16/11] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative z-10 bg-slate-100">
               <img 
                src={assets.hand} 
                alt="DMAX Signature Craft" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out"
              />
              
              {/* UPDATED BRAND SEAL: Slogan & Logo Integration */}
              <div className="absolute top-12 left-12 pointer-events-none">
                 <div className="bg-white/95 backdrop-blur-2xl px-10 py-5 rounded-[2.5rem] border border-white/50 flex items-center gap-6 shadow-2xl transform -rotate-3 transition-transform group-hover:rotate-0 duration-700">
                    <img src={assets.logo} alt="DMAX" className="h-10 w-auto object-contain" />
                    <div className="w-[1.5px] h-8 bg-slate-200" />
                    <div className="flex flex-col">
                       <span className="text-[11px] font-black tracking-[0.2em] text-slate-950 uppercase italic leading-none">
                          A Style for Every Story
                       </span>
                       <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">
                          Authentic Selection
                       </span>
                    </div>
                 </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/20 via-transparent to-transparent opacity-60" />
            </div>
            <div className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-[150px] -z-0" />
          </motion.div>
        </div>
      </section>

 

      {/* 3. Simple Modern Footer */}
      <footer className="w-full py-24 px-10 border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
           <div className="flex items-center gap-8">
             <img src={assets.logo} className="h-8 brightness-0 opacity-20 hover:opacity-100 transition-opacity cursor-pointer" alt="DMAX" />
             <div className="h-6 w-px bg-slate-200" />
             <p className="text-[10px] font-black tracking-[0.3em] text-slate-300 uppercase">Sri Lanka's Signature</p>
           </div>
           
           <div className="text-center md:text-right space-y-2">
             <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase italic leading-none">A Style for Every Story</p>
             <p className="text-slate-300 text-[9px] font-medium tracking-[0.2em] uppercase">
               © 2026 SAHAN DMAX LANKA PRIVATE LIMITED
             </p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;