import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Close mobile menu when route changes
    useEffect(() => {
        setVisible(false);
    }, [location]);

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [visible]);

    const navItems = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'];

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
            scrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' 
                : 'bg-white border-b border-gray-100'
        }`}>
            
            {/* Main Navigation Container - Logo pushed to far left */}
            <div className='max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8 font-medium'>
                
                {/* --- Left Side: Logo & Mobile Menu Button - SHIFTED FAR LEFT --- */}
                <div className='flex items-center gap-2 -ml-3 sm:-ml-4 lg:-ml-6'>
                    {/* Mobile Menu Toggle Button */}
                    <button 
                        onClick={() => setVisible(!visible)}
                        className='sm:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200'
                        aria-label="Toggle menu"
                    >
                        {visible ? (
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    {/* Logo - Pushed to far far left */}
                    <Link 
                        to='/' 
                        className='flex items-center gap-2 group flex-shrink-0 sm:-ml-6 lg:-ml-8'
                        onClick={() => setVisible(false)}
                    >
                        <img 
                            src={assets.logo} 
                            className='w-12 sm:w-14 object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105' 
                            alt="Dmax Lanka" 
                        />
                        
                        {/* Brand Name - Always visible on mobile */}
                        <div className='flex flex-col leading-tight'>
                            <span className='text-lg sm:text-xl font-extrabold tracking-wide sm:tracking-[0.15em] text-slate-900 uppercase'>
                                Dmax Lanka
                            </span>
                            <span className='text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] text-slate-500 uppercase mt-0.5 group-hover:text-slate-800 transition-colors hidden sm:block'>
                                Private Limited
                            </span>
                        </div>
                    </Link>
                </div>

                {/* --- Center: Desktop Navigation - ADJUSTED FOR FAR LEFT SHIFT --- */}
                <ul className='hidden sm:flex gap-8 lg:gap-10 text-xs font-bold tracking-widest text-slate-600 uppercase ml-8 lg:ml-16'>
                    {navItems.map((item) => (
                        <NavLink 
                            key={item}
                            to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                            className={({ isActive }) => 
                                `relative py-2 px-1 group transition-colors duration-300 ${isActive ? 'text-black' : 'hover:text-black'}`
                            }
                        >
                            <span className='relative z-10'>{item}</span>
                            <span className={`absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300 ease-out ${
                                location.pathname === (item === 'HOME' ? '/' : `/${item.toLowerCase()}`)
                                    ? 'w-full opacity-100'
                                    : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                            }`}></span>
                        </NavLink>
                    ))}
                </ul>

                {/* --- Right Side: Icons - ADJUSTED FOR BALANCE --- */}
                <div className='flex items-center gap-2 sm:gap-3'>
                    {/* Search Icon */}
                    <div className='p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors duration-200 cursor-pointer group'>
                        <img src={assets.search_icon} className='w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:opacity-100 transition-opacity' alt="Search" />
                    </div>

                    {/* Profile Icon with Dropdown */}
                    <div className='group relative'>
                        <div className='p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors duration-200 cursor-pointer'>
                            <img src={assets.profile_icon} className='w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:opacity-100 transition-opacity' alt="Profile" />
                        </div>
                        <div className='group-hover:block hidden absolute right-0 pt-2 w-48 animate-fadeIn z-50'>
                            <div className='bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden py-1'>
                                <div className='px-4 py-3 text-xs text-slate-500 border-b border-slate-100'>
                                    Signed in as <br/>
                                    <span className='font-bold text-slate-800'>Guest User</span>
                                </div>
                                <Link 
                                    to='/profile' 
                                    className='block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-black transition-colors'
                                    onClick={() => setVisible(false)}
                                >
                                    My Profile
                                </Link>
                                <Link 
                                    to='/orders' 
                                    className='block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-black transition-colors'
                                    onClick={() => setVisible(false)}
                                >
                                    Orders
                                </Link>
                                <div className='border-t border-slate-100 mt-1'></div>
                                <button className='block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors'>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cart Icon */}
                    <Link 
                        to='/cart' 
                        className='group relative p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors duration-200'
                        onClick={() => setVisible(false)}
                    >
                        <img src={assets.cart_icon} className='w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:opacity-100 transition-opacity' alt="Cart" />
                        <span className='absolute top-0.5 right-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 bg-red-600 text-white text-[8px] sm:text-[9px] font-bold flex items-center justify-center rounded-full ring-1 sm:ring-2 ring-white'>
                            10
                        </span>
                    </Link>
                </div>

                {/* --- Mobile Fullscreen Menu --- */}
                <div className={`sm:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-out ${
                    visible ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    
                    {/* Mobile Menu Header */}
                    <div className='flex items-center justify-between p-6 border-b border-gray-100 bg-white'>
                        <div className='flex items-center gap-3'>
                            <img 
                                src={assets.logo} 
                                className='w-10 object-contain mix-blend-multiply' 
                                alt="Dmax Lanka" 
                            />
                            <div className='flex flex-col leading-tight'>
                                <span className='text-lg font-extrabold tracking-wide text-slate-900 uppercase'>
                                    Dmax Lanka
                                </span>
                                <span className='text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mt-0.5'>
                                    Private Limited
                                </span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setVisible(false)}
                            className='p-2 -mr-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200'
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className='h-[calc(100vh-80px)] overflow-y-auto px-4 py-6'>
                        {/* Navigation Links */}
                        <div className='flex flex-col gap-1 mb-8'>
                            {navItems.map((item) => (
                                <NavLink 
                                    key={item}
                                    to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                                    className={({ isActive }) => 
                                        `py-4 px-6 rounded-xl text-base font-bold tracking-wide transition-all flex items-center gap-3 ${
                                            isActive 
                                                ? 'bg-black text-white shadow-md' 
                                                : 'text-slate-700 hover:bg-gray-50 active:bg-gray-100'
                                        }`
                                    }
                                    onClick={() => setVisible(false)}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                        location.pathname === (item === 'HOME' ? '/' : `/${item.toLowerCase()}`)
                                            ? 'bg-white'
                                            : 'bg-gray-300'
                                    }`}></div>
                                    {item}
                                </NavLink>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className='border-t border-gray-100 pt-6 mb-8'>
                            <h3 className='text-xs font-bold tracking-widest text-slate-500 uppercase mb-4 px-4'>
                                Quick Actions
                            </h3>
                            <div className='flex flex-col gap-2'>
                                <Link 
                                    to='/profile' 
                                    className='flex items-center gap-3 py-3 px-6 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors'
                                    onClick={() => setVisible(false)}
                                >
                                    <img src={assets.profile_icon} className='w-5 h-5 opacity-70' alt="Profile" />
                                    <span className='font-medium text-slate-700'>My Profile</span>
                                </Link>
                                <Link 
                                    to='/orders' 
                                    className='flex items-center gap-3 py-3 px-6 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors'
                                    onClick={() => setVisible(false)}
                                >
                                    <img src={assets.profile_icon} className='w-5 h-5 opacity-70 rotate-90' alt="Orders" />
                                    <span className='font-medium text-slate-700'>My Orders</span>
                                </Link>
                                <Link 
                                    to='/cart' 
                                    className='flex items-center gap-3 py-3 px-6 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors'
                                    onClick={() => setVisible(false)}
                                >
                                    <img src={assets.cart_icon} className='w-5 h-5 opacity-70' alt="Cart" />
                                    <span className='font-medium text-slate-700'>Shopping Cart</span>
                                    <span className='ml-auto bg-red-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full'>
                                        10
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Brand Footer */}
                        <div className='border-t border-gray-100 pt-6 px-4'>
                            <div className='text-center'>
                                <p className='text-lg font-extrabold tracking-wide text-slate-900 uppercase mb-1'>
                                    Dmax Lanka
                                </p>
                                <p className='text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase mb-3'>
                                    Private Limited
                                </p>
                                <p className='text-sm text-slate-600 italic'>
                                    Premium Bags & Accessories
                                </p>
                                <p className='text-xs text-slate-400 mt-2'>
                                    Crafting quality since 2010
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {visible && (
                    <div 
                        className='sm:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30'
                        onClick={() => setVisible(false)}
                    />
                )}
            </div>
        </nav>
    )
}

export default Navbar