"use client"

import { ArrowUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function ScrollToTopButton() {

    const [isVisible, setIsVisible] = useState(false);
    useEffect(()=>{
        const toggleVisibility = ()=>{
            if(scrollY >= 300){
                setIsVisible(true);
            }else{
                setIsVisible(false);
            }
        }
        window.addEventListener("scroll",toggleVisibility);
        return()=>
            window.removeEventListener("scroll",toggleVisibility);
    },[])
    
    const scrollToTop = () =>{
        window.scrollTo({top:0,behavior:"smooth"}) 
    }
    if(!isVisible) return null;

  return <>
  <button onClick={scrollToTop} className='fixed bottom-5 right-5 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all cursor-pointer'><ArrowUp size={24}/></button> 
  
  
  
  
  </>
}
