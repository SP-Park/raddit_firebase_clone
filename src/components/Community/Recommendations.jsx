import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaReddit } from 'react-icons/fa'
import { useAuthContext } from '../../context/AuthContext'
import useCommunity from '../../hook/useCommunity'
import PostLoader from '../Posts/PostLoader'

export default function Recommendations() {
  const { user, getRecommendationCommunity } = useAuthContext()
  const { communitiesStateValue } = useCommunity()
  const [loading, setLoading] = useState(false)
  const [path, setPath] = useState()
  const [recommendation, setRecommendation] = useState()
  const { JoinOrLeave } = useCommunity()
  const navigate = useNavigate()

  const getRecommendation = async () => {
    setLoading(true)
    try { 
      const communities = await getRecommendationCommunity()
      setRecommendation(communities)
    } catch (error) {
      console.log('Recommendations', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getRecommendation()
  }, [])

  console.log(path)
  const handleClick = (lastChild) => {
    console.log(lastChild)
    navigate(`/c/${lastChild}`)
  }

  if(recommendation && recommendation.length > 0) {
    return (
      <div className='flex flex-col bg-white border-2 border-gray-300 rounded-md'>
        <div className='flex w-full h-[70px] p-3 bg-cover bg-recommendation1 opacity-90'>
          <p className='text-white font-bold mt-5'>Top Communities</p>
        </div>
        <div className='flex flex-col'>
          {loading? (
            <div>
              Loading...
            </div> 
          ) : (
            <>  
            {recommendation.map((it, idx) => {
              const isJoined = !!communitiesStateValue.mySnippets.find(
                (snippet) => snippet.communityId === it.id
              )
              return (
                  <div className='flex items-center border-b-2 p-2 mr-2'>
                    <div className='w-1/12'>
                      <p>{idx + 1}</p>
                    </div>
                    <div className='flex items-center w-8/12 cursor-pointer'>
                      <Link to={`/c/${it.id}`}>
                        {it.imageURL ? (
                          <img className='rounded-full w-8 h-8' alt='community' src={it.imageURL}/>
                        ):(
                          <FaReddit className='rounded-full w-8 h-8 text-blue-500'/>
                        )}
                      </Link>
                      <Link to={`/c/${it.id}`}>
                        <p className='ml-2 text-[14px] font-bold'>/c/{it.id}</p>
                      </Link>  
                    </div>
                    
                    <div className='w-3/12'>
                      <button className={
                        (isJoined? 'text-blue-600 ':'bg-blue-600 text-white ') + 
                        'text-[12px] font-bold border-2 border-blue-600 rounded-full px-3'}
                        onClick={(e) => {
                          e.stopPropagation()
                          JoinOrLeave(it, isJoined, user)
                        }}
                      >
                        {isJoined? 'Joined':'Join'}
                      </button>
                    </div>
                  </div>
              )
            })}

            </>
          )}
          <div className='flex justify-center p-2'>
            <button className='border-2 bg-blue-500 text-white font-bold rounded-full w-full hover:brightness-110'>View All</button>
          </div>
        </div>
      </div>
    )
  } else {
    return <div>loading...</div>
  }

}

