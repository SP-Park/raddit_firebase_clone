import React from 'react'

export default function TabItem({ it, selected, setSelectedTab }) {
  return (
    <div 
        className={
            (selected? 'text-brand border-b-brand ': 'text-gray-500 ') 
            + 
            'flex items-center justify-center grow py-3 cursor-pointer border-b-2 hover:bg-gray-200 border-r-2 font-bold'
        }
        onClick={() => setSelectedTab(it.title)}
    >

        <div className='flex items-center mr-2 text-lg'>
            {it.icon}
        </div>
        <p className='text-lg'>{it.title}</p>
    </div>
  )
}

