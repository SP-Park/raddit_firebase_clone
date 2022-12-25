import React, { useRef, useState } from 'react'
import { RiCakeLine } from 'react-icons/ri'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import Spinner from '../Spinner'
import { useSetRecoilState } from 'recoil'
import { communityState } from '../../atoms/community'

export default function About({ community }) {
  const { user, changeImage } = useAuthContext()
  const seletedRef = useRef()
  const [selectedFile, setSelectedFile] = useState()
  const [uploading, setUploading] = useState(false)

 // Recoil 
 const SetCommunitiesStateValue = useSetRecoilState(communityState)
 

  const onUpdateImage = async () => {
    if(!selectedFile) return
    setUploading(true)
    try {
        const downloadURL = await changeImage(selectedFile, community.name)
        if(!downloadURL) {
            throw new Error('Image changing process failed.')     
        }
        SetCommunitiesStateValue((prev) => ({
            ...prev,
            currentCommunity: {
                ...prev.currentCommunity,
                imageURL: downloadURL
            }  
        }))
    } catch (error) {
        console.log('onUpdateImage Error: ', error.message)
    }
    setUploading(false)
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
    <div className='sticky'>
        <div className='flex rounded-t-md bg-brand text-white items-center justify-between p-3 text-center'>
            <p className='text-md'>About Community</p>
            <HiOutlineDotsHorizontal className='text-xl'/>
        </div>
        <div className='flex flex-col bg-white rounded-b-md'>
            <div className='flex w-full p-4 border-b-2'>
                <div className='flex flex-col grow'>
                    <p className='font-bold'>{community.numberOfMembers}</p>
                    <p className='font-bold'>Members</p>
                </div>
                <div className='flex flex-col grow'>
                    <p className='font-bold'>1</p>
                    <p className='font-bold'>Online</p>
                </div>
            </div>
            <div className='flex w-full p-4'>
                <RiCakeLine className='text-xl mr-2' />
                {community.createAt && (<p>Created {moment(new Date(community.createAt.seconds * 1000)).format('MMM DD, YYYY')}</p>)}
            </div>
            {user && 
            <Link to={`/c/${community.name}/createpost`} className='flex items-center justify-center mb-1'>
                <button className='bg-brand text-white rounded-full py-1 px-2 w-full mx-2 mb-1'>Create Post</button>
            </Link>}
            {user?.uid === community.creatorId && (
                <>
                    <div className='flex border-t-2 p-3 justify-between'>
                        <div className='flex flex-col'>
                            <p className='font-bold'>Admin</p>
                            <p 
                                className='text-brand hover:underline cursor-pointer'
                                onClick={() => seletedRef.current.click()}    
                            >
                                Change Image
                            </p>
     {/* TODO: 페이지 리로딩 없이 즉각 적인 적용이 될 수 있게 */}
                            {selectedFile && (
                                (uploading ? 
                                <Spinner /> 
                                : 
                                <p 
                                    className='cursor-pointer' 
                                    onClick={onUpdateImage}
                                >
                                    Save Changes
                                </p>
                                )
                            )}
                        </div>
                        <div className='flex items-center justify-center'> 
                            {community.imageURL || selectedFile ? (
                                <img className='w-20' alt='about' src={selectedFile || community.imageURL} />
                            ): (
                                <img className='w-10' alt='logo' src={'/logo_mini.png'} />
                            )}
                        </div>
                        <input 
                            id='file-upload' 
                            type='file' 
                            accept='image/x-png,image/gif,image/jpeg' 
                            hidden 
                            ref={seletedRef}
                            onChange={onSelectImage} 
                        />
                    </div>
                </>
            )}
        </div>
    </div>
  )
}

