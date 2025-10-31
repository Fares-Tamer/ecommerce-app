
import { ProductI } from '@/interfaces/product';
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
  Card,
  
  CardContent,
  CardDescription,
  
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Star from '@/app/_component/Icons/star';



import ProductSlider from '@/app/_component/ProductSlider/ProductSlider';
import FooterCart from '@/app/_component/AddToCart/FooterCart';



export default async function ProductDetails({params}:{params:Params}) { 
    const {productId} = await params; 
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/products/"+productId);
    const {data : product} : {data : ProductI} = await response.json();
    
  return <>

    <Card className='grid md:grid-cols-3 items-center my-2'>
        <div className="col-span-1">
            <ProductSlider images={product.images}/>
        </div>
        <div className="md:col-span-2 space-y-4 p-4">
            <CardHeader>
                <CardDescription>{product.brand.name}</CardDescription>
                <CardTitle className='text-2xl'>{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
                {product.category.name}
               <div className="flex items-center gap-6 justify-between mt-3">
                    <div className="flex gap-1 ">
                        <Star/>
                        <span>{product.ratingsAverage}</span>
                    </div>
                    <div className="">Remaining <span>{product.ratingsQuantity}</span></div>
               </div>


               <div className="flex items-center justify-between mt-3">
                <div className="flex gap-1 items-center">
                    <div className=""><span>Quantity:    {product.quantity}</span></div>
                </div>
                <p>EGP <span className='text-xl font-semibold'>{product.price}</span></p>
               </div>
            </CardContent>
            <FooterCart productId={product.id} />
        </div>
    </Card>
    
    
  </>
}



