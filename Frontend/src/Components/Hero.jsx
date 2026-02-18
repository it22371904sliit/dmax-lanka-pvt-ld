import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MoveRight, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
      className="relative w-full min-h-screen lg:h-[85vh] bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-start pt-12 lg:pt-10 overflow-hidden font-sans z-10"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* 1. BRAND IDENTITY BADGE */}
      <div className="absolute top-6 right-2 lg:top-8 lg:right-6 z-50">
        <div className="bg-white/95 backdrop-blur-xl px-4 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-[1.5rem] border border-blue-600/30 flex items-center gap-3 lg:gap-5 shadow-lg">
          <img src={assets.logo} alt="Dmax" className="h-5 lg:h-7 w-auto object-contain" />
          <div className="w-[1.5px] h-4 lg:h-5 bg-gray-300" />
          <span className="text-[7px] lg:text-[9px] font-black tracking-[0.1em] lg:tracking-[0.15em] text-gray-800 uppercase italic">A Style for Every Story</span>
        </div>
      </div>

      {/* 2. BACKGROUND ARCHITECTURE */}
      <div className="absolute inset-0 flex items-start justify-center pt-20 lg:pt-16 pointer-events-none select-none z-0">
        <AnimatePresence mode="wait">
          <motion.h2
            key={`bg-text-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: [0.02, 0.04, 0.02], scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -50 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="text-[15vw] sm:text-[18vw] lg:text-[25vw] font-extrabold uppercase tracking-tight text-black/5 leading-none px-4 text-center"
          >
            {activeItem.title}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* 3. PRODUCT GALLERY: Shifted up to relieve top spacing */}
      <div className="relative w-full h-[65vh] lg:h-[75%] flex items-center justify-center px-4 sm:px-6 lg:px-12 z-20 mt-2 lg:mt-0">
        <div className="relative w-full max-w-[1400px] h-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
          <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 lg:overflow-visible snap-x snap-mandatory">
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
                      ? 'lg:flex-[4] w-full lg:w-auto rounded-3xl lg:rounded-[4rem] h-full shadow-2xl transition-shadow' 
                      : 'lg:flex-[0.8] w-3/4 lg:w-auto rounded-2xl lg:rounded-[2rem] h-[50%] lg:h-[80%] opacity-30 grayscale hover:opacity-50'}
                  `}
                >
                  <div className="absolute inset-0 bg-white">
                    <motion.img 
                      src={item.img} 
                      animate={{ scale: isActive ? 1.05 : 1.3, filter: isActive ? 'blur(0px)' : 'blur(4px)' }}
                      transition={{ duration: 1.2 }}
                      className={`w-full h-full ${isActive ? 'object-contain p-8 lg:p-12' : 'object-cover'}`} 
                      alt={item.title} 
                    />
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-30">
                        {/* UPDATED: EXPLORE BUTTON - Moved further down and right */}
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }} 
                          animate={{ scale: 1, opacity: 1 }} 
                          className="absolute bottom-12 right-2 lg:bottom-16 lg:right-6"
                        >
                          <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            className="flex items-center gap-3 lg:gap-5 bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white px-5 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-[9px] lg:text-[11px] tracking-widest transition-all uppercase group shadow-2xl"
                          >
                            <span>Explore</span>
                            <div className="w-5 h-5 lg:w-7 lg:h-7 bg-white text-black rounded-lg flex items-center justify-center transition-transform group-hover:rotate-45">
                               <ArrowUpRight size={12} />
                            </div>
                          </motion.button>
                        </motion.div>

                        {/* Title Typography */}
                        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-12 bg-gradient-to-t from-white/95 via-transparent to-transparent pointer-events-none">
                          <div className="space-y-2 lg:space-y-4">
                            <div className="flex items-center gap-2 lg:gap-3">
                              <span className="h-px w-6 lg:w-12 bg-black/20" />
                              <span className="text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase text-black/40">{item.subtitle}</span>
                            </div>
                            <h1 className="text-4xl lg:text-7xl xl:text-8xl font-serif italic text-slate-900 tracking-tighter leading-none">
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

      {/* 4. NAVIGATION PROGRESS */}
      <div className="hidden lg:flex absolute bottom-10 w-full max-w-[1400px] justify-between items-center px-12 z-40">
        <div className="flex gap-4">
          {collections.map((_, i) => (
            <div key={i} className={`h-1.5 transition-all duration-700 rounded-full ${activeIndex === i ? 'w-24 bg-black' : 'w-4 bg-black/10'}`} />
          ))}
        </div>
        <button 
          onClick={() => setActiveIndex(prev => (prev + 1) % collections.length)} 
          className="w-16 h-16 rounded-full border border-gray-200 bg-white shadow-lg flex items-center justify-center text-black hover:bg-black hover:text-white transition-all group"
        >
          <MoveRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Hero;