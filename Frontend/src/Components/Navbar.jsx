import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    const [visible, setVisible] = useState(false);

    return (
        <nav className='sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300'>
            
            {/* Full Width Container with minimal edge padding */}
            <div className='w-full flex items-center justify-between py-4 px-2 sm:px-6 lg:px-8 font-medium'>

                {/* --- Left Side: Logo --- */}
                <Link to='/' className='flex items-center gap-2 group'>
                    <img 
                        src={assets.logo} 
                        className='w-14 sm:w-16 object-contain mix-blend-multiply' 
                        alt="Dmax Lanka" 
                    />
                    
                    <div className='hidden sm:flex flex-col leading-tight'>
                        <span className='text-xl font-extrabold tracking-[0.15em] text-slate-900 uppercase'>
                            Dmax Lanka
                        </span>
                        <span className='text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase mt-0.5 group-hover:text-slate-800 transition-colors'>
                            Private Limited
                        </span>
                    </div>
                </Link>

                {/* --- Center: Navigation --- */}
                <ul className='hidden sm:flex gap-10 text-xs font-bold tracking-widest text-slate-600 uppercase'>
                    {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
                        <NavLink 
                            key={item}
                            to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                            className={({ isActive }) => 
                                `relative py-2 group transition-colors duration-300 ${isActive ? 'text-black' : 'hover:text-black'}`
                            }
                        >
                            <span className='relative z-10'>{item}</span>
                            <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 ease-out group-hover:w-full opacity-0 group-hover:opacity-100'></span>
                            <span className='nav-active-dot hidden absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full'></span>
                        </NavLink>
                    ))}
                </ul>

                {/* --- Right Side: Icons --- */}
                <div className='flex items-center gap-2 sm:gap-4'>
                    <div className='p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer group'>
                        <img src={assets.search_icon} className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity' alt="Search" />
                    </div>

                    <div className='group relative'>
                        <div className='p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer'>
                            <img src={assets.profile_icon} className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity' alt="Profile" />
                        </div>
                        <div className='group-hover:block hidden absolute right-0 pt-2 w-48 animate-fadeIn'>
                            <div className='bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden py-1'>
                                <p className='px-4 py-3 text-xs text-slate-500 border-b border-slate-100'>Signed in as <br/><span className='font-bold text-slate-800'>Guest User</span></p>
                                <Link to='/profile' className='block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-black transition-colors'>My Profile</Link>
                                <Link to='/orders' className='block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-black transition-colors'>Orders</Link>
                                <div className='border-t border-slate-100 mt-1'></div>
                                <p className='block px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors'>Logout</p>
                            </div>
                        </div>
                    </div>

                    <Link to='/cart' className='group relative p-2 rounded-full hover:bg-slate-100 transition-colors'>
                        <img src={assets.cart_icon} className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity' alt="Cart" />
                        <span className='absolute top-0 right-0 h-4 w-4 bg-red-600 text-white text-[9px] font-bold flex items-center justify-center rounded-full ring-2 ring-white'>
                            10
                        </span>
                    </Link>

                    <button onClick={() => setVisible(!visible)} className='sm:hidden p-2 rounded-full hover:bg-slate-100 transition-colors'>
                        <img src={assets.menu_icon} className='w-6 h-6 opacity-80' alt="Menu" />
                    </button>
                </div>

                {/* --- Mobile Menu --- */}
                {visible && (
                    <div className='sm:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-40'>
                        <div className='flex flex-col p-4 gap-2'>
                            {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
                                <NavLink 
                                    key={item}
                                    onClick={() => setVisible(false)}
                                    to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                                    className={({ isActive }) => 
                                        `py-3 px-4 rounded-lg text-sm font-semibold tracking-wide transition-all ${isActive ? 'bg-black text-white' : 'text-slate-600 hover:bg-slate-50'}`
                                    }
                                >
                                    {item}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
                {/* Mobile Menu Overlay */}
                {visible && (
                    <div className='sm:hidden fixed inset-0 bg-black/20 z-30 top-16' onClick={() => setVisible(false)} />
                )}

            </div>
        </nav>
    )
}

export default Navbar