import React, { useEffect, useMemo, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { postState } from '../../atoms/posts'
import { useAuthContext } from '../../context/AuthContext'
import Spinner from '../Spinner'
import CommentItem from './CommentItem'
import CommnetInput from './CommnetInput'

export default function Comments({ post, community, commnetText, setCommnetText }) {
  const { user, onCreateComment, getCommnets, onDeleteComment } = useAuthContext()
  // const [commnetText, setCommnetText] = useState('')
  const [commnets, setComments] = useState([])
  const [remove, setRemove] = useState()
  const [fetchLoading, setFetchLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Recoil
  const setPostState = useSetRecoilState(postState)

  const onCreate = async () => {
    setCreateLoading(true)
    const newComment = await onCreateComment(user, post, community.name, commnetText)
    if(newComment) {
      // Recoil
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments + 1
        },
        postUpdateRequired: true
      }))

      setCommnetText('')
      setCreateLoading(false)
      return 
    } else {
      console.log('comment failed.')
      setCreateLoading(false)
      setCommnetText('')
      return
    }
  }

  const onDelete = async (comment) => {
      const res = await onDeleteComment(comment, post)
      if(res) {
        setPostState((prev) => ({
          ...prev,
          selectedPost: {
            ...prev.selectedPost,
            numberOfComments: prev.selectedPost?.numberOfComments - 1
          },
          postUpdateRequired: true
        }))

        return
      } else {
        console.log('delete failed')
        return
      }
  }

  useEffect(() => {
    getCommnets(post)
    .then((it) => {
      if(it) {
        // console.log(it)
        setComments(it)
      }
    })
  },[setComments, getCommnets, post])


  if(post && community) {
    return (
      <div className='bg-white p-2'>
        <div className='flex flex-col ml-8 mb-4'> 
          {/* Comment Input */}
          <CommnetInput 
            user={user} 
            commnetText={commnetText} 
            setCommnetText={setCommnetText} 
            createLoading={createLoading}  
            onCreateCommnet={onCreate}
          />
        </div>
        < hr className='mb-2' />
        <div className='flex flex-col ml-8 mb-4'>
          {!commnets && <p className='font-bold text-gray-300 text-center'>No Comments Yet</p>}        
          {commnets && commnets.map((comment) => (
            <CommentItem 
              key={comment.id}
              user={user}
              comment={comment}
              deleteLoading={deleteLoading}
              onDelete={onDelete}
          />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <Spinner />
    )
  }

}

