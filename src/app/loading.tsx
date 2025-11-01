import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return <>
  <div className='min-h-screen flex justify-center items-center'>
    <h1>Loading... </h1>
    <Loader2 size={50} className='animate-spin text-center'/>
  </div>
  </>
}


