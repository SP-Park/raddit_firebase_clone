import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { FaReddit } from 'react-icons/fa'
import RightContent from './RightContent'
import Directory from './Directory'
import { useAuthContext } from '../../context/AuthContext'

function Navbar() {
  const [text, setText] = useState('')
  const { user } = useAuthContext()
  return (
    <header className='flex bg-white p-1'>
        <div className='flex items-center'>
            <Link to='/' className='flex items-center'>
                <FaReddit 
                    style={{ width: 40, height: 40 }}
                    className='cursor-pointer mr-2 text-red-500'
                />
                <h1 className='hidden md:block text-2xl text-brand font-bold mr-10'>Reddit_Clon</h1>
            </Link>
        </div>
        {user && 
        <div className='flex items-center'>
            <Directory />
        </div>
        }

        <form className='w-full flex justify-center'>
            <input 
                type={'text'} placeholder='Search Post...' 
                value={text} onChange={(e) => setText(e.target.value)}
                className='w-8/12 outline-none text-slate-500 p-1 border border-brand'
            />
            <button className='bg-brand px-4 text-white'>
             <BsSearch />
            </button>
        </form>
        <RightContent />
    </header>
  )
}

export default Navbar