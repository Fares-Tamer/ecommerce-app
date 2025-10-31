
import React from 'react'

export default function Footer() {
  return <>
  <div className="shadow-md bg-gray-100 mt-2 py-14 px-2 md:px-0 ">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        <div className="w-full">
        <h2 className='font-bold pb-4'><span className='bg-black text-white py-1 px-2'>T</span> ShopMart</h2>
        <p className='text-gray-500'>Your one-stop destination for the latest technology,fashion,and lifestyle products. Quality guaranteed with fast shipping and excellent customer service</p>
        <div className="flex gap-1 text-gray-500 pt-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 p-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span> 123 Shop Street,Octoper City, DC 12345</span>
        </div>
        <div className="flex gap-1 text-gray-500 pt-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span>(+20) 01093874303</span>
        </div>
        <div className="flex gap-1 text-gray-500 pt-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
            </svg>
            <span>support@shopmart.com</span> 
        </div>
    </div>
    <div className="w-full pl-3">
        <h3 className='font-bold'>SHOP</h3>
        <p className='text-gray-500 py-1 pt-2'>Electronics</p>
        <p className='text-gray-500 py-1'>Fashion</p>
        <p className='text-gray-500 py-1'>Home & Garden</p>
        <p className='text-gray-500 py-1'>Sports</p>
        <p className='text-gray-500 py-1'>Deals</p>
    </div>
    <div className="w-full">
        <h3 className='font-bold'>CUSTOMER SERVICE</h3>
        <p className='text-gray-500 py-1 pt-2'>Contact Us</p>
        <p className='text-gray-500 py-1'>Help Center</p>
        <p className='text-gray-500 py-1'>Track Your Order</p>
        <p className='text-gray-500 py-1'>Returns & Exchanges</p>
        <p className='text-gray-500 py-1'>Size Guide</p>
    </div>
    <div className="w-full">
        <h3 className='font-bold'>ABOUT</h3>
        <p className='text-gray-500 py-1 pt-2'>About shopmart</p>
        <p className='text-gray-500 py-1'>Careers</p>
        <p className='text-gray-500 py-1'>Press</p>
        <p className='text-gray-500 py-1'>Investor Relations</p>
        <p className='text-gray-500 py-1'>Sustainability</p>
    </div>
    <div className="w-full">
        <h3 className='font-bold'>POLICES</h3>
        <p className='text-gray-500 py-1 pt-2'>Privacy Policy</p>
        <p className='text-gray-500 py-1'>Terms of Service</p>
        <p className='text-gray-500 py-1'>Cookie Policy</p>
        <p className='text-gray-500 py-1'>Shipping Policy</p>
        <p className='text-gray-500 py-1'>Refund Policy</p>
    </div>
  </div>
  
    </div>
    
  
  
  
  
  </>
}
