import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import Modal from '../Navbar/Modal'
import { FaReddit } from 'react-icons/fa'
import { BsLink45Deg } from 'react-icons/bs'
import { IoImageOutline } from 'react-icons/io5'

export default function CreatePostLink({ community }) {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
// console.log(community)
  const onClick = () => {
    if(!user) {
        setShowModal(true)
        return
      }
    if(community.name) {
      navigate(`/c/${community.name}/createpost`)
      return
    }
      
  }
  if(community.name.length > 0) {
    return (
      <div className='flex items-center border-2 bg-white p-2'>
          <div>
            <FaReddit className='h-10 w-10 mr-4 text-red-500'/>
          </div>
          <div className='w-full border-2 py-2 bg-gray-100 mr-2 cursor-pointer' onClick={onClick}>
            <p className='ml-2 text-gray-400'>Create Post</p>
          </div>
          <div className='flex items-center gap-2'>
              <IoImageOutline className='text-2xl text-gray-400 cursor-pointer' />
              <BsLink45Deg className='text-2xl text-gray-400 cursor-pointer' />
          </div>
          {showModal ? (<Modal modalName={'login'} showModal={showModal} setShowModal={setShowModal} />) : null}
      </div>
    )
  }

}

