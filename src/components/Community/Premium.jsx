import React from 'react'
import { GiCheckedShield } from 'react-icons/gi'

export default function Premium() {
  return (
    <div className='mt-7 bg-white rounded-md p-3'>
        <div className='flex items-center'>
            <GiCheckedShield className='text-[26px] text-red-500 mr-2' />
            <div className='flex flex-col ml-2'>
                <p className='text-[12px] font-bold'>Reddit Premium</p>
                <p className='text-[12px]'>The best Reddit experience, with mothly Coins</p>
            </div>
        </div>
        <div className='flex justify-center mt-1 mb-1'>
            <button className='bg-red-500 text-white text-[16px] font-bold w-full rounded-full hover:brightness-110'>Try Now</button>
        </div>
    </div>
  )
}
