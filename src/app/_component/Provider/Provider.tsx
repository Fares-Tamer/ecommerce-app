"use client"

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import WishlistContextProvider from '../Context/WishListContext'
import CartContextProvider from '../Context/CartContext'
import Navbar from '../Navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import Footer from '../Footer/Footer'

export default function Provider({children}:{children:ReactNode}) {
  return <>
   <SessionProvider>
          <WishlistContextProvider>
            <CartContextProvider>
              <Navbar/>
                <div className="container mx-auto py-4"> 
                <Toaster/>
                    {children}
                </div>
              <Footer/>
            </CartContextProvider>
          </WishlistContextProvider>
    </SessionProvider>
  
  </>
}
