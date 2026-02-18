import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
    
    const { currency } = useContext(ShopContext);

    return (
        <Link 
            onClick={() => window.scrollTo(0,0)} 
            className='cursor-pointer block group' 
            to={`/product/${id}`}
        >
            {/* Image Container with Luxury Focus */}
            <div className='overflow-hidden bg-[#F9F9F9] relative aspect-[3/4] shadow-sm group-hover:shadow-md transition-all duration-700'>
                <img 
                    className='w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 mix-blend-multiply' 
                    src={Array.isArray(image) ? image[0] : image} 
                    alt={name} 
                />
                
                {/* Subtle Luxury Reveal */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex justify-center border-t border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-800 uppercase tracking-[0.4em]">
                        View Piece
                    </span>
                </div>
            </div>

            {/* Product Details - Minimalist and Centered */}
            <div className="mt-4 flex flex-col items-center text-center px-2">
                <p className='text-[11px] md:text-[13px] font-medium text-[#1A1A1A] uppercase tracking-[0.2em] group-hover:text-[#B8987E] transition-colors duration-500 line-clamp-1'>
                    {name}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                    <span className='text-[10px] text-neutral-400 font-serif italic'>LKR</span>
                    <p className='text-xs md:text-sm font-light text-[#B8987E] tracking-widest'>
                        {price.toLocaleString()}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem