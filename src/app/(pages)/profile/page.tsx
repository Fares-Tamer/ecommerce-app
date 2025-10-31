"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

export default function Page() { 

  const session = useSession(); 




  return <>
  
  <div className='h-[250px] pl-2 sm:pl-0'>
    <h1>User Profile</h1>
    <p><span className='font-bold'>Username: </span>{session.data?.user.name}</p>
    <p><span className='font-bold'>Email: </span>{session.data?.user.email}</p>  
  </div>
  
  
  
  
  </>
}
