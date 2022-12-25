import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { useRecoilValue } from 'recoil'
import { communityState } from '../../atoms/community'
import { useAuthContext } from '../../context/AuthContext'
import MenuListItem from './MenuListItem'
import { FaCat } from 'react-icons/fa'
import useCommunity from '../../hook/useCommunity'

function Community({ setShowModal }) {
  const { user, getMySnippets } = useAuthContext()
  const [snippets, setSnippets] = useState()
  // const mySnippets = useRecoilValue(communityState).mySnippets
  const { communitiesStateValue, SetCommunitiesStateValue } = useCommunity()
  // console.log(communityState)

  useEffect(() => {
    getMySnippets(user)
    .then((snippets) => {
        if(snippets) {
            // console.log(snippets)
            setSnippets(snippets)
            SetCommunitiesStateValue((prev) => ({
              ...prev,
              mySnippets: snippets
            }))
            return
        } 
    })
  }, [user])

  // console.log(communitiesStateValue)

  return (
    <>
      <div className='flex items-center ml-3'>
        <p className='text-[7px] text-gray-400'>MODERATING</p>
      </div>
      {communitiesStateValue.mySnippets && communitiesStateValue.mySnippets
      .filter((it) => it.isModerator)
      .map((it) => (
        <div className='w-full ml-2 flex items-center hover:scale-105 cursor-pointer'>
          <MenuListItem 
            key={it.communityId} 
            displayText={`c/${it.communityId}`}
            icon={<FaCat className='text-[20px] mr-2 text-blue-500 rounded-sm'/>}  
            link={`/c/${it.communityId}`}
            imageURL={it.imageURL}
          />
        </div>
      ))}
    
      <div className='flex items-center ml-3'>
        <p className='text-[7px] text-gray-400'>MY COMMUNITIES</p>
      </div>
      <div 
        className='flex items-center hover:cursor-pointer m-2 hover:scale-105 cursor-pointer' 
        // onClick={() => setShowModal(true)}
        onClick={setShowModal}
      >
        <GrAdd className='text-md m-1'/>
        <p className='text-[14px]'>Create Community</p>
      </div>
      {communitiesStateValue.mySnippets && communitiesStateValue.mySnippets.map((it) => (
        <div className='w-full ml-2 flex items-center hover:scale-105 cursor-pointer'>
          <MenuListItem 
            key={it.communityId} 
            displayText={`c/${it.communityId}`}
            icon={<FaCat className='text-[20px] mr-2 text-blue-500 rounded-sm'/>}  
            link={`/c/${it.communityId}`}
            imageURL={it.imageURL}
          />
        </div>
      ))}
    </>
  )
}

export default Community