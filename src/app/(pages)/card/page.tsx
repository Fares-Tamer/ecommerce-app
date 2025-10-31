"use client"

import { CartContext } from '@/app/_component/Context/CartContext'
import Loading from '@/app/loading';
import { formatCurrency } from '@/helpers/formatCurrency'


import { Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';

import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';

import CheckOut from '@/app/_component/Checkout/CheckOut';

import { clearItemProduct, removeItemProduct, updateItemProduct } from '@/app/_action/addToCartAction';



export default function Card() {

  const {cartData,isLoading , setCartData , getCart} = useContext(CartContext);
  const [removeId, setRemoveId] = useState<string|null>(null);
  const [updateId, setUpdateId] = useState<string|null>(null);
  const [loadingClear, setIsLoadingClear] = useState(false);


// RemoveItem
  async function removeItem(productId:string){
    setRemoveId(productId)
    const data = await removeItemProduct(productId); 
    if(data.status === 'success'){
      toast.success("Product Removed Succesfully"); 
      setCartData(data);
    }
    setRemoveId(null);
    
  }
// UpdateItem
  async function updateItem(productId:string,count:number){
    if(count == 0){
      removeItem(productId);
    }else{
      setUpdateId(productId);
    const data = await updateItemProduct(productId,count);
    console.log(data);
    if(data.status=='success'){
      toast.success("Product Quantity updated succesfully");
      setCartData(data);
    }
    setUpdateId(null);
    }
  }
// ClearItem
  async function clearCart(){
    setIsLoadingClear(true);
    const data = await clearItemProduct();
    console.log(data);
    
    if(data.message === 'success'){
      await getCart();
    }
    setIsLoadingClear(false);
  }

 

  return <>
  {isLoading ? <Loading/>:cartData && cartData.numOfCartItems && cartData?.numOfCartItems>0 ? <div className="container mx-auto px-4 py-6">
      <h1 className='text-3xl font-bold '>Shopping Cart</h1>
      <p className='text-muted-foreground mt-1'>{cartData?.numOfCartItems} items in your cart</p>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6'>
        {/* items Column */}
        <div className='lg:col-span-2 space-y-4'>
          {cartData?.data.products.map((product)=>
          <div key={product._id} className='flex gap-4 rounded-xl border p-4 shadow-sm bg-card'>
            <img src={product.product.imageCover} alt={product.product.title} className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28'/>
            <div className='flex-1 min-w-0'>
              <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>



                <div className='min-w-0'>
                  <h3 className='font-semibold text-base md:text-lg line-clamp-1'>{product.product.title}</h3> 
                  <p className='text-sm text-muted-foreground mt-1'>{product?.product?.brand?.name}.{product?.product?.category?.name}</p>
                </div>


                <div className='text-right shrink-0'>
                    <div className='font-semibold'>
                      {formatCurrency(product.price)} 
                    </div>
                </div>
                
              </div>

              <div className="flex mt-3 items-center justify-between"> 

                <div className="flex items-center gap-2">
                  <button disabled={product.count == 1} aria-label='decrease' className='size-8 rounded-lg border hover:bg-accent cursor-pointer' onClick={()=>updateItem(product.product._id,product.count - 1)}>-</button>
                  <span className='w-6 text-center font-medium'>{updateId === product.product._id ? <Loader2 className='animate-spin'/> : product.count}</span>   
                  <button aria-label='increase' className='size-8 rounded-lg border hover:bg-accent cursor-pointer' onClick={()=>updateItem(product.product._id,product.count + 1)}>+</button>
                </div>

                <button disabled={removeId === product.product.id} aria-label='remove' className='text-destructive hover:underline text-sm cursor-pointer pl-1 sm:pl-0 flex gap-1 items-center' onClick={()=>removeItem(product.product.id)}>{removeId === product.product.id && <Loader2 className='animate-spin size-3'/>}remove</button>


              </div>
            </div>

          </div>)}
        </div>




        {/* Summary Column */}
        <div className='lg:col-span-1 sticky top-18'>
          <div className='rounded-xl border p-5 shadow-sm'>
            <h2 className='text-lg font-semibold'>Order Summary</h2>
            <div className='mt-4 space-y-2'>

              <div className="flex items-center justify-between">
                <span className='text-sm text-muted-foreground'>Subtotal {cartData?.numOfCartItems} items</span> 
                <span className='font-semibold'>{formatCurrency(cartData?.data.totalCartPrice)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className='text-sm text-muted-foreground'>shipping</span> 
                <span className='font-medium text-emerald-600'>Free</span>
              </div>

              <div className="my-4 border-t">
                <div className="flex items-center justify-between mt-2">
                  <span className='font-bold'>Total</span> 
                  <span className='font-semibold'>{formatCurrency(cartData?.data.totalCartPrice)}</span> 
              </div>

              <CheckOut cartId={cartData?.cartId}/>
              <Link href={'/products'}><button className='w-full rounded-lg bg-white hover:cursor-pointer text-black py-2 my-2 hover:bg-gray-100 border'>Continue Shopping</button></Link>

              </div>
            </div>
          </div>
          <button onClick={clearCart} className='w-full mt-5 rounded-lg bg-black text-white py-2 cursor-pointer hover:bg-red-600 flex items-center justify-center gap-1'>{loadingClear?<Loader2 className='animate-spin'/>:<Trash2/>}Clear Cart</button>
        </div>

      </div>
    </div>:
    <div className='min-h-140 flex flex-col justify-center items-center'>
      <h2 className='text-2xl '>Your Cart Is Empty</h2>
      <Link href={'/products'}><button className='w-40 rounded-lg bg-blue-600 hover:cursor-pointer text-white py-2 my-2 hover:bg-blue-400 border'>Add Ones</button></Link>
    </div>
    }  
    
  
  
  
  
  
  
  
  
  
  </>
}

