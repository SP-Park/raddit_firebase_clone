import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useCommunity from '../../hook/useCommunity'
import Modal from '../Navbar/Modal'
import Image from './Image'

export default function Header({ community }) {
  // const isJoined = false // read from our communitySnippets
  const [showModal, setShowModal] = useState(false)
  // const [isJoined, setIsJoined] = useState(false)
  const { user, communityState, joinCommunity, leaveCommunity } = useAuthContext()
  // console.log(community)

  // Recoil : community = communityData
  const { communitiesStateValue, JoinOrLeave } = useCommunity()
  const isJoined = !!communitiesStateValue.mySnippets.find(
    (it) => it.communityId === community.name
  )

  const handleClick = () => {
    // login check >> login modal
    if(!user) {
      setShowModal(true)
      return
    }
    // Join process
    // if(!isJoined) {
    //   joinCommunity(community, user)
    //   setIsJoined(!isJoined)
    // } else {
    //   leaveCommunity(community.name, user)
    //   setIsJoined(!isJoined)
    // }

    // Recoil
    JoinOrLeave(community, isJoined, user)


  }

  // useEffect(() => {
  //   if(communityState) {
  //     const res = !!communityState.find((it) => it.communityId === community.name)
  //     // console.log(res)
  //     setIsJoined(res)
  //   } else {
  //     return
  //   }
  // }, [communityState])

  // console.log('communityState: ', communityState)
  // console.log('isJoined: ', isJoined)
  return (
    <div className='flex flex-col justify-center'>
        <div className='bg-brand h-20' />
        <div className='bg-white h-20 flex items-center justify-center'>
            <div className='w-11/12 h-full flex max-w-6xl'>
            {/* TODO: 페이지 리로딩 없이 즉각 적인 적용이 될 수 있게 */}
                {community.imageURL ? ( 
                  <img
                    alt='header'
                    src={communitiesStateValue.currentCommunity.imageURL}
                    style={{ width: 64, height: 64  }} 
                    className='relative -top-4 bg-white rounded-full border-4'
                  />
                ):(
                 <img
                    alt='header'
                    src='/logo_mini.png'
                    style={{ width: 64, height: 64  }} 
                    className='relative -top-4 bg-white rounded-full border-4'
                  />
                )} 
                <div className='p-2'>
                    <div className='flex flex-col'>
                        <p className='ml-2 text-2xl font-bold'>{community.name}</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='ml-1 text-lg text-gray-500'>/c/{community.name}</p>
                    </div>
                </div>
                <div className='p-5'>
                  <button 
                    onClick={handleClick}
                    className={(isJoined? 'text-brand border-2 px-5 border-brand ': 'text-white bg-brand px-7 ')+ 'rounded-full  h-8'}
                  >
                    {isJoined ? 'Joined' : 'Join'}
                  </button>
                </div>
            </div>

        </div>
        {showModal ? (<Modal modalName={'login'} showModal={showModal} setShowModal={setShowModal} />) : null}
    </div>
  )
}

// absolute -top-1 -right-1