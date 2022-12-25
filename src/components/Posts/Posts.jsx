import React, { useEffect, useMemo, useState } from 'react'
// import { useLocation } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import usePost from '../../hook/usePost'
import PostItem from './PostItem'
import PostLoader from './PostLoader'

export default function Posts({ community }) {
  const { user, getPosts, setPostState, postState, voteState, onVote} = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const singlePostPage = false
  // const location = useLocation() 
  // const path = location.pathname.split('/')[2]

  // Recoil
  const { postStateValue, setPostStateValue } = usePost()

  useEffect(() => {
    getPosts(community)
    .then((it) => {
      if(it) {
        // console.log(it)
        setPostStateValue((prev) => ({
          ...prev,
          posts: it
        }))
      }
    })
  }, [community])


  // console.log('postStateValue', postStateValue)

  
  // useEffect(() => {
  //   setLoading(true)
  //   getPosts(community)
  //   .then((it) => {
  //       if(it) {
  //           console.log(it)
  //           setPostState(it)
  //           setLoading(false)
  //       }
  //   })
  // }, [setPostState, getPosts, community])
  
  // console.log(user.communitySnippets)
  // console.log('voteState', voteState)

  const onClickVote = async (post, vote) => {
    if(!user) return 
    // console.log(post, vote)
    // Recoil
    const { updatedPost, updatedPostVotes } = await onVote(user, post, vote, postStateValue, community.name)
      if(!updatedPost || !updatedPostVotes || !postStateValue) {
        throw new Error('Vote process failed.')
      }
    const updatedPosts = [...postStateValue.posts]
    const postIdx = postStateValue.posts.findIndex((it) => it.id === post.id)
    updatedPosts[postIdx] = updatedPost
    setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes
    }))
  }

  return (
    <>
    {loading ? (
        <PostLoader />
    ): (
        <div className='flex flex-col items-center justify-center'>
        {postStateValue && postStateValue.posts.length >= 1 && postStateValue.posts.map((it) => (
            <PostItem 
                key={it.id} 
                post={it}
                userIsCreator={user?.uid === it.creatorId} 
                // userVoteValue={voteState.find((vote) => vote.postId === it.id)?.voteValue}
                userVoteValue={postStateValue.postVotes.find((vote) => vote.postId === it.id)?.voteValue}
                onVote={onClickVote}
                setError={setError}
                error={error}
                community={community}
                singlePostPage={singlePostPage}
            />
        ))}
        </div>
    )}
    
    </>
  )
}
