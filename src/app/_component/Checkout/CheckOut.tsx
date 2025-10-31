"use client"
import React, { useRef } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { OnlinePayment } from '@/interfaces/onlinePayment'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { checkOut } from '@/app/_action/addToCartAction'

export default function CheckOut({cartId}:{cartId:string}) {

    const router = useRouter();

    const detailsInput  = useRef<HTMLInputElement | null>(null);
    const phoneInput = useRef<HTMLInputElement | null>(null);
    const cityInput = useRef<HTMLInputElement | null>(null);
    const shippingAddress = {
          details:detailsInput.current?.value,
          phone:phoneInput.current?.value,
          city:cityInput.current?.value,
        }
     async function CheckOutSession(){
       const data = await checkOut(cartId,shippingAddress)
        if(data.status === 'success'){
            location.href=data.session.url 
        }
    }
    async function CheckOutCash(){
      const response = await fetch(`api/checkout`)
      const data = await response.json();
      if(data.status == "success"){
        toast.success("Your order has been placed successfully");
        setTimeout(()=>router.push("/allorders"),1000);
      }
    }
return <>
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='w-full cursor-pointer my-3 py-3'>Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
              Please add Shipping Address
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input ref={cityInput} id="city" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="details">Details</Label>
              <Input ref={detailsInput} id="details" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phoneInput} id="phone" />
            </div>
            
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={CheckOutCash} type="submit" className='cursor-pointer'>Cash</Button>
            <Button onClick={CheckOutSession} type="submit" className='cursor-pointer'>Visa</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  
  
  
  </>
}
