import React from 'react'
import { GrAdd } from 'react-icons/gr'
import { BsChatDots, BsArrowUpRightCircle } from 'react-icons/bs'
import { IoFilterCircleOutline, IoNotificationsOutline, IoVideocamOutline } from 'react-icons/io5'
export default function Icons() {
  return (
    <div className='flex items-center gap-4'>
        <div className='hidden md:block items-center'>
            <BsArrowUpRightCircle className='text-xl cursor-pointer hover:scale-110' />
        </div>
        <div className='hidden md:block items-center'>
            <IoFilterCircleOutline className='text-2xl cursor-pointer hover:scale-110' />
        </div>
        <div className='hidden md:block items-center'>
            <IoVideocamOutline className='text-2xl cursor-pointer hover:scale-110' />
        </div>
        <p className='opacity-6 text-gray-400'>|</p>
        <div className='items-center'>
            <BsChatDots className='text-2xl cursor-pointer hover:scale-110' />
        </div>
        <div className='items-center'>
            <IoNotificationsOutline className='text-2xl cursor-pointer hover:scale-110' />
        </div>
        <div className='hidden md:flex items-center'>
            <GrAdd className='text-2xl cursor-pointer hover:scale-110' />
        </div>
    </div>
  )
}

