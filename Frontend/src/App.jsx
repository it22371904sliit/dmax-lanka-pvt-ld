import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './Components/Navbar';


// Pages
import Home from './Pages/Home';
import Collection from './Pages/Collection';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import PlaceOrder from './Pages/PlaceOrder';
import Orders from './Pages/Orders';
import Product from './Pages/Product'; // Renamed to match the Product.jsx file

const App = () => {
  return (
    <div className='bg-white min-h-screen w-full flex flex-col selection:bg-[#B8987E] selection:text-white'>
      {/* Toast Notification Container with Luxury Theme */}
      <ToastContainer position="bottom-right" theme="light" autoClose={3000} />
      
      {/* Navbar Component - Fixed at top for elite navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className='flex-grow w-full'>
        <Routes>
          <Route path='/' element={<Home />} />
          
          {/* Collection: Using wide containers for the gallery */}
          <Route path='/collection' element={<Collection />} />
          
          <Route path='/about' element={<div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10'><About /></div>} />
          
          <Route path='/contact' element={<div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10'><Contact /></div>} />
          
          {/* Product Page: Removed wrapper padding to allow the luxury gallery to breathe */}
          <Route path='/product/:productId' element={<Product />} />
          
          <Route path='/cart' element={<div className='max-w-[1200px] mx-auto px-4 sm:px-6 pt-10'><Cart /></div>} />
          
          <Route path='/login' element={<div className='max-w-[1440px] mx-auto px-4 pt-10'><Login /></div>} />
          
          <Route path='/place-order' element={<div className='max-w-[1440px] mx-auto px-4 pt-10'><PlaceOrder /></div>} />
          
          <Route path='/orders' element={<div className='max-w-[1440px] mx-auto px-4 pt-10'><Orders /></div>} />
          
          {/* Fallback route */}
          <Route path='*' element={<Home />} />
        </Routes>
      </main>
      
      
    </div>
  )
}

export default App;