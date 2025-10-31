import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function Home() {
  return <>
  
  <div className="flex-col justify-center items-center py-40 text-center">

  <div>
    <h1 className="text-6xl font-bold px-4 text-center">Welcome to ShopMart</h1>
    <p className="pt-5 text-gray-500 text-2xl">Discover the latest technology,fashion,and lifestyle products. Quality guaranteed with<span className="pt-3"><br></br> fast shipping and excellent customer service</span></p>
    <div className="flex justify-center items-center py-8 gap-3">
      <Button className="cursor-pointer px-6 py-3"><Link href={'/products'}>Shop Now</Link></Button>
      <Button className="bg-white text-black hover:text-white border-black border-solid border-2 cursor-pointer px-6"><Link href={'/categories'}>Browse Categories</Link></Button> 
    </div>
  </div>
    
  </div>
  
  
  
  
  </>
}
