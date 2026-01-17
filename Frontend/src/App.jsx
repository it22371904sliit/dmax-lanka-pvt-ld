import React from 'react';
import { Routes, Route } from 'react-router-dom';
// 1. You must import ToastContainer and its CSS
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Collection from './Pages/Collection';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import PlaceOrder from './Pages/PlaceOrder';
import Orders from './Pages/Orders';
import ProductPage from './Pages/Product';

const App = () => {
  return (
    <div className='bg-white min-h-screen w-full'>
      {/* ToastContainer will now work correctly */}
      <ToastContainer position="bottom-right" theme="dark" />
      
      {/* Navbar stays full width */}
      <Navbar />

      {/* Main content is now full-width so Home.jsx can be edge-to-edge */}
      <main className='w-full'>
        <Routes>
          <Route path='/' element={<Home />} />
          
          {/* We add padding manually to these specific pages so they don't touch the edges */}
          <Route path='/collection' element={<div className='px-4 md:px-[9vw]'><Collection /></div>} />
          <Route path='/about' element={<div className='px-4 md:px-[9vw]'><About /></div>} />
          <Route path='/contact' element={<div className='px-4 md:px-[9vw]'><Contact /></div>} />
          <Route path='/product/:productId' element={<div className='px-4 md:px-[9vw]'><ProductPage /></div>} />
          <Route path='/cart' element={<div className='px-4 md:px-[9vw]'><Cart /></div>} />
          <Route path='/login' element={<div className='px-4 md:px-[9vw]'><Login /></div>} />
          <Route path='/placeorder' element={<div className='px-4 md:px-[9vw]'><PlaceOrder /></div>} />
          <Route path='/orders' element={<div className='px-4 md:px-[9vw]'><Orders /></div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App;