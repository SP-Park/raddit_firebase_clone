import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import About from '../Community/About'
import PageContent from '../Layout/PageContent'
import PostItem from './PostItem'
import Spinner from '../Spinner'
import Comments from '../Comments/Comments'
import usePost from '../../hook/usePost'

export default function PostPage() {
  const { state: { post, community } } = useLocation()
  const [error, setError] = useState()
  const [commnetText, setCommnetText] = useState('')
  const { user, onVote, getCommnets } = useAuthContext()
  const [comment, setComment] = useState()
  const singlePostPage = true
//   console.log('postDatail: ', post, 'voteState:',voteState, 'community', community )
  const { postStateValue, setPostStateValue } = usePost()

  useEffect(() => {
    getCommnets(post)
    .then((res) =>{
      console.log(res) 
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: {
          ...post,
          numberOfComments: res.length
        }
      }))
    })
  }, [post])


  if(postStateValue.selectedPost && community) {
    return (
        <PageContent>
            <>
                {/* SelectedPost */}
                <PostItem 
                    post={postStateValue.selectedPost}
                    userIsCreator={user?.uid === postStateValue.selectedPost.creatorId}
                    userVoteValue={postStateValue.postVotes.find((it) => it.postId === postStateValue.selectedPost.id)?.voteValue}
                    onVote={onVote}
                    setError={setError}
                    error={error}
                    community={community}
                    singlePostPage={singlePostPage}
                />
                {/* Comment */}
                <Comments post={postStateValue.selectedPost} community={community} commnetText={commnetText} setCommnetText={setCommnetText}/>
            </>
            <>
                {/* About */}
                <About community={community} />
                
            </>
        </PageContent>
      )
  } else {
    return (
        <div className='flex items-center justify-center h-screen'>
            <Spinner />
        </div>
        
    )
  }

}

