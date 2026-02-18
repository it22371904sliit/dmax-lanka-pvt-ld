import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets'; 

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  
  // State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [animate, setAnimate] = useState(false); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    "School Gear", "Pro Laptop", "Nursery", 
    "Ladies Edit", "Travel Series", "Luggage", 
    "Office Luxe", "Tuition/Class"
  ];

  // --- Core Filtering Logic ---
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    setFilterProducts(productsCopy);
    setAnimate(false);
    setTimeout(() => setAnimate(true), 100);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high': setFilterProducts(fpCopy.sort((a, b) => a.price - b.price)); break;
      case 'high-low': setFilterProducts(fpCopy.sort((a, b) => b.price - a.price)); break;
      default: applyFilter(); break;
    }
  };

  useEffect(() => { applyFilter(); }, [category, search, showSearch, products]);
  useEffect(() => { sortProduct(); }, [sortType]);

  // --- LUXURY PRODUCT CARD (Mobile Optimized) ---
  const CollectionProductCard = ({ product, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Link 
        to={`/product/${product._id}`}
        className={`group flex flex-col gap-3 md:gap-6 cursor-pointer transition-all duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)] transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 md:translate-y-16 opacity-0'}`}
        style={{ transitionDelay: `${index * 50}ms` }} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div className="relative bg-[#F9F9F9] overflow-hidden aspect-[3/4] w-full shadow-sm hover:shadow-xl transition-all duration-700">
          <img 
            src={product.image[0]} 
            alt={product.name} 
            className={`w-full h-full object-cover transition-transform duration-[2.5s] ease-out ${isHovered ? 'scale-110' : 'scale-100'}`} 
          />
          {product.bestseller && (
             <div className="absolute top-0 right-0 bg-[#B8987E] text-white px-2 md:px-4 py-1 md:py-1.5 z-10">
                <p className="text-[6px] md:text-[8px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">Signature</p>
             </div>
          )}
          <div className={`absolute bottom-0 left-0 w-full h-10 md:h-14 bg-white/95 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
             <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-neutral-800">Explore</span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-1 md:space-y-2 text-center px-2 md:px-4">
            <h3 className="text-[#111] font-semibold text-[10px] md:text-[13px] uppercase tracking-[0.15em] md:tracking-[0.25em] transition-colors group-hover:text-[#B8987E] line-clamp-2">
                {product.name}
            </h3>
            <p className="text-[8px] md:text-[10px] text-neutral-400 font-serif italic tracking-widest uppercase opacity-60 line-clamp-1">
                {product.subCategory || "Masterpiece"}
            </p>
            <div className="flex items-center gap-1 md:gap-2 text-[#B8987E] font-medium tracking-[0.1em] md:tracking-[0.15em] pt-0.5 md:pt-1">
                <span className="text-[8px] md:text-[10px] opacity-70">LKR</span>
                <span className="text-xs md:text-base">{product.price.toLocaleString()}</span>
            </div>
        </div>
      </Link>
    );
  };

  return (
    <div className='w-full min-h-screen bg-white selection:bg-[#B8987E] selection:text-white overflow-x-hidden'>
      
      {/* --- MOBILE-OPTIMIZED BRAND LOCKUP --- */}
      <div className="pt-0 pb-0 px-4 md:px-6 text-center leading-[0]">
         <div className="flex flex-col items-center max-w-[800px] mx-auto">
            
            {/* 1. Logo: Responsive sizing */}
            <div className="w-32 sm:w-36 md:w-64 bg-transparent mix-blend-multiply transition-all duration-1000 animate-fadeInScale opacity-0 p-0 m-0 leading-[0] -mt-6 sm:-mt-8 md:-mt-6" style={{animationFillMode: 'forwards', animationDelay: '300ms'}}>
                <img 
                  src={assets.logo} 
                  alt="Dmax" 
                  className="w-full h-auto object-contain bg-transparent mx-auto block p-0 m-0" 
                />
            </div>

            {/* 2. Slogan: Responsive text and spacing */}
            <p className="animate-fadeInUp text-[8px] sm:text-[10px] md:text-[14px] font-bold uppercase tracking-[0.5em] sm:tracking-[0.7em] md:tracking-[0.9em] text-[#B8987E] opacity-0 leading-none mt-[-16px] sm:mt-[-24px] md:mt-[-42px] z-10 px-2" style={{animationFillMode: 'forwards', animationDelay: '600ms'}}>
                A STYLE FOR EVERY STORY
            </p>
         </div>
      </div>

      {/* --- MOBILE-OPTIMIZED NAVIGATION --- */}
      <div className="sticky top-[60px] md:top-[70px] z-30 bg-white/95 backdrop-blur-md border-y border-neutral-100 mt-0">
        <div className="flex justify-between items-center h-12 md:h-14 px-4 md:px-20 max-w-[1800px] mx-auto">
            
            {/* Split Refine Toggle - Mobile Friendly */}
            <button 
                onClick={() => {
                  setIsFilterOpen(!isFilterOpen);
                  setMobileMenuOpen(!mobileMenuOpen);
                }} 
                className="group flex items-center gap-2 md:gap-3 focus:outline-none"
            >
                <div className="flex flex-col gap-[2px] md:gap-[3px] w-3 md:w-4">
                    <span className={`h-[1px] md:h-[0.5px] bg-black transition-all ${isFilterOpen ? 'rotate-45 translate-y-[2.5px] md:translate-y-[3.5px]' : ''}`}></span>
                    <span className={`h-[1px] md:h-[0.5px] bg-black transition-all ${isFilterOpen ? 'opacity-0' : 'w-2/3'}`}></span>
                    <span className={`h-[1px] md:h-[0.5px] bg-black transition-all ${isFilterOpen ? '-rotate-45 -translate-y-[2.5px] md:-translate-y-[3.5px]' : ''}`}></span>
                </div>
                <span className="text-[10px] md:text-[14px] font-serif italic tracking-[0.05em] md:tracking-[0.1em] lowercase group-hover:text-[#B8987E] transition-colors">
                    {isFilterOpen ? 'close' : 'refine'}
                </span>
            </button>

            {/* Mobile Sort Dropdown */}
            <div className="md:hidden relative">
              <select 
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="text-[9px] uppercase tracking-[0.2em] bg-transparent border-none appearance-none pr-4 focus:outline-none"
              >
                <option value="relevant">curated</option>
                <option value="low-high">lowest</option>
                <option value="high-low">highest</option>
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px]">▼</span>
            </div>

            {/* Desktop Sort Row */}
            <div className="hidden md:flex items-center gap-6 text-neutral-300">
                {['relevant', 'low-high', 'high-low'].map((type) => (
                    <button 
                        key={type}
                        onClick={() => setSortType(type)}
                        className={`text-[9px] md:text-[11px] uppercase tracking-[0.3em] transition-all duration-500 ${sortType === type ? 'text-black font-bold border-b border-black pb-0.5' : 'hover:text-black'}`}
                    >
                        {type === 'relevant' ? 'curated' : type === 'low-high' ? 'lowest' : 'highest'}
                    </button>
                ))}
            </div>
        </div>

        {/* --- MOBILE-OPTIMIZED FILTER PANEL --- */}
        <div className={`overflow-hidden transition-all duration-[800ms] md:duration-[1200ms] cubic-bezier(0.19, 1, 0.22, 1) bg-[#FAF9F6] ${isFilterOpen ? 'max-h-[600px] md:max-h-[350px] border-b border-neutral-200' : 'max-h-0'}`}>
            <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-4 md:py-8 flex flex-col items-center">
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-x-12 md:gap-y-4">
                    {categories.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => toggleCategory({target: {value: cat}})}
                            className="group flex items-center justify-between py-1.5 md:py-2 border-b border-neutral-100 transition-all duration-500 hover:border-[#B8987E]"
                        >
                            <span className={`text-[9px] md:text-[12px] uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all duration-500 ${category.includes(cat) ? 'text-black font-bold' : 'text-neutral-400 group-hover:text-black'}`}>
                                {cat}
                            </span>
                            <div className={`w-1 h-1 rounded-full transition-all duration-500 ${category.includes(cat) ? 'bg-[#B8987E] scale-150' : 'bg-transparent'}`}></div>
                        </button>
                    ))}
                </div>
                
                <button 
                    onClick={() => {setCategory([]); setIsFilterOpen(false); setMobileMenuOpen(false);}}
                    className="mt-4 md:mt-8 text-[7px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-neutral-400 hover:text-black border-b border-transparent hover:border-black pb-1 transition-all"
                >
                    Clear All
                </button>
            </div>
        </div>
      </div>

      {/* --- MOBILE-OPTIMIZED GALLERY --- */}
      <div className="w-full px-3 md:px-6 py-8 md:py-16 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-x-10 md:gap-y-16 lg:gap-y-28">
          {filterProducts.map((item, index) => (
            <CollectionProductCard key={index} product={item} index={index} />
          ))}
        </div>

        {filterProducts.length === 0 && (
          <div className="py-32 md:py-56 text-center px-4">
             <h3 className="font-serif italic text-xl md:text-3xl text-neutral-300 lowercase tracking-widest">No pieces found</h3>
             <button onClick={() => setCategory([])} className="mt-4 md:mt-8 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#B8987E] border-b border-[#B8987E] pb-1 md:pb-2">
                refresh archive
             </button>
          </div>
        )}
      </div>

      {/* --- MOBILE-OPTIMIZED FOOTER --- */}
      <div className="py-12 md:py-24 flex flex-col items-center border-t border-neutral-50 bg-[#FBFBFB] px-4">
          <div className="h-6 md:h-10 w-[1px] bg-[#C5A386] mb-4 md:mb-8"></div>
          <p className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.8em] uppercase text-neutral-400 mb-1 md:mb-2 text-center">Dmax Sri Lanka</p>
          <p className="font-serif italic text-neutral-500 text-[10px] md:text-xs text-center max-w-[250px] md:max-w-none">Curating heritage through unparalleled craftsmanship.</p>
      </div>

      {/* --- RESPONSIVE CSS ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.99); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInUp { animation: fadeInUp 1.2s ease-out; }
        .animate-fadeInScale { animation: fadeInScale 1.5s ease-out; }
        
        /* Mobile touch optimizations */
        @media (max-width: 768px) {
          button, a {
            -webkit-tap-highlight-color: transparent;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}} />
    </div>
  );
};

export default Collection;