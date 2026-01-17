import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Globe, MoveRight, Instagram, Facebook, CheckCircle2, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { assets } from '../assets/assets';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const collections = [
    { id: 1, img: assets.school, title: "Academia", subtitle: "CAMPUS ELITE" },
    { id: 2, img: assets.travel, title: "Explorer", subtitle: "NOMAD GRADE" },
    { id: 3, img: assets.ofz, title: "Executive", subtitle: "URBAN STYLE" },
    { id: 4, img: assets.handbag, title: "Elegance", subtitle: "TIMELESS GRACE" },
    { id: 5, img: assets.primary, title: "Genesis", subtitle: "JUNIOR SERIES" },
  ];

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % collections.length);
    }
    if (isRightSwipe) {
      setActiveIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
    }
    
    setTouchStart(null);
    setTouchEnd(null);
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
      className="relative w-full min-h-screen lg:h-[85vh] bg-[#f8f8f8] flex items-center justify-center overflow-hidden font-sans z-10"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Mobile Navigation Overlay */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div className="flex justify-between items-center p-4 bg-white/90 backdrop-blur-sm border-b border-black/5">
          <img src={assets.logo} alt="Dmax" className="h-8 w-auto" />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border-b border-black/5"
            >
              <div className="p-4 space-y-4">
                {['Collections', 'About', 'Stores', 'Contact'].map((item) => (
                  <a key={item} href="#" className="block text-sm font-medium text-black/70 hover:text-black py-2">
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 1. ARCHITECTURAL BACKGROUND LAYER */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <AnimatePresence mode="wait">
          <motion.h2
            key={`bg-text-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: [0.02, 0.04, 0.02], scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -50 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="text-[15vw] sm:text-[18vw] lg:text-[25vw] font-black uppercase tracking-tighter text-black/5 lg:text-black/10 leading-none px-4 text-center"
          >
            {activeItem.title}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* 2. MAIN PRODUCT GALLERY */}
      <div className="relative w-full h-full lg:h-[75%] flex items-center justify-center px-4 sm:px-6 lg:px-12 z-20 mt-16 lg:mt-0">
        <div className="relative w-full max-w-[1400px] h-full lg:h-[75%] flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
          
          <div className="relative w-full h-[60vh] lg:h-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory">
            {collections.map((item, index) => {
              const isActive = activeIndex === index;
              
              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  layout
                  className={`
                    relative cursor-pointer overflow-hidden group transition-all duration-1000 ease-[cubic-bezier(0.23, 1, 0.32, 1)]
                    flex-shrink-0 snap-center
                    ${isActive 
                      ? 'lg:flex-[4] w-full lg:w-auto rounded-3xl lg:rounded-[4rem] h-[55vh] lg:h-full shadow-2xl' 
                      : 'lg:flex-[0.8] w-3/4 lg:w-auto rounded-2xl lg:rounded-[2rem] h-[45vh] lg:h-[80%] opacity-40 lg:opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
                    }
                  `}
                  style={{ touchAction: 'pan-y' }}
                >
                  <div className="absolute inset-0 bg-white">
                    <motion.img 
                      src={item.img} 
                      animate={{ 
                        scale: isActive ? 1.05 : 1.3,
                        filter: isActive ? 'blur(0px)' : 'blur(4px)'
                      }}
                      transition={{ duration: 1.2 }}
                      className={`w-full h-full ${
                        isActive 
                          ? 'object-contain p-8 lg:p-12' 
                          : 'object-cover'
                      }`} 
                      alt={item.title} 
                    />
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="absolute inset-0 z-30"
                      >
                        {/* UPDATED: COMPACT LOGO BADGE - Smaller and further right */}
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute top-6 right-2 lg:top-8 lg:right-6"
                        >
                          <div className="bg-white/90 backdrop-blur-xl px-3 lg:px-5 py-2 lg:py-3 rounded-xl lg:rounded-[1.5rem] border border-slate-100 flex items-center gap-3 lg:gap-5 shadow-2xl transform rotate-1">
                            <img src={assets.logo} alt="Dmax" className="h-5 lg:h-7 w-auto object-contain" />
                            <div className="w-[1px] h-4 lg:h-5 bg-slate-200" />
                            <span className="text-[7px] lg:text-[9px] font-black tracking-[0.1em] lg:tracking-[0.15em] text-slate-800 uppercase italic whitespace-nowrap">
                              A Style for Every Story
                            </span>
                          </div>
                        </motion.div>

                        {/* Floating Explore button */}
                        <motion.div 
                           initial={{ scale: 0.8, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           className="absolute bottom-6 right-2 lg:bottom-8 lg:right-6"
                        >
                          <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: "#000" }}
                            className="flex items-center gap-3 lg:gap-5 bg-[#0a0f1c] text-white px-4 lg:px-7 py-2.5 lg:py-3.5 rounded-xl lg:rounded-2xl font-black text-[8px] lg:text-[9px] tracking-widest shadow-xl transition-all uppercase group"
                          >
                            <span>Explore</span>
                            <div className="w-5 h-5 lg:w-7 lg:h-7 bg-white text-black rounded-lg flex items-center justify-center transition-transform group-hover:rotate-45">
                              <ArrowUpRight size={12} />
                            </div>
                          </motion.button>
                        </motion.div>

                        {/* Bottom Typography */}
                        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-12 bg-gradient-to-t from-white/90 via-transparent to-transparent pointer-events-none">
                          <div className="space-y-2 lg:space-y-4">
                            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-2 lg:gap-3">
                              <span className="h-px w-6 lg:w-12 bg-black/20" />
                              <span className="text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase text-black/40">
                                {item.subtitle}
                              </span>
                            </motion.div>
                            <motion.h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-serif italic text-slate-900 tracking-tighter leading-none">
                              {item.title}
                            </motion.h1>
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

      {/* 3. DESKTOP NAVIGATION BAR */}
      <div className="hidden lg:flex absolute bottom-10 w-full max-w-[1400px] justify-between items-center px-12 z-40">
        <div className="flex items-center gap-10">
          <div className="flex gap-3">
            {collections.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)} className="group relative">
                <div className={`h-1.5 transition-all duration-700 rounded-full ${activeIndex === i ? 'w-24 bg-black' : 'w-4 bg-black/10'}`} />
              </button>
            ))}
          </div>
          <span className="text-[10px] text-black/30 font-black tracking-[0.4em] uppercase italic">A Style for Every Story</span>
        </div>
        <button onClick={() => setActiveIndex(prev => (prev + 1) % collections.length)} className="w-16 h-16 rounded-full border border-black/10 bg-white shadow-xl flex items-center justify-center text-black hover:bg-black hover:text-white transition-all group">
          <MoveRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Hero;