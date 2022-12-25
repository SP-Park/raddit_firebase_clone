import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { communityState } from '../atoms/community'
import PageContect from '../components/Layout/PageContent'
import PostItem from '../components/Posts/PostItem'
import PostLoader from '../components/Posts/PostLoader'
import { useAuthContext } from '../context/AuthContext'
import usePost from '../hook/usePost'
import CreatePostLink from '../components/Posts/CreatePostLink'
import useCommunity from '../hook/useCommunity'
import Recommendations from '../components/Community/Recommendations'
import Premium from '../components/Community/Premium'
import PersonalHome from '../components/Community/PersonalHome'



function Home() {
  const { user, getNoUserFeed, getUserFeed, getAllCommunities } = useAuthContext()
  const { SetCommunitiesStateValue } = useCommunity()
  const [loading, setLoading] = useState(false)
  const [communities, setCommunities] = useState()
  const { postStateValue, setPostStateValue } = usePost()
  const communitiesStateValue = useRecoilValue(communityState)

  // console.log(communitiesStateValue)
  useEffect(() => {
    getAllCommunities()
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
        setCommunities(res)
      }
    })
  }, [])

  const buildUserHomeFeed = async() => {
    setLoading(true)
    try {
      if(communitiesStateValue.mySnippets.length) {
        const myCommunityIds = communitiesStateValue.mySnippets.map((snippet) => 
          snippet.communityId
        )
        const posts = await getUserFeed(myCommunityIds)
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts
        }))
        setLoading(false)
        return

      } else {
        const posts = await getNoUserFeed()
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts
        }))
        setLoading(false)
        return
      }

    } catch(error) {
      console.log('buildUserHomeFeed error', error)
      setLoading(false)
      return false
    }
    
  }
  
  const buildNoUserHomeFeed = async () => {
    setLoading(true)
    try {
      const posts = await getNoUserFeed()
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts
      }))
      setLoading(false)
      return 
    } catch(error) {
      console.log('buildNoUserHomeFeed error', error)
      setLoading(false)
      return false
    }
  }

  const getUserPostVotes = () => {}

  useEffect(() => {
    if(!user) {
      buildNoUserHomeFeed()
      return 
    } 
  }, [user])

  useEffect(() => {
    if(communitiesStateValue.mySnippets.length) {
      buildUserHomeFeed()
      return
    }
  }, [communitiesStateValue.mySnippets])


  if(communities&& communities.length > 0) {
    return (
      <PageContect>
        <>
          {/* <CreatePostLink community={communities}/> */}
          {/* PostFeed */}
          {loading ? (
            <PostLoader />
          ) : (
            <>
              {postStateValue.posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  userIsCreator={user?.uid === post.creatorId}
                  userVoteValue={postStateValue.postVotes.find((vote) => vote.postId === post.id)?.voteValue}
                  onVote={undefined}
                  setError={undefined}
                  error={undefined}
                  community={communities}
                  singlePostPage={false}
                  homepage
                />
              ))}
            </>
          )}
        </>
        <>
          {/* Recommendations */}
          <Recommendations />
          <Premium />
          <PersonalHome />
        </>
      </PageContect>
    )
  } else {
    return <div> loading.... </div>
  }

    

  
}

export default Home

// post, userIsCreator,
//  userVoteValue, onVote, setError, error, community, singlePostPage homepage