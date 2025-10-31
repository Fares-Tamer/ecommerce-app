
import { Params } from 'next/dist/server/request/params'
import React from 'react'
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
import { ProductI } from '@/interfaces/product';

export default async function CategoryProduct({params}:{params:Params}) {
const {categoryId} = await params;
const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=`+categoryId)
const {data : category} : {data:ProductI[]} = await response.json();
console.log(category);

  return <>
  
   {category.length>0?
   <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2 sm:p-0'>
    {category.map((product)=>
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
    </div>
    )}
   </div>
   :
   <div className='flex justify-center items-center h-[250px] p-2 sm:p-0'>
      <h2 className='text-2xl '>No Products available in this category</h2>
  </div>
    }


  
  </>
}
