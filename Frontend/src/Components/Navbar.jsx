import React, { useState, useEffect, useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    
    const { getCartCount, navigate } = useContext(ShopContext);

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
    }, [visible]);

    const navItems = [
        { name: 'HOME', path: '/' },
        { name: 'COLLECTION', path: '/collection' },
        { name: 'ABOUT', path: '/about' },
        { name: 'CONTACT', path: '/contact' }
    ];

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
            scrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' 
                : 'bg-white border-b border-gray-100'
        }`}>
            
            <div className='max-w-[1440px] mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8 font-medium'>
                
                {/* --- 1. LEFT: LOGO --- */}
                <Link to='/' className='flex items-center gap-2 group flex-shrink-0'>
                    <img 
                        src={assets.logo} 
                        className='w-10 sm:w-12 object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105' 
                        alt="Dmax Lanka" 
                    />
                    <div className='flex flex-col leading-tight'>
                        <span className='text-lg sm:text-xl font-extrabold tracking-wide text-slate-900 uppercase'>
                            Dmax Lanka
                        </span>
                        <span className='text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mt-0.5 hidden sm:block'>
                            Private Limited
                        </span>
                    </div>
                </Link>

                {/* --- 2. CENTER: DESKTOP NAVIGATION --- */}
                <ul className='hidden sm:flex items-center gap-8 lg:gap-12 text-xs font-bold tracking-widest text-slate-600 uppercase absolute left-1/2 transform -translate-x-1/2'>
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => 
                                `relative py-2 px-1 group transition-colors duration-300 ${isActive ? 'text-black' : 'hover:text-black'}`
                            }
                        >
                            <span className='relative z-10'>{item.name}</span>
                            <span className={`absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300 ease-out ${
                                location.pathname === item.path
                                    ? 'w-full opacity-100'
                                    : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                            }`}></span>
                        </NavLink>
                    ))}
                </ul>

                {/* --- 3. RIGHT: ICONS --- */}
                <div className='flex items-center gap-3 sm:gap-5'>
                    
                    {/* Search Icon */}
                    <div onClick={() => navigate('/collection')} className='p-2 rounded-full hover:bg-slate-100 cursor-pointer group transition-colors'>
                        <img src={assets.search_icon} className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity' alt="Search" />
                    </div>

                    {/* Profile Dropdown */}
                    <div className='group relative'>
                        <div onClick={() => navigate('/login')} className='p-2 rounded-full hover:bg-slate-100 cursor-pointer transition-colors'>
                            <img src={assets.profile_icon} className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity' alt="Profile" />
                        </div>
                        {/* Dropdown Menu */}
                        <div className='group-hover:block hidden absolute right-0 pt-4 z-50'>
                            <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-white text-gray-500 rounded-lg shadow-xl border border-gray-100'>
                                <p className='cursor-pointer hover:text-black hover:bg-gray-50 px-2 py-1 rounded transition-colors'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black hover:bg-gray-50 px-2 py-1 rounded transition-colors'>Orders</p>
                                <p onClick={() => navigate('/login')} className='cursor-pointer hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors'>Logout</p>
                            </div>
                        </div>
                    </div>

                    {/* Cart Icon */}
                    <Link to='/cart' className='group relative p-2 rounded-full hover:bg-slate-100 transition-colors'>
                        <img src={assets.cart_icon} className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity' alt="Cart" />
                        <span className='absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white shadow-sm'>
                            {getCartCount()}
                        </span>
                    </Link>

                    {/* Mobile Menu Toggle Button */}
                    <button onClick={() => setVisible(true)} className='sm:hidden p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors'>
                        <img src={assets.menu_icon} className='w-6 h-6 opacity-80' alt="Menu" />
                    </button>
                </div>

                {/* --- 4. MOBILE MENU SIDEBAR --- */}
                <div className={`fixed top-0 right-0 bottom-0 bg-white z-50 transition-all duration-300 ease-in-out shadow-2xl overflow-hidden ${visible ? 'w-[85%] sm:w-[350px]' : 'w-0'}`}>
                    <div className='flex flex-col h-full overflow-y-auto'>
                        
                        {/* Header */}
                        <div className='flex items-center justify-between p-5 border-b border-gray-100 bg-white sticky top-0 z-10'>
                            <div className='flex items-center gap-3'>
                                <img src={assets.logo} className='w-8 object-contain mix-blend-multiply' alt="Logo" />
                                <span className='font-bold text-lg tracking-wider text-slate-900'>MENU</span>
                            </div>
                            <div onClick={() => setVisible(false)} className='p-2 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100'>
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </div>
                        </div>
                        
                        {/* Navigation Links */}
                        <div className='flex flex-col p-4'>
                            {navItems.map((item) => (
                                <NavLink 
                                    key={item.name} 
                                    onClick={() => setVisible(false)} 
                                    className={({ isActive }) => 
                                        `py-4 px-4 rounded-xl text-sm font-bold tracking-wider mb-1 transition-colors ${isActive ? 'bg-black text-white shadow-md' : 'text-slate-600 hover:bg-gray-50'}`
                                    }
                                    to={item.path}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* Quick Actions Section */}
                        <div className='border-t border-gray-100 p-4 mt-auto mb-4'>
                            <h3 className='text-xs font-bold tracking-widest text-slate-400 uppercase mb-3 px-2'>Quick Actions</h3>
                            <div className='flex flex-col gap-2'>
                                <Link to='/profile' onClick={() => setVisible(false)} className='flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-50 text-slate-600 font-medium text-sm'>
                                    <img src={assets.profile_icon} className='w-4 h-4 opacity-60' alt="" /> My Profile
                                </Link>
                                <Link to='/orders' onClick={() => setVisible(false)} className='flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-50 text-slate-600 font-medium text-sm'>
                                    <img src={assets.profile_icon} className='w-4 h-4 opacity-60 rotate-90' alt="" /> My Orders
                                </Link>
                                <Link to='/cart' onClick={() => setVisible(false)} className='flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-50 text-slate-600 font-medium text-sm'>
                                    <img src={assets.cart_icon} className='w-4 h-4 opacity-60' alt="" /> Shopping Cart 
                                    <span className='ml-auto bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full'>{getCartCount()}</span>
                                </Link>
                            </div>
                        </div>

                        {/* Brand Footer */}
                        <div className='bg-gray-50 p-6 text-center border-t border-gray-100'>
                            <p className='text-sm font-extrabold tracking-wide text-slate-900 uppercase'>Dmax Lanka</p>
                            <p className='text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mt-1'>Private Limited</p>
                        </div>

                    </div>
                </div>

                {/* Mobile Overlay */}
                <div 
                    onClick={() => setVisible(false)}
                    className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 sm:hidden ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                ></div>
            </div>
        </nav>
    )
}

export default Navbar