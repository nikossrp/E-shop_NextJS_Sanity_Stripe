import React from 'react'
import { FooterBanner, HeroBanner, Footer, Layout } from '../components'
import Products_Interface from '../components/Products_Interface';
import { client } from '../lib/client';

const Home = ({products_interface, bannerData}) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/> 

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speaker of many variations</p>
      </div>
      <div className='products-container'>
        {
          products_interface?.map((products_interface) => 
            <Products_Interface
              key={products_interface._id}
              products_interface={products_interface}
            />
          )
        }
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]}/> 
    </>
  )
}




// this is a pre-rendered function
export const getServerSideProps = async () => {
  const query = '*[_type == "products_interface"]';  // graping all (*) the products from sanity dashboard
  const products_interface = await client.fetch(query);

  // console.log(products_interface);

  const bannerQuery = '*[_type == "banner"]'; 
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {products_interface, bannerData} // we're using this to props
  }
}

export default Home