import { NextResponse } from 'next/server';
import { getUserToken } from "@/helpers/getUserToken/getUserToken";
import { WishlistResponse } from "@/interfaces/wishlist";


export async function GET(){
    const token = await getUserToken();
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
        method:"GET",
        headers:{
                token:token+'',
            }
            })
    const data : WishlistResponse = await response.json();
    return NextResponse.json(data);
}