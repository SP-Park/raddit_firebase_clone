import React from 'react'

export default function CommnetInput({ user, commnetText, setCommnetText, createLoading, onCreateCommnet }) {
  return (
    <div className='flex flex-col relative'>
        {user? (
            <>
            
                    <p className='mb-1'>
                        Commnet as {''}
                        <span className='text-brand'>
                            {user?.email?.split('@')[0]}
                        </span>
                    </p>
                    <div className='flex flex-col border-2 rounded-md p-2'>
                    <textarea 
                        value={commnetText}
                        onChange={(e) => setCommnetText(e.target.value)}
                        placeholder={'What are your thoughts?'}
                        style={{ resize: 'none' }}
                        className='text-md rounded-md pb-19 focus:outline-none'
                    />
                    <div className='flex justify-end p-1 rounded-md'>
                        <button 
                            className='bg-brand font-bold rounded-full px-3 py-1 text-white text-[14px]'
                            onClick={onCreateCommnet}
                        >
                            Commnet
                        </button>
                    </div>
                    </div>
            </>
        ) : (
            <>
                <div className='flex justify-between items-center border-2 p-2 mr-3'>
                    <div className='p-2 w-6/12'>
                        <p className='font-bold'>
                            Log in or sign up to leave a commnet
                        </p>
                    </div>
                    <div className='flex items-center justify-end gap-3 w-6/12'>
                        <button className='border-2 rounded-full px-4 border-brand text-brand font-bold'>Log In</button>
                        <button className='bg-brand rounded-full px-5 text-white border-2 border-brand font-bold'>Sign Up</button>
                    </div>
                </div>
            </>
        )}
    </div>
  )
}

