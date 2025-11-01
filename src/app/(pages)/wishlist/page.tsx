"use client"
import { WishlistContext } from '@/app/_component/Context/WishListContext'
import React, { useContext, useEffect } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

import Star from '@/app/_component/Icons/star';
import Link from 'next/link';
import FooterCart from '@/app/_component/AddToCart/FooterCart';
import { Loader2 } from 'lucide-react';
export default function WishlistPage() {

  const {viewWishlist,wishlist,loading} = useContext(WishlistContext);

  useEffect(()=>{
    viewWishlist();
  },[])

  if(loading)return<div className='flex items-center justify-center w-full h-160'><p className=' text-center text-3xl'>Loading...</p><Loader2 className='animate-spin' size={30}/></div>
  if(!wishlist||wishlist.count===0) return<div className='flex items-center justify-center w-full h-160'><p className=' text-center text-3xl font-semibold'>No Product in Wishlist Now..</p></div>
  return <>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2 sm:p-0">
    {wishlist?.data?.map((product)=>
  <div key={product.id}>
    
     
     
      
        <Card >
          <Link href={'/products/'+ product.id}>
          <Image width={300} height={300} src={product.imageCover} alt='' className='w-full object-cover '></Image>
        <CardHeader>
          <CardTitle>{product.title.split(' ',2)}</CardTitle>
          <CardDescription>{product.category.name}</CardDescription>
          <CardAction>{product.brand.name}</CardAction>
        </CardHeader>
          <CardContent>
    <div className="flex justify-between">
     <div className='flex'>
      <Star/>
      <Star/>
      <Star/>
      <Star/>
      <Star/>
     </div>
    <p>{product.ratingsAverage}</p>
    </div>
    <p className='pt-2'> Price : <span className="font-bold">{product.price} EGP</span></p>

  </CardContent>
  </Link>
  <FooterCart productId={product.id}/> 
  </Card>
      

</div>)}
  </div>
  
  
  </>
}
