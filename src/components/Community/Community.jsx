import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import useCommunity from '../../hook/useCommunity'
import PageContent from '../Layout/PageContent'
import CreatePostLink from '../Posts/CreatePostLink'
import Posts from '../Posts/Posts'
import About from './About'
import Header from './Header'

function Community() {
  const { getCommunity } = useAuthContext()
  const [community, setCommunity] = useState()
  const location = useLocation() 
  const path = location.pathname.split('/')[2]

  // Recoil
  const { SetCommunitiesStateValue } = useCommunity()
 
  useEffect(() => {
    getCommunity(path)
    .then((res) => {
      if(res) {
        // console.log(res)
        SetCommunitiesStateValue((prev) => ({
          ...prev,
          currentCommunity: {
            id: res.name,
            creatorId: res.creatorId,
            numberOfMembers: res.numberOfMembers,
            privacyType: res.privacyType,
            imageURL: res.imageURL
          }
        }))
        setCommunity(res)
      }
    })
  }, [])


  // console.log('communitiesStateValue', communitiesStateValue)

  if(community) {
    return (
        <>
            <Header community={community} />
            <PageContent>
                <>
                    <CreatePostLink community={community} />
                    <br />
                    <Posts community={community} />
                </>
                <>
                  <About community={community} />
                </>
            </PageContent>
        </>
      )
  } else {
    return null
  }

}

export default Community