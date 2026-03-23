import React from 'react'

export default function Dashboard() {
  return (
    <div className='w-[100%] min-h-[610px]'>
      <div className='grid gap-4 max-w-[1220px] mx-auto py-5 grid-cols-3 justify-center '>
        <div className='bg-[#5956D3] text-white p-[20px] h-48 rounded-[5px]'>
          <h3 className='text-[25px]  font-bold'>26K <span className='text-[18px]'>(-12.4% ↓)</span></h3>

          <p  className='text-[20px]  font-semibold'>Users</p>
        </div>

         <div className='bg-[#2998FE] text-white p-[20px] h-48 rounded-[5px]'>
          <h3 className='text-[25px]  font-bold'>$6,200 <span className='text-[18px]'>(40.9% ↑)</span></h3>

          <p  className='text-[20px]  font-semibold'>Product</p>
        </div>


         <div className='bg-[#FCB01E] text-white p-[20px] h-48 rounded-[5px]'>
          <h3 className='text-[25px]  font-bold'>2.49%  <span className='text-[18px]'>(84.7% ↑)</span></h3>

          <p  className='text-[20px]  font-semibold'>Category</p>
        </div>


         <div className='bg-[#E95353] text-white p-[20px] h-48 rounded-[5px]'>
          <h3 className='text-[25px]  font-bold'>44K  <span className='text-[18px]'>(-23.6% ↓)</span></h3>

          <p  className='text-[20px]  font-semibold'>Orders</p>
        </div>
      </div>
    </div>
  )
}
