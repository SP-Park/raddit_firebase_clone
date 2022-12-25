import React from 'react'
import { useAuthContext } from '../../context/AuthContext'

export default function OAuth() {
  const { loginWithG, user, addFirestore } = useAuthContext()

  const handleClick = async () => {
    const { user } = await loginWithG()
    console.log(user)
    await addFirestore(user)
  }
  
  return (
    <>
        <div className='flex items-center py-1 justify-center border-2 rounded-full' style={{ width: '100%' }}>
            <button className='flex items-center hover:brightness-110' onClick={handleClick}>
                <img alt='google' src='google.png' style={{ height: 30 }}/>
                <p className='ml-3'>Continue with Google</p>
            </button>
        </div>
    </>
  )
}

