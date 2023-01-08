import '../styles/globals.css'
import React from 'react'
import { Layout } from '../components'

import {StateContext} from '../context/StateContext'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>  {/** All the data of our app is going to manage through AppWrapper*/}
      <Layout>
        <Toaster/>  {/* for the small notification pop-up */}
        <Component {...pageProps} />    {/*This component means the component we are currently on (e.g if we are on product detail page that component is going to be)*/}
      </Layout>
    </StateContext>
  )
}

export default MyApp

/*
when we had
  <Layout>
    <Component {...pageProps} />   
  </Layout>

  the output of the page was 
  Navbar
  Empty
  Footer 
  only those three words
  So the question is how would we go to our page with the layout?

  A special trick on react is what ever you pas through a component you get access to that 
  through a prop called children
  So the final result is:

    <Layout>
      <Component {...pageProps} />    
    </Layout>

    but with the layout taking props children (children is special word for react)
    and randering those children on the Empty/main section

    if you didn't understand please check: https://youtu.be/4mOkFXyxfsU?t=4117
*/