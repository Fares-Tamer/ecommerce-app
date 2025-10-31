"use client"
import {
  NavigationMenu,
  
  NavigationMenuLink,
  NavigationMenuList,

  
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import  Link  from "next/link"

import React, { useContext, useState } from 'react'
import { Loader2, Menu, ShoppingCartIcon, UserIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CartContext } from "../Context/CartContext"
import { signOut, useSession } from "next-auth/react"




export default function Navbar() {

    const {cartData,isLoading}= useContext(CartContext);
    const [open, setOpen] = useState<boolean>(false)
    
    const session = useSession();
    console.log(session);
    

  return <>
  
    <nav className="py-3 bg-gray-50 text-2xl font-semibold shadow sticky top-0"> 
    <div className="container mx-auto">
        <div className="flex justify-between items-center">
            <h1><Link href={'/'}>ShopMart</Link></h1>


            <NavigationMenu className="hidden sm:flex">
                <NavigationMenuList>
   
                    <NavigationMenuLink asChild >
                        <Link href="/products">products</Link>
                    </NavigationMenuLink>

                    <NavigationMenuLink asChild>
                        <Link href="/brands">Brand</Link>
                    </NavigationMenuLink>

                    <NavigationMenuLink asChild>
                        <Link href="/categories">Categories</Link>
                    </NavigationMenuLink>

                    

                </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center">
                
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer outline-0"><UserIcon/></DropdownMenuTrigger> 
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        
                        {session.status == 'authenticated'?
                        <>
                         <Link href={'/wishlist'}><DropdownMenuItem>WishList</DropdownMenuItem></Link>
                         <Link href={'/profile'}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                         <DropdownMenuItem className="cursor-pointer" onClick={()=> signOut({
                            callbackUrl:''
                         })}>Logout</DropdownMenuItem>
                         </>
                        :
                        <>
                        <Link href={'/login'}><DropdownMenuItem>Login</DropdownMenuItem></Link>                        
                        <Link href={'/register'}><DropdownMenuItem>Register</DropdownMenuItem></Link>
                        
                        </>
                        }
                        
                        
                        
                </DropdownMenuContent>
                </DropdownMenu>

                {session.status == 'authenticated'&&<Link href={'/card'} className="cursor-pointer relative  p-3">
                    <ShoppingCartIcon />
                    <Badge className="size-4 pt-1 rounded-full px-1 absolute top-0 end-0 pb-1.5">
                        <span>{isLoading?<Loader2 className="animate-spin size-4"/>:cartData?.numOfCartItems}</span>
                    </Badge>
                </Link>
                }
                
                <div className="cursor-pointer sm:hidden"><Menu size={30} onClick={()=>setOpen(!open)}/></div> 
                
            </div>
            
        </div>
        {open && <div className="flex items-center space-y-2 justify-center ">
        <NavigationMenu>
                <NavigationMenuList className="flex-col">
   
                    <NavigationMenuLink asChild >
                        <Link onClick={()=>setOpen(false)} href="/products">products</Link>
                    </NavigationMenuLink>

                    <NavigationMenuLink asChild>
                        <Link onClick={()=>setOpen(false)} href="/brands">Brand</Link>
                    </NavigationMenuLink>

                    <NavigationMenuLink asChild>
                        <Link onClick={()=>setOpen(false)} href="/categories">Categories</Link>
                    </NavigationMenuLink>

                </NavigationMenuList>
            </NavigationMenu>
            </div>}
    </div> 
  </nav>
  
  
  
  
  
  
  </>
}
