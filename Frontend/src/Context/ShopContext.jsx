import { createContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(); 

const ShopContextProvider = (props) => {

    const currency = 'Rs. ';
    const delivery_fee = 350;
    const navigate = useNavigate();
    
    // Search State
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    // Cart State
    const [cartItems, setCartItems] = useState({});

    // --- UPDATED DUMMY DATA FOR LUXURY BOUTIQUE ---
    const products = [
        {
            _id: "100379",
            name: "DMAX Premium Office Backpack",
            description: "Water-resistant, anti-theft design with USB charging port. A signature of professional excellence.",
            price: 4500,
            image: [assets.ofz, assets.ofz, assets.ofz, assets.ofz], // Multiple images for grid gallery
            category: "Office Bag",
            subCategory: "Atelier Series",
            // Upgraded Color Structure for stock logic
            colors: [
                { name: "Midnight Noir", hex: "#1A1A1A", stock: 10 },
                { name: "Slate Grey", hex: "#708090", stock: 5 },
                { name: "Electric Blue", hex: "#1d4ed8", stock: 0 } // Sold Out
            ],
            // Isolated individual dimensions
            length: "30 cm",
            height: "45 cm",
            width: "15 cm",
            material: "High-grade Polyester",
            compartmentDesc: "Twin external pockets, Dedicated 16' Laptop Suite",
            rating: 4.5, // Triggers fractional gold stars
            bestseller: true,
            date: 1716634345448,
            // Authenticated Stories isolated to this bag only
            reviews: [
                { userName: "Kavindu Perera", rating: 5, comment: "Unparalleled quality for the price.", date: "Feb 12, 2026" },
                 { userName: "Kavindu Perera", rating: 5, comment: "Unparalleled quality for the price.", date: "Feb 12, 2026" }
            ]
        },
        
        {
            _id: "100380",
            name: "DMAX Hiking Pro 55L",
            description: "Large capacity trekking bag with rain cover. Built for the rugged story.",
            price: 8500,
            image: [assets.travel, assets.travel],
            category: "Travelling Bag",
            subCategory: "Hiking",
            colors: [
                { name: "Forest Green", hex: "#15803d", stock: 8 },
                { name: "Crimson", hex: "#b91c1c", stock: 2 }
            ],
            length: "35 cm",
            height: "60 cm",
            width: "25 cm",
            material: "Nylon 600D",
            compartmentDesc: "Reinforced shoe compartment, Water bottle holster",
            rating: 4.8,
            bestseller: true,
            date: 1716634345449,
            reviews: [
                { userName: "Amasha Silva", rating: 5, comment: "Survived a heavy trek in Knuckles. Waterproofing is solid.", date: "Jan 28, 2026" }
            ]
        },
        {
            _id: "100381",
            name: "DMAX Kids Cartoon School Bag",
            description: "Lightweight, ergonomic design. Comfort for the youngest stories.",
            price: 2800,
            image: [assets.primary],
            category: "School Bag",
            subCategory: "Primary",
            colors: [
                { name: "Bubblegum Pink", hex: "#db2777", stock: 20 },
                { name: "Royal Purple", hex: "#9333ea", stock: 15 }
            ],
            length: "28 cm",
            height: "38 cm",
            width: "12 cm",
            material: "Durable Canvas",
            compartmentDesc: "Dual stationery pockets, Soft-padding straps",
            rating: 4.2,
            bestseller: false,
            date: 1716634345450,
            reviews: [] // Empty archive example
        }
    ];

    // UPDATED addToCart: Now using 'color' instead of 'size'
    const addToCart = async (itemId, color) => {
        if (!color) {
            toast.error('Please select a finish/color');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][color]) {
                cartData[itemId][color] += 1;
            } else {
                cartData[itemId][color] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][color] = 1;
        }
        setCartItems(cartData);
        toast.success('Piece added to your collection');
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, color, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][color] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalAmount;
    }

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;