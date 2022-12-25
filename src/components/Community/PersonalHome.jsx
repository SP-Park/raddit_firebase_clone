import React from 'react'
import { FaReddit } from 'react-icons/fa'

export default function PersonalHome() {
  return (
    <div className='mt-7 bg-white cursor-pointer rounded-md'>
        <div className='p-1 bg-cover bg-personalHome rounded-t-md h-[34px] w-full' />
        <div className='p-2'>
            <div className='flex items-center'>
                <FaReddit className='text-[50px] text-red-500 mr-2'/>
                <p className='text-md font-bold'>Home</p>
            </div>
            <div className='flex flex-col p-2'>
                <p className='text-[12px] shink-0 mb-2'>Your personal Reddit frontpage, built for you.</p>
                <button className='bg-blue-500 text-white font-bold text-[16px] rounded-full mb-2'>Create Post</button>
                <button className='border-2 border-blue-500 text-blue-500 font-bold text-[16px] rounded-full'>Create Community</button>
            </div>
        </div>
    </div>
  )
}

