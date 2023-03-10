import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'  // shopping icon

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

function Navbar() {

  const {showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">N.Serepas Headphones</Link>
      </p>

      <button 
        type="button" 
        className='cart-icon'
        onClick={() => setShowCart(showCart ? false: true)}>
        <AiOutlineShopping/>
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      { showCart && <Cart />}
    </div>
  )
}

export default Navbar