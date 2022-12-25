import React from 'react'
import { useLocation } from 'react-router-dom'
import PageContent from '../components/Layout/PageContent'
import NewPostForm from '../components/Posts/NewPostForm'
import { useAuthContext } from '../context/AuthContext'
import useCommunity from '../hook/useCommunity'
import About from '../components/Community/About'

function CreatePost() {
  const { user } = useAuthContext()
  const location = useLocation() 
  const path = location.pathname.split('/')[2]
  const { communitiesStateValue } = useCommunity()

  // console.log(communitiesStateValue)

  return (
    <PageContent>
      <>
        <div className='px-2 py-3 border-b-2 border-white'>
          <p className='text-2xl font-bold'>Create a Post</p>
        </div>
        {user && <NewPostForm user={user} communityId={path} communityImageURL={communitiesStateValue.currentCommunity?.imageURL}/>}
      </>
      <>
        {/* About */}
        {communitiesStateValue.currentCommunity && 
          <About community={communitiesStateValue.currentCommunity}/>
        }
      </>
    </PageContent>
  )
}

export default CreatePost