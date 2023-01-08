import React, { useState } from 'react'
import { urlFor , client} from '../../lib/client'
import { AiOutlineMinus, AioutlinePlus, AiFillStar, AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';
import { Product } from '../../components';

import { useStateContext } from '../../context/StateContext';
import getStripe from '../../lib/getStripe';


const ProductDetails = ({ product, products, paths }) => {

  const { image, name, details, price } = product
  const [ index, setIndex ] = useState(0);
  const {decreaseQty, increaseQty, qty, addOnCart, setShowCart} = useStateContext();

  const handleBuyNow = async () => {  // in order to create the handleCheckout function we needed to implement a promise in lib folder 
    addOnCart(product, qty);
    setShowCart(true);
  }


  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={urlFor(image && image[index])} alt="" className="product-detail-image"/>
          </div>
          <div className='small-images-container'>
            {
              image?.map((item, i) => (
                <img 
                  key={i}
                  src={urlFor(item)}
                  className={i === index ? 'small-image selected-image' : 'small-image'}
                  onMouseOver={() => setIndex(i)}
                />))
            }
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{ name }</h1>
          <div className='reviews'>
          <div>
            <AiFillStar/>
            <AiFillStar/>
            <AiFillStar/>
            <AiFillStar/>
            <AiOutlineStar/>
          </div>

          <p>
            (20)
          </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'> €{price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decreaseQty}><AiOutlineMinus/></span>
              <span className='num' onClick="">{qty}</span>
              <span className='plus' onClick={increaseQty}><AiOutlinePlus/></span>
            </p>
          </div>
          <div className='buttons'>
            <button type="button" className='add-to-cart' onClick={() => addOnCart(product, qty)}>Add to Cart</button>
            <button type="button" className='buy-now' onClick={handleBuyNow}>Buy Now </button>
          </div>
        </div>
      </div>

      <div className="maylike-product-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {
              products.map((item) => (
                <Product 
                  key={item._id} 
                  product={item} 
                  flag={false}
                  />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}


// it is needed to work the getStaticProps below
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {  
    slug {
      current
    }
  }`; // it is saying give me all the products but dont return all the products return only the specific product with this slug (sanity language)

  const products = await client.fetch(query);
  const paths = products.map((product) => ({    // map: we care about only jsx elements to have a key on each product
    params: {
      slug: product.slug.current
    }
  }));


  return {
      paths,
      fallback:'blocking'
  }
}



//details about getStaticProps: https://nextjs.org/docs/basic-features/data-fetching/get-static-props
export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);
  
  const productsQuery = '*[_type == "product"]'
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product }
  }
}

export default ProductDetails