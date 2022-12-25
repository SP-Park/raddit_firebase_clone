import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import Icons from './Icons'
import Modal from './Modal'
import UserMenu from './UserMenu'


export default function RightContent() { 
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const { user, logout } = useAuthContext()
  if(user) {
    return (
      <div className='flex items-center'>
        <Icons />
        <UserMenu />
        
      </div>
      
        // <button 
        //     className='rounded-full bg-brand px-5 py-1 text-white font-bold hover:brightness-110'
        //     onClick={logout}
        // >
        //     Logout
        // </button>
    )
  } else {
    return (
        <div className='flex items-center gap-1'>
        <button 
            className='rounded-full border-brand border-2 px-5 py-1 text-brand font-bold hover:shadow-lg'
            onClick={() => {setShowModal(true); setName('login') }}
        >LogIn
        </button>
        <button 
            className='rounded-full bg-brand px-5 py-1 text-white font-bold hover:brightness-110'
            onClick={() => {setShowModal(true); setName('signup')}}
        >SignUp
        </button>
        {showModal ? (<Modal modalName={name} setModal={setName} showModal={showModal} setShowModal={setShowModal}/>) : null}
    </div>
    )
  }

}

