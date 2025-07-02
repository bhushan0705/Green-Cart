import React from 'react'

import btsellerImg from '../assets/bottom_banner_image.png'
import btsellerImg2 from '../assets/bottom_banner_image_sm.png'
import Subscribe from './Subscribe'

const BestSellers = () => {

  const bestComments =[
    {icon:<i className="fa-solid fa-truck"></i>, title:'Fastest Delivery', desc:'Groceries delivered in under 30 minutes.'},
    {icon:<i className="fa-solid fa-leaf"></i>, title:'Freshness Guaranteed', desc:'Fresh produce straight from the source.'},
    {icon:<i className="fa-solid fa-money-check-dollar"></i>, title:'Affordable Prices', desc:'Quality groceries at unbeatable prices.'},
    {icon:<i className="fa-solid fa-shield-heart"></i>, title:'Trusted by Thousands', desc:'Loved by 10,000+ happy customers.'},
  ]
  return (
    <div className='lg:px-20 px-10 py-4'>
        <h1 className='text-2xl py-1 font-bold mb-5'>Best sellers</h1>
        <div className=' flex items-center justify-end relative'>
        <img src={btsellerImg} alt="greenImg" className='lg:block hidden' />

        <img src={btsellerImg2} alt="greenImg" className='lg:hidden md:block h-[100vh] object-cover' />

          <div className='absolute p-10 top-0 flex flex-col items-start gap-3'>
            <p className='text-3xl font-medium text-green-500 '>Why We Are the Best?</p>
            
            {bestComments.map((item,index)=>
            <div key={index+1} className='flex lg:items-center lg:justify-center items-start gap-3 '>
              <p className='lg:p-5 p-2 rounded bg-green-500 text-white'>{item.icon}</p>
              <div className='flex flex-col w-full '>
              <p className='font-bold'>{item.title}</p>
              <p className='text-black/50'>{item.desc}</p>
              </div>
            </div>
            )}
          </div>
        </div>
        <Subscribe></Subscribe>
    </div>
  )
}

export default BestSellers