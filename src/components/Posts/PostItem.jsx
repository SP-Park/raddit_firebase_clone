import moment from 'moment/moment'
import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsChat, BsDot } from 'react-icons/bs'
import { FaReddit } from 'react-icons/fa'
import { IoArrowDownCircleOutline, IoArrowDownCircleSharp, IoArrowRedoOutline,
    IoArrowUpCircleOutline, IoArrowUpCircleSharp, IoBookmarkOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import usePost from '../../hook/usePost'
import Spinner from '../Spinner'



export default function PostItem({ post, userIsCreator, userVoteValue, onVote, setError, error, community, singlePostPage, homepage }) {
    const { user, deletePost, getPosts, setPostState, postState, voteState} = useAuthContext()
    const [loadingDelete, setLoadingDelete] = useState(false)
    const navigate = useNavigate()
    // console.log('Post', post)
    // Recoil
    const { setPostStateValue } = usePost()

    const onDeletePost = async () => {
        setLoadingDelete(true)
        try {
          const postId = await deletePost(post)
          if(!postId) {
            throw new Error('Failed to delete post')
          } else {
            setPostStateValue((prev) => ({
                ...prev,
                posts: prev.posts.filter((it) => it.id !== postId)
            }))
            if(singlePostPage === true) {
                console.log('Post was successfully deleted')
                setLoadingDelete(false) 
                navigate(`/c/${community.name}`)
                return true
            } else {
                console.log('Post was successfully deleted')
                setLoadingDelete(false) 
                return true
            }
          }   
              
        } catch (error) {
          setError(error.message)
          setLoadingDelete(false)
          return false
        }
        
    }

    const handleClick = async () => {
        if(!user) return
        onVote(post, 1)
    }

    const handleDownClick = async () => {
        onVote(post, -1)
    }

    return (
    <div 
        className={(singlePostPage ? '' : 'hover:border-blue-300 ') + 
        (singlePostPage ? 'border-white ' : 'border-gray-300 mb-2 ') +
        'flex items-center w-full border-2 bg-white rounded-sm'}
    >
        <div className={
            (singlePostPage ? '' : 'bg-gray-100 ') +
            'flex flex-col h-full items-center justify-start p-2 w-10'}>
            {userVoteValue === 1 ? 
                <IoArrowUpCircleSharp className='text-xl text-red-500 cursor-pointer' onClick={handleClick} /> 
                : 
                <IoArrowUpCircleOutline className='text-xl text-gray-500 cursor-pointer' onClick={handleClick} />
            }
            <p>{post.voteStatus}</p>
            {userVoteValue === -1 ? 
                <IoArrowDownCircleSharp className='text-xl text-blue-500 cursor-pointer' onClick={handleDownClick} /> 
                :    //#4379ff
                <IoArrowDownCircleOutline className='text-xl text-gray-500 cursor-pointer' onClick={handleDownClick} />
            }
        </div>
        <div 
            className={(singlePostPage ? '' : 'cursor-pointer ') + 'flex flex-col w-full mr-3 mt-1'}
        >
            {error && (
              <div className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{error}</span>
                </div>
              </div>
            )}
            <div onClick={() => {navigate(`/c/${post.communityId}/${post.id}`, { state: { post, community }})}} >
                <div className='flex flex-col items-start ml-2'>
                    {/* Home Page Check */}
                    <div className='flex items-center'>
                        {homepage && (
                            <>
                                {post.communityImageURL ? (
                                    <img className='rounded-full mr-1 w-20 h-20' alt='logo' src={post.imageURL} />
                                ) : (
                                    <FaReddit className='text-[18px] text-blue-500 mr-1'/>
                                )}
                                <Link to={`/c/${post.communityId}`}>
                                    <p className='text-xs mr-1 font-bold'>{`/c/${post.communityId}`}</p>
                                </Link>
                                <BsDot className='mr-1'/>
                            </>
                        )

                        }
                        <p className='text-xs'>Posted by u/{post.creatorDisplayName} {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}</p>
                    </div>
                </div>
                <div className='flex items-start ml-2'>
                    <p className='font-bold text-xl'>{post.title}</p>
                </div>
                <div className='flex items-start ml-2'>
                    <p>{post.body}</p>
                </div>
                {post.imageURL && (
                <div className='flex items-center justify-center p-2'>
                    <img alt='post' src={post.imageURL} style={{ maxHeight: 600 }} />
                </div>
                )}
            </div>
            <div className='flex p-2 items-center gap-2'>
                <div className='flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-600'>
                    <BsChat />
                    <p>{post.numberOfComments}</p>
                </div>
                <div className='flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-600'>
                    <IoArrowRedoOutline />
                    <p>Share</p>
                </div>
                <div className='flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-600'>
                    <IoBookmarkOutline />
                    <p>Save</p>
                </div>
                {userIsCreator && (
                <div 
                    className='flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-600'
                    onClick={onDeletePost}
                >
                    <AiOutlineDelete />
                    {loadingDelete ? (
                        <Spinner />
                    ) : (
                        <>
                           
                            <p>Delete</p>
                        </>
                    )}
                </div>
                )}
            </div>
        </div>
    </div>
  )
}

