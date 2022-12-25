import React, { useState } from 'react'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { BiPoll } from 'react-icons/bi'
import TabItem from './TabItem'
import TextInput from './TextInput'
import ImageUpload from './ImageUpload'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const formTabs = [
    {
        title: 'Post',
        icon: <IoDocumentText />
    },
    {
        title: 'Images & Video',
        icon: <IoImageOutline />
    },
    {
        title: 'Link',
        icon: <BsLink45Deg />
    },
    {
        title: 'Poll',
        icon: <BiPoll />
    },
    {
        title: 'Talk',
        icon: <BsMic />
    }
  ]

export default function NewPostForm({ user, communityId, communityImageURL }) {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title)
  const [text, setText] = useState('')
  const [error, setError] = useState()
  const [selectedFile, setSelectedFile] = useState()
  const [loading, setLoading] = useState(false)
  const { createPost } = useAuthContext()
  const navigate = useNavigate()

  const handleCreatePost = async () => {
    setLoading(true)
    if(!text.title) {
        setError('please enter title')
        return 
      }
    // create new post object 
    const newPost = {
        communityId,
        communityImageURL: communityImageURL || '',
        creatorId: user.uid,
        creatorDisplayName: user.email.split('@')[0],
        title: text.title,
        body: text.body ?? '',
        numberOfComments: 0,
        voteStatus: 0
        // createdAt: serverTimestamp()
    }
    // store the post in db
    const res = await createPost(newPost, selectedFile)
    console.log('Post: ', res)
    if(res === 'success') {
        setLoading(false)
        navigate(-1)
    }

    // redirect the user back to the communiPage using the router

  }

  const onSelectImage = (e) => {
    const reader = new FileReader()
    if(e.target.files?.[0]) {
        reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
        if(readerEvent.target?.result) {
            setSelectedFile(readerEvent.target.result)
        }
    }
  }

  return (
    <div className='flex flex-col bg-white rounded-sm mt-2'>
        <div className='w-full flex'>
            {formTabs.map((it) => (
                <TabItem key={it.title} it={it} selected={it.title === selectedTab} setSelectedTab={setSelectedTab} />
            ))}
        </div>
        <div className='flex'>
            {selectedTab === 'Post' && (
                <TextInput 
                    Loading={loading} 
                    handleCreatePost={handleCreatePost} 
                    text={text}
                    setText={setText}
                    error={error}
                    setError={setError}
                />
            )}
            {selectedTab === 'Images & Video' && (
                <ImageUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} setSelectedTab={setSelectedTab} onSelectImage={onSelectImage} />
            )}
        </div>
    </div>
  )
}

