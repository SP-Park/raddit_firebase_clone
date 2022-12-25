import React, { useState } from 'react'
import InputGroup from '../../components/InputGroup'
import { useAuthContext } from '../../context/AuthContext'

function Login({ setModal, setShowModal }) {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let user = await login(email, password)
      console.log('user: ', user)
      if(user) {
        setLoading(false);
        setShowModal(false)
      } else {
        setLoading(false)
        alert('로그인이 실패하였습니다.')
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputGroup 
          name={'email'}
          type={'email'}
          placeholder={'Email'} 
          value={email} 
          setValue={setEmail}
        />
        <InputGroup 
          type={'password'}
          name={'password'}
          placeholder={'password- 6자리 이상'} 
          value={password} 
          setValue={setPassword}
        />
        {error &&
          <div className='flex items-center justify-center py-1'>
            <small className='text-red-500'>{error}</small>
          </div> 
        }
        <button disabled={loading} className='text-xl w-full py-1 bg-blue-600 text-white rounded-full hover:brightness-110'>Log In</button>
      </form>
      <div className='flex text-xs justify-center mt-1'>
        Forgot your password?
        <p className='text-brand ml-1 hover:cursor-pointer' 
          onClick={() => setModal('resetPassword')}
        >
          Reset
        </p>
      </div>
      <div className='flex text-xs justify-center mt-1'>
        Do not have account?
        <p className='text-brand ml-1 hover:cursor-pointer' 
          onClick={() => setModal('signup')}
        >
          SIGN UP
        </p>
      </div>
    </>
  )
}

export default Login