import React from 'react'
import Link from 'next/link'  // for leading to product page

import { urlFor } from '../lib/client';

function Products_Interface({ products_interface}) {
  const { name, image, product_type } = products_interface;
  return (
    <div>
       {/*NextJs look the path and expect from you to create a folder named pages/product and in there to put another page about your product */}
      <Link href={`/product_interface/${product_type}`}>    
        <div className="product-card">
          <img 
            src={urlFor(image)} 
            width={250}
            height={250}
            className="product-image"
          />
          <p className='product-name'>{name}</p>
          {/* <p className='product-price'>€{price}</p> */}
        </div>
      </Link> 
    </div>
  )
}

export default Products_Interface