import React from 'react'
const Subscribe = () => {
  return (
    <div className='mt-10 h-[250px] flex flex-col items-center justify-evenly'>
        <div className='flex items-center justify-between flex-col gap-3 font-medium'>
        <p className='text-4xl'>Never Miss a Deal!</p>
        <p className='text-black/50'>Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>
        </div>
<div className="w-[70%] flex">
  <input
    type="text"
    placeholder="Enter your email id"
    className="p-3 w-full rounded-l-md border border-gray-300 outline-none"
  />
  <p className="bg-green-600 text-white px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-green-700 transition">
    Subscribe
  </p>
</div>

    </div>
  )
}

export default Subscribe