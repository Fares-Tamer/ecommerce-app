
"use server"

import { getUserToken } from "@/helpers/getUserToken/getUserToken";
// import { getUserToken } from "@/helpers/getUserToken/getUserToken";
import { CartResponse } from "@/interfaces/Cart";
import { OnlinePayment } from "@/interfaces/onlinePayment";
import { addWishlist } from "@/interfaces/wishlist";


export async function addToCartAction(productId:string){
    const token = await getUserToken(); 
    const response  = await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
            method:"POST",
            body: JSON.stringify({productId}),
            headers:{
                token:token+'',
                "Content-Type":"application/json",
            }
        })
        const data = await response.json();
        return data;
} 

export async function addWishlistFact(productId : string){
    const token = await getUserToken();
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
            method:"POST",
            body:JSON.stringify({productId}),
            headers:{
                token:token+'',
                "Content-Type":"application/json"
            }
        });
    const data = await response.json();
    return data;
}

export async function removeWishlistFact(productId : string){
    const token = await getUserToken();
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist/"+productId,{
            method:"DELETE",
            headers:{
                token:token+'',
            }
        })
        const data : addWishlist = await response.json();
        return data;
}

export async function removeItemProduct(productId:string){
    const token = await getUserToken();
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{
          method:"DELETE",
          headers:{
            token:token+'',
          }
        });
        const data : CartResponse = await response.json();
        return data;
}

export async function updateItemProduct(productId:string,count :number){
    const token = await getUserToken();
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{
          method:"PUT",
          body:JSON.stringify({count}),
          headers:{
            token:token+'',
            "Content-Type":"application/json",
          }
        });
        const data:CartResponse = await response.json();
        return data;
}

export async function clearItemProduct(){
    const token = await getUserToken();
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
      method:"DELETE",
      headers:{
        token:token+'',
      }
    })
    const data = await response.json();
    return data;
}

export async function checkOut(cartId : string , shippingAddress :object){ 
    const token = await getUserToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
              method:"Post",
              body:JSON.stringify({shippingAddress}),
              headers:{
                token:token+'',
                "Content-Type":"application/json",
              }
            });
            const data : OnlinePayment = await response.json();
            return data;
}