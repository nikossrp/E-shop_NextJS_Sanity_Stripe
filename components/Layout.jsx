import React from 'react';
import Head from 'next/head'; // it is the same with <head></head> component in html
import { Navbar, Footer } from '../components';

function Layout({children}) { //children is a special prop for the react since it can render the whole page into to the layout
  return (
    <div className='layout'>
      <Head>
        <title>N.Serepas Store</title>
      </Head>

      <header>
        <Navbar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout