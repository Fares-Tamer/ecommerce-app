"use client"

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { HeartIcon, Loader, Loader2, ShoppingCartIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { CartContext } from '../Context/CartContext'
import { WishlistContext } from '../Context/WishListContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addToCartAction } from '@/app/_action/addToCartAction'

export default function FooterCart({productId}:{productId:string}) {
    const [isLoading, setIsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false)
    const {getCart}= useContext(CartContext);
    const {removeWishlist,addWishlist,wishlist} = useContext(WishlistContext);
    

    const session = useSession(); 
    const router = useRouter();

    async function addProductToCart(){ 
        if(session.status=='authenticated'){
        setIsLoading(true);
        const data  = await addToCartAction(productId); 
        await getCart();
        // setCartData(data);
        if(data.status == 'success'){
            toast.success(data.message);
        }
        setIsLoading(false);
        }
        else{
            router.push('/login'); 
        }
    } 

    const isINWishlist = (()=>{
        const data = wishlist?.data;
        if(!data)return false;
        if(data.length>0 && typeof data[0] === "string"){
            return (data as known as string[]).some(id => id=== productId);
        }
        return (data as known as any[]).some(item =>{
            if(!item)return false;
            return item.id === productId || item._id === productId;
        })
    })();

    const handleToggleWishlist = async () => {
        if(actionLoading) 
            return;
        setActionLoading(true);
        try{
            if(isINWishlist){
                await removeWishlist(productId);
            }else{
                await addWishlist(productId);
            }
            
        }catch(err){
            console.error("wishlist action error:",err);
            toast.error("fares");
        }finally{
            setActionLoading(false);
        }
    };

  return <>
    <CardFooter className='gap-1'>
        <Button disabled={isLoading} onClick={addProductToCart} className='grow cursor-pointer'>
            {isLoading?<Loader className='animate-spin'/>:<ShoppingCartIcon/>} Add To Cart </Button>
        <button onClick={handleToggleWishlist} aria-label={isINWishlist?"Remove from wishlist":"Add to wishlist"} className='p-1' disabled={actionLoading}>{actionLoading?(<Loader2 className='animate-spin'/>):(<HeartIcon size={20} color={isINWishlist?"red":undefined} fill={isINWishlist?"red":"none"} className='cursor-pointer'/>)}</button>
    </CardFooter>
  </>
}


