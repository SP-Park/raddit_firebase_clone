import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import InputGroup from '../InputGroup'

export default function ResetPassword({ modalName, setModal, setShowModal }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { resetPassword } = useAuthContext()

  const onSubmit = async (e) => {
    e.preventDefault()
    resetPassword(email)
    setSuccess(true)
  }
  
  return (
    <div className='flex flex-col items-center w-full'>
        <p className='text-xl font-bold'>Reset your password</p>
        {success ? (
            <p>Check your email 😃</p>
        ): (
            <>
            <p className='text-md text-center mb-2'>Enter the email associated with your account <br /> and we'll send you a reset link.</p>
            <form onSubmit={onSubmit}>
            <InputGroup 
              name={'email'}
              type={'email'}
              placeholder={'Email'} 
              value={email} 
              setValue={setEmail}
            />
            {error &&
              <div className='flex items-center justify-center py-1'>
                <small className='text-red-500'>{error}</small>
              </div> 
            }
            <button disabled={loading} className='text-xl w-full py-1 bg-blue-600 text-white rounded-full hover:brightness-110'>Reset Password</button>
            </form>
          </>
        )}
        <div className='flex text-xs justify-center mt-1'>
            <p className='text-brand ml-1 hover:cursor-pointer' 
                onClick={() => setModal('login')}
            >
                LOG IN
            </p>
                -
            <p className='text-brand ml-1 hover:cursor-pointer' 
                onClick={() => setModal('signup')}
            >
                SIGN UP
            </p>
        </div>
    </div>
  )
}

