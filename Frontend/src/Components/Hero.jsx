import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import { assets } from '../assets/assets';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const collections = [
    { id: 1, img: assets.school, title: "Academia", subtitle: "CAMPUS ELITE" },
    { id: 2, img: assets.travel, title: "Explorer", subtitle: "NOMAD GRADE" },
    { id: 3, img: assets.ofz, title: "Executive", subtitle: "URBAN STYLE" },
    { id: 4, img: assets.handbag, title: "Elegance", subtitle: "TIMELESS GRACE" },
    { id: 5, img: assets.primary, title: "Genesis", subtitle: "JUNIOR SERIES" },
  ];

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) setActiveIndex((prev) => (prev + 1) % collections.length);
    if (distance < -50) setActiveIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
    setTouchStart(null); setTouchEnd(null);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % collections.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const activeItem = collections[activeIndex];

  return (
    <section 
      className="relative w-full min-h-screen lg:h-[90vh] bg-[#FDFDFD] flex flex-col items-center justify-start pt-12 lg:pt-10 overflow-hidden font-sans z-10"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* 1. BRAND IDENTITY BADGE - Refined with neutral tones and champagne accents */}
      <div className="absolute top-6 right-4 lg:top-8 lg:right-8 z-50">
        <div className="bg-white/80 backdrop-blur-2xl px-5 lg:px-8 py-3 lg:py-4 rounded-full border border-neutral-100 flex items-center gap-4 lg:gap-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]">
          <img src={assets.logo} alt="Dmax" className="h-4 lg:h-6 w-auto object-contain grayscale opacity-80" />
          <div className="w-[1px] h-4 bg-neutral-200" />
          <span className="text-[8px] lg:text-[10px] font-bold tracking-[0.4em] text-[#B8987E] uppercase italic">A Style for Every Story</span>
        </div>
      </div>

      {/* 2. BACKGROUND ARCHITECTURE - Editorial Outline Typography */}
      <div className="absolute inset-0 flex items-start justify-center pt-24 lg:pt-20 pointer-events-none select-none z-0">
        <AnimatePresence mode="wait">
          <motion.h2
            key={`bg-text-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 0.04, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -30 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] font-serif italic uppercase tracking-tighter text-black leading-none px-4 text-center"
          >
            {activeItem.title}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* 3. PRODUCT GALLERY - Enhanced with "Liquid" transitions and premium shadows */}
      <div className="relative w-full h-[65vh] lg:h-[75%] flex items-center justify-center px-4 sm:px-6 lg:px-12 z-20 mt-4 lg:mt-0">
        <div className="relative w-full max-w-[1500px] h-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 lg:overflow-visible">
            {collections.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  layout
                  className={`
                    relative cursor-pointer overflow-hidden transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1)
                    flex-shrink-0
                    ${isActive 
                      ? 'lg:flex-[5] w-full lg:w-auto rounded-[2.5rem] lg:rounded-[5rem] h-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white/50' 
                      : 'lg:flex-[0.6] w-3/4 lg:w-auto rounded-3xl lg:rounded-[3rem] h-[45%] lg:h-[70%] opacity-20 grayscale hover:opacity-40 transition-all'}
                  `}
                >
                  <div className="absolute inset-0 bg-white">
                    <motion.img 
                      src={item.img} 
                      animate={{ scale: isActive ? 1.02 : 1.4, filter: isActive ? 'blur(0px)' : 'blur(8px)' }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className={`w-full h-full ${isActive ? 'object-contain p-10 lg:p-20' : 'object-cover'}`} 
                      alt="" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-30">
                        {/* EXPLORE BUTTON - Reimagined as a prestige seal */}
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }} 
                          animate={{ y: 0, opacity: 1 }} 
                          className="absolute bottom-10 right-6 lg:bottom-16 lg:right-12"
                        >
                          <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            className="group flex items-center gap-5 bg-black text-white px-8 lg:px-12 py-4 lg:py-5 rounded-full font-black text-[10px] lg:text-[12px] tracking-[0.4em] transition-all uppercase shadow-2xl overflow-hidden relative"
                          >
                            <span className="relative z-10">Explore</span>
                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#B8987E] text-white rounded-full flex items-center justify-center relative z-10 transition-transform group-hover:rotate-45">
                               <ArrowUpRight size={18} />
                            </div>
                            <div className="absolute inset-0 bg-[#B8987E] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                          </motion.button>
                        </motion.div>

                        {/* Title Typography - Serif & Italic for luxury feel */}
                        <div className="absolute inset-x-0 bottom-0 p-8 lg:p-16 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none">
                          <div className="space-y-3 lg:space-y-6">
                            <div className="flex items-center gap-4">
                              <span className="h-[1px] w-8 lg:w-16 bg-[#B8987E]/40" />
                              <span className="text-[10px] lg:text-[11px] font-black tracking-[0.6em] uppercase text-[#B8987E]">{item.subtitle}</span>
                            </div>
                            <h1 className="text-4xl lg:text-7xl xl:text-8xl font-serif italic text-[#1A1A1A] uppercase tracking-tighter leading-none">
                              {item.title}
                            </h1>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. NAVIGATION PROGRESS - Champagne Gold Accents */}
      <div className="hidden lg:flex absolute bottom-12 w-full max-w-[1500px] justify-between items-center px-16 z-40">
        <div className="flex gap-5">
          {collections.map((_, i) => (
            <div key={i} className="relative h-1 w-16 bg-neutral-100 rounded-full overflow-hidden">
               <motion.div 
                  initial={false}
                  animate={{ width: activeIndex === i ? '100%' : '0%' }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 bg-[#B8987E]" 
               />
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => setActiveIndex(prev => (prev + 1) % collections.length)} 
          className="w-16 h-16 rounded-full border border-neutral-100 bg-white/50 backdrop-blur-xl shadow-xl flex items-center justify-center text-neutral-800 hover:bg-black hover:text-white transition-all duration-700 group"
        >
          <MoveRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </section>
  );
};

export default Hero;