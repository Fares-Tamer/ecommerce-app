import { getUserToken } from "@/helpers/getUserToken/getUserToken";

import { NextResponse } from "next/server";



export async function POST(req:Request){
    const token = await getUserToken();
    if(!token){
        return NextResponse.json({error:"Unauthorized"},{status:401});
    }
    const body = await req.json();
    const {cartId,shippingAddress} = body;
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
        method:"POST",
        headers:{
          token:token+'',
          "Content-Type":"application/json",
        },
        body:JSON.stringify({shippingAddress}),
      });
      const data = await response.json();
      return NextResponse.json(data); 
}