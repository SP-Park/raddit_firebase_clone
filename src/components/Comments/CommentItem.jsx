import moment from 'moment'
import React from 'react'
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from 'react-icons/io5'
import Spinner from '../Spinner'

export default function CommentItem({ user, comment, deleteLoading, onDelete }) {
  const handleDelte = () => {
    onDelete(comment)
  }
  return (
    <div className='flex mb-2'>
        <div className='flex items-center justify-start h-full mr-1'>
            <img alt='comment' src='/logo_mini.png' className='h-10 w-10'/>
        </div>
        <div className='gap-1'>
            <div className='flex items-center'>
                <p className='font-bold'>{comment.creatorDisplayText}</p>
                <p className='text-gray-500 ml-2 text-xs font-semibold'>{moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}</p>
            </div>
            {deleteLoading && <Spinner />}
            <p className='flex items-start mb-2'>{comment.text}</p>
        
        
        <div className='flex items-center cursor-pointer text-gray-500 gap-2'>
            <IoArrowUpCircleOutline className='hover:text-brand hover:font-bold hover:scale-125' />
            <IoArrowDownCircleOutline className='hover:text-brand hover:font-bold hover:scale-125' />
        
        {user.uid === comment.creatorId && (
            <>
                <p className='text-xs hover:text-brand hover:font-bold'>
                    Edit
                </p>
                <p className='text-xs hover:text-brand hover:font-bold' onClick={handleDelte}>
                    Delete
                </p>
            </>
        )}
        </div>
        </div>
    </div>
  )
}

