import { Categories } from '@/interfaces/categorirs';
import Link from 'next/link';
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
export default async function Brands() {

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const { data : brands} : {data : Categories[]} = await response.json();
  console.log(brands);
  


  return <>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2 sm:p-0">
  {brands.map((brand)=>
  <div key={brand._id}>
    <Link href={'/products/brand/'+brand._id}>
     <Card className="w-full h-[250px] flex flex-col hover:scale-95 hover:text-green-300">
          
          <div className="h-[150px] w-full"><Image width={300} height={300} src={brand.image} alt='' className='w-full object-cover h-full rounded-t-md'></Image></div>
        <CardHeader className="flex-1 justify-center items-center ">
          <CardTitle className="text-center text-sm">{brand.name}</CardTitle>
        </CardHeader>
        
      </Card>
    </Link>
  </div>
  )}
 </div>
  
  </>
}
