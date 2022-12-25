import React, { useEffect, useState } from 'react'
import { HiLockClosed } from 'react-icons/hi'
import { BsFillPersonFill, BsFillEyeFill } from 'react-icons/bs'
import InputGroup from '../InputGroup'
import { createCommunity } from '../../apis/firebase'
import { useAuthContext } from '../../context/AuthContext'

export default function CreaeteModal({ setShowModal, charsRemaining, setCharsRemaining }) {
  const [community, setCommunity] = useState('')
  const [type, setType] = useState('Public')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuthContext()
  useEffect(() => {
    setCharsRemaining(21)
  }, [])

  const handleCreateC = async () => {
    if(error) setError('')
    if(community.length < 3) {
      setError('Names must be between 3-21 characters')
      return
    }
    setLoading(true)
    // create 
    const com = await createCommunity(user, community, type)
    console.log(com)
    if(com) {
      setError(com)
      return
    }
    alert('커뮤니티가 생성되었습니다.!')
    setLoading(false)
    setShowModal(false)

  }

  return (
    <>
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-sm">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <p className="text2xl font-semibold">
              Create a community
            </p>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <span className="text-slate-600">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex flex-col items-start">
            <p className='text-md font-semibold'>Name</p>
            <p className='text-slate-500 text-[15px] mb-2'>Community names including capitalization cannot be changed</p>
            <InputGroup placeholder='community name' value={community} setValue={setCommunity} setCharsRemaining={setCharsRemaining}/>
            <p className='text-[13px] font-semibold mb-2'>{charsRemaining} Characters remaining</p>
            {error && <small className='mb-1 text-red-500'>{error}</small>}
            <p className='text-md font-semibold mb-2'>Type</p>
            <div >
                {/* TODO: 하나만 체크되도록  */}
                <div className="flex items-center mb-1">
                    <input id="checkbox1" name='Public' type="checkbox" value={type} onChange={(e) => setType(e.target.name)} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox1" className="ml-2 text-sm font-medium">
                        <div className='flex items-center'>
                            <BsFillPersonFill className='mr-1'/>
                            <p>Public</p>
                            <p className='text-[8px] ml-2 text-slate-500'>Anyone can view, post, and comment</p>
                        </div>
                    </label>
                </div>
                <div className="flex items-center mb-1">
                    <input id="checkbox2" name='Restricted' type="checkbox" value={type} onChange={(e) => setType(e.target.name)} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox2" className="ml-2 text-sm font-medium">
                        <div className='flex items-center'>
                            <BsFillEyeFill className='mr-1'/>
                            <p>Restricted</p>
                            <p className='text-[8px] ml-2 text-slate-500'>Anyone can view, only approved users can post</p>
                        </div>    
                    </label>
                </div>
                <div className="flex items-center">
                    <input id="checkbox3" name='Private' type="checkbox" value={type} onChange={(e) => setType(e.target.name)} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox3" className="ml-2 text-sm font-medium">
                        <div className='flex items-center'>
                            <HiLockClosed className='mr-1'/>
                            <p>Private</p>
                            <p className='text-[8px] ml-2 text-slate-500'>only approved users can view, post, comment</p>
                        </div>   
                    </label>
                </div>
            </div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="bg-brand text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleCreateC}
            >
              Create Community
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

