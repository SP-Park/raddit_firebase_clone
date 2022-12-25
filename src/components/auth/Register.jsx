import React, { useState } from 'react'
import InputGroup from '../InputGroup'
import { useAuthContext } from '../../context/AuthContext'

function Register({ modalName, setModal, setShowModal }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { signup } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await signup(email, name, password)
      console.log(res)
      if(res.error) {
        setLoading(false)
        setError(res.message)
        throw res
      } else {
        setShowModal(false)
        alert('가입을 환영합니다.')
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
      setErrors(error)
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
          error={errors.email}
        />
        <InputGroup 
          name={'name'}
          placeholder={'name'} 
          value={name} 
          setValue={setName}
          error={errors.name}
        />
        <InputGroup 
          type={'password'}
          name={'password'}
          placeholder={'password- 6자리 이상'} 
          value={password} 
          setValue={setPassword}
          error={errors.password}
        />
        {error &&
          <div className='flex items-center justify-center py-1'>
            <small className='text-red-500'>{error}</small>
          </div> 
        }
        <button disabled={loading} className='text-xl w-full py-1 bg-blue-600 text-white rounded-full hover:brightness-110'>Sign Up</button>
      </form>
      <div className='flex text-xs justify-center mt-1'>
        Already a redditor? 
        <p className='text-brand ml-1 hover:cursor-pointer' 
          onClick={() => setModal('login')}
        >
          LOG IN
        </p>
      </div>
    </>
  )
}

export default Register