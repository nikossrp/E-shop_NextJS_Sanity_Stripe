import React from 'react'
import Link from 'next/link'  // for leading to product page

import { urlFor } from '../lib/client';

function Product({ product:{image, slug, name, price}, flag }) {
  return (
    <div className='products-container'>
       {/*NextJs look the path and expect from you to create a folder named pages/product and in there to put another page about your product */}
      <Link href={`/product/${slug.current}`}>    
        <div className={flag ? 'product-card-with-desc' : ''}>
          <div className={flag ? '' : 'product-card'}>
            <img 
              src={urlFor(image && image[0])} 
              width={250}
              height={250}
              className="product-image"
            />
            <p className='product-name'>{name}</p>
            <p className='product-price'>€{price}</p>
          </div>
          {
            flag && 
          <div className='product-card-desc'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates laudantium facere aspernatur voluptate sit modi porro quae ex molestias unde. Sint maiores, earum enim aspernatur doloremque cupiditate odit error a?
          </div>
          }
        </div>
      </Link>
    </div>
  )
}

export default Product