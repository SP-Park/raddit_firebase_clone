import React from 'react'
import useDirectory from '../../hook/useDirectory'

export default function MenuListItem({ displayText, icon, link, imageURL }) {
  const { onSelectMenuItem } = useDirectory()

  return (
    <div 
        className='flex items-center'
        onClick={() => onSelectMenuItem({ displayText, icon, link, imageURL })}
    >
        {imageURL? (
            <img alt='menu' src={imageURL} className='w-5 h-5 rounded-full mr-2' />
        ):( 
            icon
        )}
        <p className='text-[14px] font-bold'>{displayText}</p>
    </div>
  )
}

