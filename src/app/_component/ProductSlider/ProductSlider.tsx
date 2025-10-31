"use client"

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import React from 'react'

export default function ProductSlider({images}:{images:string[]}) {
  return <>
  <Carousel  opts={{loop: true,}} plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}> 
                <CarouselContent>
                {images.map((image,index)=><CarouselItem key={index}><Image width={400} height={400} src={image} alt='' className='w-full object-cover '></Image></CarouselItem>)}
                </CarouselContent>
                
   </Carousel>
  </>
}

