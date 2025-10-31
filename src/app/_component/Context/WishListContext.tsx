"use client"

import { addWishlistFact, removeWishlistFact } from '@/app/_action/addToCartAction';
import { addWishlist, WishlistResponse } from '@/interfaces/wishlist'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const WishlistContext = createContext<{
wishlist:WishlistResponse|null;
setWishlist:(value:WishlistResponse | null)=> void;
viewWishlist:()=>void;
loading:boolean;
setLoading:(value:boolean)=>void;
addWishlist:(value:string)=>void;
removeWishlist:(value:string)=>void;
}>({
wishlist:null,
setWishlist:()=>{},
viewWishlist:()=>{},
loading:false,
setLoading:()=>{},
addWishlist:(productId)=>{},
removeWishlist:(productId)=>{},
})


export default function WishlistContextProvider({children}:{children:ReactNode}) {

    const [wishlist, setWishlist] = useState<WishlistResponse|null>(null) ;
    const [loading, setLoading] = useState<boolean>(false);

    async function viewWishlist(){
        // setLoading(true)
        const response = await fetch("/api/get-wishlist");
        const data : WishlistResponse = await response.json(); 
        await setWishlist(data);
        setLoading(false);
    } 

    async function addWishlist(productId:string){
        const data = await addWishlistFact(productId);
        if(data.status === "success"){
            await viewWishlist();
            toast.success(data.message);
        }
    } 

    async function removeWishlist(productId:string){
        const data = await removeWishlistFact(productId);
        if(data.status === "success"){
            await viewWishlist();
            toast.success(data.message);
        }
    }

    useEffect(()=>{
        viewWishlist();
    },[])


  return <>
  
  <WishlistContext.Provider value={{setWishlist,wishlist,viewWishlist,setLoading,loading,addWishlist,removeWishlist}}> 
    {children}
  </WishlistContext.Provider>
  
  
  
  
  </>
}


