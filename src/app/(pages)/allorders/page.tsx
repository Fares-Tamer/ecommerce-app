"use client"

import { OrderResponse } from "@/interfaces/orders";
import { CaseLower, CreditCard, CurlyBracesIcon, CurrencyIcon, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
export default function Allorders() {

  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTap,setActiveTap] = useState<"all"|"card"|"cash">("all");
  async function getOrders(){
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/orders/user/"+localStorage.getItem("userId"));
    const orders : OrderResponse[]= await response.json();
    console.log(orders);
    await setOrders(orders);
    setLoading(false);
  }

  const filtered = useMemo(()=>{
    if(activeTap === "all"){
      return orders;
    } 
    return orders.filter((o)=>o.paymentMethodType === (activeTap === "card"?"card":"cash"));
  },[orders,activeTap]);


  
  useEffect(()=>{
    getOrders();
  },[])

    if(loading){
    return <>
    <div className="flex items-center justify-center h-140"><Loader2 className="animate-spin" size={50}/></div>
    </>
  }

  return <>
  <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
  {/* Tabs */}
  <div className="flex gap-2 mb-6">
    <button onClick={()=>setActiveTap("all")} className={`px-4 py-2 rounded cursor-pointer ${activeTap === "all" ? "bg-blue-600 text-white":"bg-gray-100"}`}>All ({orders.length})</button>
    <button onClick={()=>setActiveTap("card")} className={`px-4 py-2 rounded cursor-pointer flex items-center gap-2 ${activeTap === "card" ? "bg-blue-600 text-white":"bg-gray-100"}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
</svg>
Card</button>
    <button onClick={()=>setActiveTap("cash")} className={`px-4 py-2 rounded cursor-pointer flex items-center gap-2 ${activeTap === "cash" ? "bg-blue-600 text-white":"bg-gray-100"}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
Cash</button>
  </div>

  
  {filtered.length===0?<p className="text-center text-gray-600">No orders found for this filter.</p>:
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2 sm:p-0">
    {filtered.map((order)=>
    <div key={order.id}>
      <Card>
        <Image width={300} height={300} src={order.cartItems[0].product.imageCover} alt={order.cartItems[0].product.title} className='w-full object-cover '></Image>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Order : {order.id}</CardTitle>
          <CardDescription>{new Date(order.createdAt).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p><span className="font-semibold">Total:</span>{" "}{order.totalOrderPrice}</p>
          <p><span className="font-semibold">Items:</span>{" "}{order.cartItems.length}</p>
          <p><span className="font-semibold">Paid:</span>{" "}{order.isPaid?"Yes":"No"}</p>
          <p><span className="font-semibold">Delivered:</span>{" "}{order.isDelivered?"Yes":"No"}</p>
        </CardContent>
         

      </Card>
    </div>)}
  </div>
}
  </>
}

