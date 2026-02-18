import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [animate, setAnimate] = useState(false);
  
  // Modal States
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSeeAllReviewsOpen, setIsSeeAllReviewsOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);

  const fetchProductData = async () => {
    // Isolates data and reviews strictly to this masterpiece ID
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      if (item.colors && item.colors.length > 0) {
        setSelectedColor(item.colors[0]);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
    setTimeout(() => setAnimate(true), 100);
  }, [productId, products]);

  // POSH FRACTIONAL STAR RATING WITH DARK SLATE EMPTY STARS
  const renderStars = (rating) => {
    const average = rating || 0;
    return (
      <div className="flex gap-1.5 items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercentage = Math.min(Math.max(average - (star - 1), 0), 1) * 100;
          return (
            <div key={star} className="relative w-3.5 h-3.5 md:w-4 md:h-4">
              <svg viewBox="0 0 20 20" className="absolute w-full h-full fill-neutral-400">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg 
                viewBox="0 0 20 20" 
                className="absolute w-full h-full fill-[#B8987E]"
                style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </div>
          );
        })}
      </div>
    );
  };

  const averageRating = productData?.reviews?.length > 0
    ? productData.reviews.reduce((acc, item) => acc + item.rating, 0) / productData.reviews.length
    : 0;

  if (!productData) return <div className="min-h-screen bg-white"></div>;

  return (
    <div className={`bg-white min-h-screen transition-all duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* --- TOP-FLUSH BRAND HEADER --- */}
      <div className="pt-0 pb-0 px-6 text-center leading-[0] bg-white relative z-10">
         <div className="flex flex-col items-center max-w-[800px] mx-auto">
            <p className="animate-fadeInUp text-[10px] md:text-[14px] font-bold uppercase tracking-[1.1em] text-[#B8987E] leading-none py-4">
                A STYLE FOR EVERY STORY
            </p>
         </div>
      </div>

      {/* --- ATELIER GRID GALLERY (FLUSH TO TOP) --- */}
      <div className='max-w-[1920px] mx-auto flex flex-col lg:flex-row mt-0 border-t border-neutral-50 relative z-0'>
        <div className='lg:w-[62%] w-full grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-neutral-100'>
          {productData.image.map((img, index) => (
            <div key={index} className='overflow-hidden bg-[#F9F9F9] aspect-[3/4] relative'>
              <img src={img} className='w-full h-full object-cover transition-transform duration-[4s] cubic-bezier(0.15, 1, 0.3, 1) hover:scale-105' alt="" />
            </div>
          ))}
        </div>

        {/* --- COMMAND CENTER --- */}
        <div className='lg:w-[38%] w-full px-8 md:px-20 py-8 md:py-16 sticky lg:top-0 h-fit bg-white'>
          <div className="mb-8 text-center lg:text-left">
            <p className='text-[10px] font-bold uppercase tracking-[0.5em] text-[#B8987E] mb-2'>
              No. {productData._id.slice(-6)} • {productData.subCategory}
            </p>
            {/* UPDATED: Product Name always in Capital Letters */}
            <h1 className='text-3xl md:text-5xl font-serif text-[#1A1A1A] uppercase leading-tight mb-4 tracking-tight'>
              {productData.name}
            </h1>
            <div className='flex flex-col lg:flex-row items-center gap-4'>
              {renderStars(averageRating)}
              <div className="flex items-center gap-4">
                <p className='text-[9px] font-bold text-neutral-400 uppercase tracking-widest pt-1'>
                  ({productData.reviews?.length || 0} Authenticated Stories)
                </p>
                {/* SEE ALL TRIGGER: Right-side alignment */}
                <button 
                  onClick={() => setIsSeeAllReviewsOpen(true)}
                  className="text-[9px] font-black uppercase tracking-[0.3em] text-[#B8987E] border-b border-[#B8987E]/30 hover:border-[#B8987E] transition-all pt-1"
                >
                  View All Reviews
                </button>
              </div>
            </div>
          </div>

          <div className='mb-10 text-center lg:text-left text-[#1A1A1A]'>
            <div className="flex items-baseline justify-center lg:justify-start gap-2">
              <span className='text-xs font-serif text-neutral-400 italic'>LKR</span>
              <p className='text-4xl font-light tracking-tighter'>
                {productData.price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* COLOR SELECTION & AVAILABILITY LOGIC */}
          <div className='mb-12'>
            <div className="flex justify-between items-end mb-5">
              <span className='text-[9px] font-black uppercase tracking-[0.4em] text-neutral-800 underline underline-offset-8 decoration-[#B8987E]'>Finish: {selectedColor?.name}</span>
              {selectedColor?.stock > 0 ? (
                <div className="flex items-center gap-1.5 animate-pulse">
                  <div className="w-1 h-1 rounded-full bg-green-500"></div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-green-600">IN STOCK</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-red-500 shadow-[0_0_8px_red]"></div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-600">STOCK OVER</span>
                </div>
              )}
            </div>
            <div className='flex flex-wrap gap-4 justify-center lg:justify-start'>
              {productData.colors?.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-11 h-11 border transition-all duration-700 flex items-center justify-center relative ${selectedColor?.name === color.name ? 'border-[#B8987E] scale-110 shadow-xl' : 'border-neutral-100 opacity-60'}`}
                >
                  <div style={{ backgroundColor: color.hex }} className='w-full h-full'></div>
                  {color.stock === 0 && <div className="absolute inset-0 bg-white/70 flex items-center justify-center overflow-hidden"><div className="w-[150%] h-[0.5px] bg-red-500 rotate-45"></div></div>}
                </button>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-4 mb-20'>
            <button 
              onClick={() => selectedColor?.stock > 0 && addToCart(productData._id)}
              disabled={selectedColor?.stock === 0}
              className={`relative overflow-hidden py-5 text-[11px] font-bold uppercase tracking-[0.5em] transition-all duration-1000 ${selectedColor?.stock > 0 ? 'bg-[#1A1A1A] text-white hover:bg-[#B8987E]' : 'bg-neutral-50 text-neutral-300 cursor-not-allowed'}`}
            >
              <span className="relative z-10">{selectedColor?.stock > 0 ? 'Add To Cart' : 'Sold Out'}</span>
            </button>
            <button className='border border-neutral-100 py-5 text-[11px] font-bold uppercase tracking-[0.5em] text-neutral-400 hover:text-black transition-colors'>
               Direct Inquiry
            </button>
          </div>

          {/* ATELIER PROVENANCE (FIXED: One-Under-One layout) */}
          <div className='border-t border-neutral-100 pt-12'>
            <h4 className='text-[10px] font-bold uppercase tracking-[0.8em] text-[#B8987E] mb-8'>Provenance</h4>
            <div className='space-y-6'>
              {[ 
                ['Material', productData.material || 'N/A'], 
                ['Length', productData.length || 'N/A'], 
                ['Height', productData.height || 'N/A'], 
                ['Width', productData.width || 'N/A'], 
                ['Compartments', productData.compartmentDesc || 'Standard Design'] 
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 border-b border-neutral-50 pb-3">
                  <span className='text-[9px] text-neutral-500 uppercase tracking-widest'>{label}</span>
                  <span className='text-[10px] font-medium text-[#1A1A1A] tracking-[0.2em] uppercase leading-relaxed'>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- EDITORIAL CHRONICLES SECTION --- */}
      <div className='bg-[#FCFCFC] py-40 px-6 overflow-hidden relative'>
         <div className="absolute top-0 left-[15%] w-[1px] h-full bg-neutral-100 hidden lg:block"></div>
         <div className='max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-20'>
            <div className="lg:w-1/3 flex flex-col items-start relative z-10">
               <h2 className='font-serif italic text-6xl text-[#1A1A1A] lowercase leading-none mb-12'>
                  client chronicles
               </h2>
               <button 
                  onClick={() => setIsReviewModalOpen(true)}
                  className="group relative pt-4 flex flex-col items-start gap-4 focus:outline-none"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-[1px] bg-[#B8987E] group-hover:w-20 transition-all duration-700"></div>
                     <span className="text-[11px] font-black uppercase tracking-[0.6em] text-[#1A1A1A]">Share Your Review</span>
                  </div>
               </button>
            </div>

            <div className="lg:w-2/3">
               {productData.reviews?.length > 0 ? (
                  <div className='columns-1 md:columns-2 gap-12 space-y-12'>
                  {productData.reviews.slice(0, 1).map((rev, i) => (
                    <div key={i} className="break-inside-avoid bg-white p-12 shadow-sm border border-neutral-50 hover:border-[#B8987E] transition-all duration-1000 group">
                        <div className="flex justify-between items-start mb-8">
                           <div className="flex gap-1">{renderStars(rev.rating)}</div>
                        </div>
                        <p className="font-serif italic text-neutral-800 text-xl mb-12 opacity-90">
                           "{rev.comment}"
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A] font-bold">{rev.userName}</p>
                    </div>
                  ))}
                  </div>
               ) : (
                  <div className="h-full flex flex-col justify-center items-center py-20 lg:py-0 text-center relative opacity-30">
                     {renderStars(0)}
                     <p className="text-[12px] font-bold uppercase tracking-[0.8em] text-[#1A1A1A] mt-6">Archive currently silent</p>
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* --- VIEW ALL REVIEWS POPUP (BLURRED GUESTBOOK STYLE) --- */}
      {isSeeAllReviewsOpen && (
         <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 md:p-0">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fadeIn" onClick={() => setIsSeeAllReviewsOpen(false)}></div>
            <div className="relative bg-white w-full max-w-lg p-10 md:p-16 shadow-2xl border border-neutral-100 animate-zoomIn h-[80vh] flex flex-col">
               <button onClick={() => setIsSeeAllReviewsOpen(false)} className="absolute top-6 right-8 text-neutral-300 hover:text-black transition-colors text-2xl focus:outline-none">×</button>
               <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-center text-[#B8987E]">The Chronicle Vault</p>
               
               <div className="flex-grow overflow-y-auto pr-2 scrollbar-hide">
                  <div className="flex flex-col gap-10">
                     {productData.reviews?.length > 0 ? (
                        productData.reviews.map((rev, i) => (
                           <div key={i} className="border-b border-neutral-50 pb-8 flex flex-col items-center text-center">
                              <div className="mb-4">{renderStars(rev.rating)}</div>
                              <p className="font-serif italic text-lg text-[#1A1A1A] leading-relaxed mb-6">"{rev.comment}"</p>
                              <div className="flex flex-col items-center gap-2">
                                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">{rev.userName}</span>
                                 <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{rev.date || "Verified 2026"}</span>
                              </div>
                           </div>
                        ))
                     ) : ( <p className="text-center opacity-30 uppercase tracking-[0.5em] text-xs pt-40">Vault empty</p> )}
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* --- ADD REVIEW POPUP --- */}
      {isReviewModalOpen && (
         <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-0">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fadeIn" onClick={() => setIsReviewModalOpen(false)}></div>
            <div className="relative bg-white w-full max-w-lg p-10 md:p-16 shadow-2xl border border-neutral-100 animate-zoomIn">
               <button onClick={() => setIsReviewModalOpen(false)} className="absolute top-6 right-8 text-neutral-300 hover:text-black transition-colors text-2xl focus:outline-none">×</button>
               <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-center text-[#B8987E]">Boutique Guestbook</p>
               <div className="flex flex-col gap-10">
                  <div className="flex flex-col items-center gap-4">
                     <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Collector Impressions</span>
                     <div className="flex gap-4">
                        {[1,2,3,4,5].map(s => (
                           <button key={s} onClick={() => setReviewRating(s)} className={`text-2xl transition-all duration-700 ${s <= reviewRating ? 'text-[#B8987E] scale-125' : 'text-neutral-100'}`}>★</button>
                        ))}
                     </div>
                  </div>
                  <input type="text" placeholder="NAME OF COLLECTOR" className="border-b border-neutral-100 py-3 text-[11px] tracking-[0.3em] uppercase outline-none focus:border-[#B8987E] transition-all bg-transparent" />
                  <textarea placeholder="SCRIBE YOUR ACQUISITION STORY..." rows="4" className="border-b border-neutral-100 py-3 text-sm font-serif italic outline-none focus:border-[#B8987E] transition-all bg-transparent resize-none leading-loose"></textarea>
                  <button className="bg-black text-white py-5 text-[10px] font-bold uppercase tracking-[0.6em] hover:bg-[#B8987E] transition-all shadow-2xl active:scale-95 group">
                     <span className="group-hover:tracking-[1em] transition-all duration-1000 uppercase">Submit to Archive</span>
                  </button>
               </div>
            </div>
         </div>
      )}

      <div className='bg-[#1A1A1A] py-24 flex flex-col items-center text-white'>
          <p className='text-[10px] font-bold tracking-[1.2em] uppercase mb-4 opacity-40 text-center px-4'>DMAX SRI LANKA</p>
          <div className="w-16 h-[0.5px] bg-[#B8987E] opacity-20"></div>
      </div>
    </div>
  );
};

export default Product;