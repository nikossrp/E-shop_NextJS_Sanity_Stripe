import React from 'react'
import { Product } from '../../components'
import { urlFor, client } from '../../lib/client'


const similar_products = ({ products }) => {
  return (
    <div>
      {products.map((product) => 
          <Product 
            key={product._id} 
            product={product}
            flag = {true}
          />)}
    </div>
  )
}


export const getStaticPaths = async () => {
  const query = `*[_type == "product"]`; // it is saying give me all the products but dont return all the products return only the specific product with this slug (sanity language)

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      product_type: String(product.product_type)
    }
  }));


  return {
      paths,
      fallback:'blocking'
  }
}


export const getStaticProps = async ({ params: { product_type }}) => {
  const query = `*[_type == "product" && product_type == '${product_type}']`;   // we want the product type to be equal with this specific type ( essentially we want all the products with the same type )
  const products = await client.fetch(query);

  return {
    props: { products }
  }
}


export default similar_products